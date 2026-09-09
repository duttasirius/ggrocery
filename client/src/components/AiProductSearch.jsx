import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  ShoppingBag,
  X,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const starterMessage = {
  role: "assistant",
  answer: "Hi! I’m your GreenCart shopping assistant. Tell me what you’re looking for and I’ll find the best matches from the store.",
};

const AiProductSearch = () => {
  const { axios, navigate, addToCart } = useAppContext();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([starterMessage]);
  const [addedProductId, setAddedProductId] = useState(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const search = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2 || loading) return;

    // Clear the input immediately so submitted text does not stay in the textarea.
    setQuery("");
    setMessages((current) => [...current, { role: "user", text: trimmedQuery }]);
    setLoading(true);

    try {
      const { data } = await axios.post("/api/product/ai-search", { query: trimmedQuery });

      if (data.success) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            answer: data.answer,
            products: data.products || [],
          },
        ]);
      } else {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            answer: data.message || "I couldn’t search right now. Please try again.",
            products: [],
          },
        ]);
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          answer:
            error?.response?.data?.message ||
            "I couldn’t search right now. Please try again.",
          products: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productId) => {
    await addToCart(productId);
    setAddedProductId(productId);
    setTimeout(() => setAddedProductId(null), 1400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section className="mb-4 flex w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_24px_70px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <header className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 px-5 py-4 text-white">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 left-16 h-24 w-24 rounded-full bg-lime-300/10 blur-2xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner backdrop-blur-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold tracking-tight">GreenCart AI</p>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90">
                      AI
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/75">
                    Your personal grocery finder
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI search"
                className="rounded-full p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <X size={19} />
              </button>
            </div>
          </header>

          <div
            ref={messagesRef}
            className="max-h-[58vh] min-h-[300px] space-y-4 overflow-y-auto bg-gradient-to-b from-slate-50/90 to-white p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                {message.role === "user" ? (
                  <div className="max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-br from-emerald-500 to-green-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {message.text}
                  </div>
                ) : (
                  <div className="flex max-w-[94%] gap-2.5">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <Bot size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-3.5 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                        {message.answer}
                      </div>

                      {message.products?.length > 0 && (
                        <div className="mt-2.5 space-y-2">
                          {message.products.map((product) => (
                            <div
                              key={product._id}
                              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                              <img
                                className="h-14 w-14 shrink-0 rounded-xl bg-slate-50 object-contain p-1"
                                src={product.image?.[0]}
                                alt={product.name}
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  navigate(
                                    `/products/${product.category.toLowerCase()}/${product._id}`
                                  );
                                  setOpen(false);
                                }}
                                className="min-w-0 flex-1 text-left"
                              >
                                <p className="truncate text-sm font-semibold text-slate-800 transition group-hover:text-emerald-600">
                                  {product.name}
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-emerald-600">
                                  ${product.offerPrice}
                                </p>
                              </button>

                              <button
                                type="button"
                                onClick={() => addProduct(product._id)}
                                aria-label={`Add ${product.name} to cart`}
                                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-100 px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                              >
                                {addedProductId === product._id ? (
                                  <>
                                    <Check size={14} />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag size={14} />
                                    Add
                                  </>
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex max-w-[94%] gap-2.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                    <LoaderCircle className="animate-spin text-emerald-500" size={15} />
                    <span className="text-xs text-slate-500">Finding the best matches…</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-3">
            <form
              onSubmit={search}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-inner transition focus-within:border-emerald-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-50"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                maxLength={300}
                className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Ask for groceries…"
                aria-label="Ask GreenCart AI"
              />
              <button
                type="submit"
                disabled={loading || query.trim().length < 2}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                aria-label="Send search"
              >
                {loading ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              Try “healthy breakfast”, “dairy products”, or “fresh fruit”
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close AI product search" : "Open AI product search"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white shadow-[0_12px_30px_-8px_rgba(5,150,105,0.65)] transition duration-300 hover:scale-105 hover:shadow-[0_16px_34px_-8px_rgba(5,150,105,0.7)] focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
};

export default AiProductSearch;
