import Product from "../models/Product.js";

// 2.5 Flash is available for the configured key and is fast enough for chat search.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const normalize = (value = "") => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

// This keeps search useful if Gemini is temporarily unavailable (quota/network),
// while Gemini remains the primary way product intent is understood.
const keywordMatches = (query, products) => {
  const terms = normalize(query).split(/\s+/).filter((term) => term.length > 1);
  return products
    .map((product) => {
      const haystack = normalize(`${product.name} ${product.category} ${product.description}`);
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { product, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ product }) => product);
};

const parseGeminiJson = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Gemini did not return JSON");
  return JSON.parse(match[0]);
};

// POST /api/product/ai-search
export const aiProductSearch = async (req, res) => {
  const query = String(req.body?.query || "").trim();
  if (query.length < 2) {
    return res.status(400).json({ success: false, message: "Please enter at least 2 characters." });
  }
  if (query.length > 300) {
    return res.status(400).json({ success: false, message: "Search request is too long." });
  }

  try {
    const products = await Product.find({ inStock: true }).lean();
    if (!products.length) {
      return res.json({ success: true, products: [], answer: "There are no available products right now.", source: "catalog" });
    }

    const fallbackProducts = keywordMatches(query, products);
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        products: fallbackProducts,
        answer: fallbackProducts.length ? "Here are the closest matching products." : "I could not find a matching product.",
        source: "catalog",
      });
    }

    const catalog = products.map(({ _id, name, category, description, offerPrice }) => ({
      id: String(_id), name, category, description, price: offerPrice,
    }));
    const prompt = `You are a helpful grocery-store product finder. Use ONLY items in this catalog. Interpret the shopper's request, including natural language needs such as meal ideas or dietary preferences. Return strict JSON only, with this exact shape: {"answer":"one short helpful sentence","productIds":["catalog id"]}. Return at most 6 productIds, always copied exactly from the catalog, and never invent items. If nothing fits, use an empty array.\n\nCatalog: ${JSON.stringify(catalog)}\n\nShopper request: ${query}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!response.ok) throw new Error(`Gemini request failed (${response.status})`);

    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    const aiResult = parseGeminiJson(text || "");
    const ids = new Set(Array.isArray(aiResult.productIds) ? aiResult.productIds : []);
    const matchedProducts = products.filter((product) => ids.has(String(product._id))).slice(0, 6);

    return res.json({
      success: true,
      products: matchedProducts,
      answer: typeof aiResult.answer === "string" ? aiResult.answer : "Here are products picked for you.",
      source: "gemini",
    });
  } catch (error) {
    console.error("AI product search:", error.message);
    // A standard catalog result is preferable to breaking the shopper's search.
    try {
      const products = await Product.find({ inStock: true }).lean();
      const matches = keywordMatches(query, products);
      return res.json({
        success: true,
        products: matches,
        answer: matches.length ? "Gemini is briefly unavailable; here are the closest catalog matches." : "I could not find a matching product.",
        source: "catalog",
      });
    } catch (catalogError) {
      return res.status(500).json({ success: false, message: "Unable to search products right now." });
    }
  }
};
