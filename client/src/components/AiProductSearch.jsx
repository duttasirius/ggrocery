import { useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const AiProductSearch = () => {
  const { axios, navigate, addToCart } = useAppContext();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const search = async (event) => {
    event.preventDefault();
    if (query.trim().length < 2 || loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/product/ai-search", { query: query.trim() });
      if (data.success) setResult(data);
      else setResult({ answer: data.message || "I couldn't search right now.", products: [] });
    } catch (error) {
      setResult({ answer: error?.response?.data?.message || "I couldn't search right now. Please try again.", products: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2"><Sparkles size={18} /><div><p className="font-semibold">GreenCart AI</p><p className="text-xs text-white/80">Find groceries by asking naturally</p></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close AI search" className="rounded-full p-1 hover:bg-white/15"><X size={19} /></button>
          </header>
          <div className="max-h-[55vh] min-h-32 overflow-y-auto p-4">
            {!result ? <p className="text-sm text-gray-500">Try “ingredients for pasta”, “healthy breakfast”, or “fresh fruit”.</p> : <><div className="flex gap-2 text-sm text-gray-700"><Bot className="mt-0.5 shrink-0 text-emerald-600" size={18} /><p>{result.answer}</p></div>
              {result.products?.length > 0 && <div className="mt-3 space-y-2">{result.products.map((product) => <div key={product._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-2"><img className="h-12 w-12 rounded-lg object-contain" src={product.image?.[0]} alt="" /><button onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); setOpen(false); }} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium text-gray-800">{product.name}</p><p className="text-xs text-emerald-600">${product.offerPrice}</p></button><button onClick={() => addToCart(product._id)} className="rounded-lg bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Add</button></div>)}</div>}
            </>}
          </div>
          <form onSubmit={search} className="flex gap-2 border-t border-gray-100 p-3"><input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} maxLength="300" className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="Ask AI to find products..." /><button disabled={loading || query.trim().length < 2} className="rounded-xl bg-emerald-500 p-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50" aria-label="Search">{loading ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}</button></form>
        </section>
      )}
      <button onClick={() => setOpen(!open)} aria-label="Open AI product search" className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg transition hover:scale-105 hover:shadow-xl"><MessageCircle size={26} /></button>
    </div>
  );
};

export default AiProductSearch;
