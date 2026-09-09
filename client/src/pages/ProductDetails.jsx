import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, LoaderCircle, Pencil, Send, Star, Trash2, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const StarRating = ({ rating, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type={interactive ? "button" : undefined}
        onClick={() => interactive && onChange(star)}
        className={interactive ? "rounded p-1 transition hover:scale-110" : "p-0.5"}
        aria-label={interactive ? `Rate ${star} stars` : `${star} stars`}
      >
        <Star size={interactive ? 25 : 16} className={star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
      </button>
    ))}
  </div>
);

const ProductReviews = ({ productId }) => {
  const { axios, user, setShowUserLogin } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/reviews?productId=${productId}`);
      if (data.success) setReviews(data.reviews || []);

      if (user) {
        const mine = await axios.get(`/api/reviews/mine?productId=${productId}`);
        if (mine.data.success) setMyReview(mine.data.review || null);
      } else {
        setMyReview(null);
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Could not load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId, user]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  const openForm = () => {
    setError("");
    setNotice("");
    if (!user) {
      setShowUserLogin(true);
      return;
    }

    if (myReview) {
      setEditing(true);
      setRating(myReview.rating);
      setText(myReview.text);
    } else {
      setEditing(false);
      setRating(5);
      setText("");
    }
    setShowForm(true);
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (text.trim().length < 8) {
      setError("Please write at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = editing
        ? await axios.put("/api/reviews", { productId, rating, text: text.trim() })
        : await axios.post("/api/reviews", { productId, rating, text: text.trim() });

      if (!data.success) {
        setError(data.message || "Could not save your review.");
        return;
      }

      setMyReview(data.review);
      setReviews((current) =>
        editing
          ? current.map((review) => (review._id === data.review._id ? data.review : review))
          : [data.review, ...current],
      );
      setShowForm(false);
      setNotice(editing ? "Your review was updated." : "Thanks for reviewing this product! 🎉");
    } catch (requestError) {
      if (requestError?.response?.status === 401 || requestError?.response?.status === 403) {
        setShowUserLogin(true);
      } else {
        setError(requestError?.response?.data?.message || "Could not save your review.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = async () => {
    if (!window.confirm("Delete your review for this product?")) return;

    try {
      const { data } = await axios.delete("/api/reviews", { data: { productId } });
      if (data.success) {
        setReviews((current) => current.filter((review) => review._id !== myReview?._id));
        setMyReview(null);
        setShowForm(false);
        setNotice("Your review was deleted.");
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Could not delete your review.");
    }
  };

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Customer feedback</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Reviews for this product</h2>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm font-semibold text-slate-600">
              {reviews.length ? `${averageRating.toFixed(1)} / 5 · ${reviews.length} review${reviews.length === 1 ? "" : "s"}` : "No reviews yet"}
            </span>
          </div>
        </div>
        <button onClick={openForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
          {myReview ? <Pencil size={16} /> : <Star size={16} />}
          {myReview ? "Edit your review" : "Write a review"}
        </button>
      </div>

      {notice && <p className="mt-4 text-sm font-medium text-emerald-600">{notice}</p>}
      {error && !showForm && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {showForm && (
        <div className="mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-900">{editing ? "Update your review" : "Rate this product"}</h3>
              <p className="mt-1 text-xs text-slate-500">Your review will be visible to other shoppers.</p>
            </div>
            <button onClick={() => setShowForm(false)} className="rounded-full p-2 text-slate-400 hover:bg-white" aria-label="Close"><X size={18} /></button>
          </div>

          <form onSubmit={submitReview} className="mt-5">
            <label className="text-sm font-semibold text-slate-700">Your rating</label>
            <div className="mt-2 flex items-center gap-2"><StarRating rating={rating} interactive onChange={setRating} /><span className="text-sm font-semibold text-slate-500">{rating}/5</span></div>

            <label htmlFor="product-review" className="mt-5 block text-sm font-semibold text-slate-700">Your review</label>
            <textarea id="product-review" value={text} onChange={(event) => setText(event.target.value)} maxLength={500} rows={4} placeholder="How was this product?" className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50" />
            <div className="mt-1 flex justify-between text-xs text-slate-400"><span>{error}</span><span>{text.length}/500</span></div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button disabled={submitting} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
                {editing ? "Update review" : "Publish review"}
              </button>
              {editing && <button type="button" onClick={deleteReview} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"><Trash2 size={16} /> Delete</button>}
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full flex justify-center py-10 text-emerald-600"><LoaderCircle className="animate-spin" /></div>
        ) : reviews.length ? (
          reviews.map((review) => (
            <article key={review._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <StarRating rating={review.rating} />
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><Check size={14} /> Verified customer</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">“{review.text}”</p>
              <div className="mt-4 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-800">{review.name}</div>
            </article>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <Star className="mx-auto text-amber-400" />
            <p className="mt-3 font-semibold text-slate-800">Be the first to review this product</p>
            <p className="mt-1 text-sm text-slate-500">Share your experience and help other shoppers.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductDetails = () => {
  const { navigate, products, addToCart } = useAppContext();
  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();
  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      setRelatedProducts(products.filter((item) => item.category === product.category && item._id !== product._id).slice(0, 8));
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.length) setThumbnail(product.image[0]);
  }, [product]);

  return product ? (
    <div className="mx-auto mb-20 max-w-6xl px-4 md:px-6">
      <p className="text-sm text-gray-500"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link> / <span className="font-medium text-indigo-500">{product.name}</span></p>

      <div className="mt-6 flex flex-col gap-10 md:flex-row">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.slice(0, 4).map((image, index) => (
              <button key={`${image}-${index}`} type="button" onClick={() => setThumbnail(image)} className={`h-20 w-20 overflow-hidden rounded-xl border ${thumbnail === image ? "border-emerald-500 ring-2 ring-emerald-100" : "border-gray-300"}`}>
                <img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="h-80 w-80 overflow-hidden rounded-2xl border border-gray-300 bg-slate-50">
            <img src={thumbnail} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1">{Array(5).fill(null).map((_, i) => <img key={i} src={i < product.rating ? assets.star_icon : assets.star_dull_icon} className="w-4" alt="star" />)}<span className="ml-2 text-sm text-gray-500">Product rating</span></div>
          <div className="mt-5"><p className="text-gray-400 line-through">₹{product.price}</p><p className="text-2xl font-bold text-green-400">₹{product.offerPrice}</p><span className="text-xs text-gray-500">(inclusive of all taxes)</span></div>
          <p className="mt-6 font-medium">About Product</p><p>{product.description}</p>
          <div className="mt-8 flex gap-4"><button onClick={() => addToCart(product._id)} className="flex-1 rounded bg-gray-100 py-3 transition hover:bg-gray-200">Add to Cart</button><button onClick={() => { addToCart(product._id); navigate("/cart"); }} className="flex-1 rounded bg-green-500 py-3 text-white transition hover:bg-green-600">Buy Now</button></div>
        </div>
      </div>

      <ProductReviews productId={product._id} />

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-semibold md:text-2xl">Related Products</h2>
        <div className="grid grid-cols-2 gap-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">{relatedProducts.filter((item) => item.inStock).map((item) => <ProductCard key={item._id} product={item} />)}</div>
        <button onClick={() => { navigate("/products"); scrollTo(0, 0); }} className="mx-auto my-16 flex cursor-pointer items-center justify-center rounded border bg-green-500 px-12 py-3 text-xl hover:bg-green-600">See More</button>
        {relatedProducts.length === 0 && <p className="mt-4 text-sm text-gray-400">No related products found.</p>}
      </div>
    </div>
  ) : null;
};

export default ProductDetails;
