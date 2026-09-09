import Product from "../models/Product.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "for", "from", "i", "in", "is", "me", "my",
  "of", "on", "or", "please", "show", "some", "the", "to", "want", "with",
]);

const SEARCH_SYNONYMS = {
  milk: ["dairy"],
  dairy: ["milk", "paneer", "cheese", "eggs"],
  fruit: ["fruits", "apple", "orange", "banana", "mango", "grapes"],
  fruits: ["fruit", "apple", "orange", "banana", "mango", "grapes"],
  vegetable: ["vegetables", "potato", "tomato", "carrot", "spinach", "onion"],
  vegetables: ["vegetable", "potato", "tomato", "carrot", "spinach", "onion"],
  drink: ["drinks", "coca cola", "pepsi", "sprite", "fanta", "7 up"],
  drinks: ["drink", "coca cola", "pepsi", "sprite", "fanta", "7 up"],
  bread: ["bakery", "brown bread", "whole bread", "croissant"],
  bakery: ["bread", "cake", "croissant", "muffins"],
  rice: ["grains", "basmati rice", "brown rice"],
  flour: ["wheat flour", "grains"],
  noodle: ["noodles", "maggi", "ramen", "yippee"],
  noodles: ["noodle", "maggi", "ramen", "yippee"],
  breakfast: ["bread", "eggs", "milk", "oats", "croissant", "muffins"],
  healthy: ["organic", "quinoa", "spinach", "oats", "brown rice", "fruits"],
  snack: ["noodles", "muffins", "croissant", "fruit"],
};

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokens = (value = "") =>
  normalize(value)
    .split(" ")
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));

const buildSearchTerms = (query) => {
  const terms = tokens(query);
  const expanded = new Set(terms);

  for (const term of terms) {
    for (const synonym of SEARCH_SYNONYMS[term] || []) {
      for (const synonymTerm of tokens(synonym)) expanded.add(synonymTerm);
    }
  }

  return [...expanded];
};

const productText = (product) =>
  normalize(
    [
      product.name,
      product.category,
      Array.isArray(product.description)
        ? product.description.join(" ")
        : product.description,
    ].join(" "),
  );

// Deterministic catalog matching is always available. This catches exact names,
// partial names, category searches, common synonyms, and simple natural queries.
const keywordMatches = (query, products) => {
  const normalizedQuery = normalize(query);
  const queryTerms = tokens(query);
  const searchTerms = buildSearchTerms(query);

  return products
    .map((product) => {
      const name = normalize(product.name);
      const category = normalize(product.category);
      const description = normalize(
        Array.isArray(product.description)
          ? product.description.join(" ")
          : product.description,
      );
      const haystack = productText(product);
      let score = 0;

      // Exact product-name phrase gets the strongest score.
      if (normalizedQuery && name === normalizedQuery) score += 100;
      if (normalizedQuery && name.includes(normalizedQuery)) score += 45;

      // Token matches favor the product name and category over description.
      for (const term of queryTerms) {
        if (name.split(" ").includes(term)) score += 18;
        else if (name.includes(term)) score += 12;
        if (category.split(" ").includes(term)) score += 14;
        else if (category.includes(term)) score += 8;
        if (description.includes(term)) score += 4;
      }

      // Expanded terms help with requests like "healthy breakfast" or "fruit".
      for (const term of searchTerms) {
        if (name.includes(term)) score += 3;
        if (category.includes(term)) score += 5;
        if (description.includes(term)) score += 1;
      }

      // Small typo tolerance for product names (e.g. "amol milk").
      for (const term of queryTerms) {
        if (term.length < 4) continue;
        for (const nameTerm of name.split(" ")) {
          if (Math.abs(nameTerm.length - term.length) > 1) continue;
          let differences = 0;
          const maxLength = Math.max(nameTerm.length, term.length);
          for (let i = 0; i < maxLength; i += 1) {
            if (nameTerm[i] !== term[i]) differences += 1;
          }
          if (differences <= 1) score += 10;
        }
      }

      return { product, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ product }) => product);
};

const parseGeminiJson = (text) => {
  const match = String(text || "").match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Gemini did not return JSON");
  return JSON.parse(match[0]);
};

const makeCatalog = (products) =>
  products.map(({ _id, name, category, description, offerPrice }) => ({
    id: String(_id),
    name,
    category,
    description,
    price: offerPrice,
  }));

// POST /api/product/ai-search
export const aiProductSearch = async (req, res) => {
  const query = String(req.body?.query || "").trim();

  if (query.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Please enter at least 2 characters.",
    });
  }

  if (query.length > 300) {
    return res.status(400).json({
      success: false,
      message: "Search request is too long.",
    });
  }

  try {
    const products = await Product.find({ inStock: true }).lean();

    if (!products.length) {
      return res.json({
        success: true,
        products: [],
        answer: "There are no available products right now.",
        source: "catalog",
      });
    }

    const fallbackProducts = keywordMatches(query, products);

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        products: fallbackProducts.slice(0, 6),
        answer: fallbackProducts.length
          ? "Here are the closest matching products."
          : "I could not find a matching product.",
        source: "catalog",
      });
    }

    const catalog = makeCatalog(products);
    const prompt = `You are the product-search engine for a grocery store. Use ONLY products from the catalog below. Understand exact product names, partial names, misspellings, categories, synonyms, ingredients, use cases, meal ideas, dietary preferences, and natural-language shopping requests. Prefer an exact or clearly relevant catalog item over a generic answer. Return strict JSON only in this exact shape: {"answer":"one short helpful sentence","productIds":["catalog id"]}. Return at most 6 productIds. Every productId MUST be copied exactly from the catalog. Never invent an id or product. If nothing in the catalog reasonably matches, return an empty productIds array.\n\nCATALOG:\n${JSON.stringify(catalog)}\n\nSHOPPER REQUEST:\n${query}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed (${response.status})`);
    }

    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    const aiResult = parseGeminiJson(text);
    const requestedIds = Array.isArray(aiResult.productIds)
      ? aiResult.productIds.map(String)
      : [];
    const productById = new Map(products.map((product) => [String(product._id), product]));

    // Only accept IDs that actually exist in MongoDB. Never trust model output blindly.
    const aiProducts = requestedIds
      .map((id) => productById.get(id))
      .filter(Boolean)
      .slice(0, 6);

    // If Gemini misses an obvious exact/keyword result, append deterministic matches.
    // This makes common searches reliable while Gemini handles natural-language intent.
    const selectedIds = new Set(aiProducts.map((product) => String(product._id)));
    const mergedProducts = [...aiProducts];
    for (const product of fallbackProducts) {
      if (mergedProducts.length >= 6) break;
      const id = String(product._id);
      if (!selectedIds.has(id)) {
        selectedIds.add(id);
        mergedProducts.push(product);
      }
    }

    const answer =
      typeof aiResult.answer === "string" && aiResult.answer.trim()
        ? aiResult.answer.trim()
        : mergedProducts.length
          ? "Here are the products that best match your request."
          : "I could not find a matching product in our catalog.";

    return res.json({
      success: true,
      products: mergedProducts,
      answer,
      source: aiProducts.length ? "gemini" : "catalog",
    });
  } catch (error) {
    console.error("AI product search:", error.message);

    // AI failures never break product search. Return real catalog products instead.
    try {
      const products = await Product.find({ inStock: true }).lean();
      const matches = keywordMatches(query, products);

      return res.json({
        success: true,
        products: matches.slice(0, 6),
        answer: matches.length
          ? "AI search is briefly unavailable; here are the closest catalog matches."
          : "I could not find a matching product in our catalog.",
        source: "catalog",
      });
    } catch (catalogError) {
      console.error("Catalog search fallback:", catalogError.message);
      return res.status(500).json({
        success: false,
        message: "Unable to search products right now.",
      });
    }
  }
};
