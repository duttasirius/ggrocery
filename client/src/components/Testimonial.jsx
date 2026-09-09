import { useEffect, useMemo, useState } from "react";
import { Check, LoaderCircle, MessageSquareQuote, Pencil, Send, Star, Trash2, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const fallbackReviews = [
  {
    _id: "demo-1",
    name: "Cristofer Levin",
    rating: 5,
    text: "The products are always fresh, delivery is on time, and the app makes weekly grocery shopping incredibly easy.",
  },
  {
    _id: "demo-2",
    name: "Rohan Mehta",
    rating: 5,
    text: "I can order everything from home in minutes. Great prices, fast delivery, and a very smooth experience.",
  },
  {
    _id: "demo-3",
    name: "Sofia Martinez",
    rating: 4,
    text: "Fresh groceries, good packaging, and reliable delivery. It has quickly become part of my weekly routine.",
  },
];

const getInitials = (name = "Customer") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const StarRating = ({ rating, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type={interactive ? "button" : undefined}
        onClick={() => interactive && onChange(star)}
        className={interactive ? "rounded-md p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-200" : "p-0.5"}
        aria-label={interactive ? `Rate ${star} stars` : undefined}
      >
        <Star size={interactive ? 24 : 15} className={star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
      </button>
    ))}
  </div>
);

const Testimonial = () => {
  const { axios, user, setShowUserLogin } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("/api/reviews");
      if (data.success) setReviews(data.reviews || []);
    } catch (requestError) {
      console.log("FETCH REVIEWS ERROR:", requestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const myReview = useMemo(
    () => reviews.find((review) => review.user === user?._id || review.user?._id === user?._id),
    [reviews, user],
  );

  const openReviewForm = () => {
    setError("");
    setNotice("");

    if (!user) {
      setShowUserLogin(true);
      return;
    }

    if (myReview) {
      setRating(myReview.rating);
      setText(myReview.text);
      setEditing(true);
    } else {
      setRating(5);
      setText("");
      setEditing(false);
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
      const endpoint = "/api/reviews";
      const { data } = editing
        ? await axios.put(endpoint, { rating, text: text.trim() })
        : await axios.post(endpoint, { rating, text: text.trim() });

      if (!data.success) {
        setError(data.message || "Could not save your review.");
        return;
      }

      setNotice(editing ? "Your review was updated." : "Thanks for sharing your experience! 🎉");
      setReviews((current) => {
        const next = editing
          ? current.map((review) => (review._id === data.review._id ? data.review : review))
          : [data.review, ...current];
        return next;
      });
      setShowForm(false);
    } catch (requestError) {
      if (requestError?.response?.status === 401 || requestError?.response?.status === 403) {
        setShowUserLogin(true);
      } else {
        setError(requestError?.response?.data?.message || "Could not save your review. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = async () => {
    if (!window.confirm("Delete your review?")) return;

    try {
      const { data } = await axios.delete("/api/reviews");
      if (data.success) {
        setReviews((current) => current.filter((review) => review._id !== myReview?._id));
        setNotice("Your review was deleted.");
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Could not delete your review.");
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;
  const duplicatedReviews = [...displayReviews, ...displayReviews];

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white px-4 py-16 md:py-20">
      <style>{`
        @keyframes testimonialScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes testimonialScrollReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .testimonial-track { animation: testimonialScroll 32s linear infinite; width: max-content; }
        .testimonial-track.reverse { animation-name: testimonialScrollReverse; }
        .testimonial-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .testimonial-track { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <MessageSquareQuote size={14} /> Customer reviews
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Loved by our customers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Real feedback from people who shop with us. Your experience can help the next customer shop with confidence.
          </p>

          <button
            type="button"
            onClick={openReviewForm}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {myReview ? <Pencil size={16} /> : <Star size={16} />}
            {myReview ? "Edit your review" : "Write a review"}
          </button>

          {notice && <p className="mt-3 text-sm font-medium text-emerald-600">{notice}</p>}
        </div>

        {showForm && (
          <div className="mx-auto mb-10 max-w-xl rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{editing ? "Update your review" : "Share your experience"}</h3>
                <p className="mt-1 text-xs text-slate-500">Signed in as {user?.name || "customer"}</p>
              </div>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close review form">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitReview} className="mt-5">
              <label className="text-sm font-semibold text-slate-700">Your rating</label>
              <div className="mt-2 flex items-center gap-2">
                <StarRating rating={rating} interactive onChange={setRating} />
                <span className="text-sm font-semibold text-slate-500">{rating}/5</span>
              </div>

              <label htmlFor="customer-review" className="mt-5 block text-sm font-semibold text-slate-700">Your review</label>
              <textarea
                id="customer-review"
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell us what you liked about your shopping experience…"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400"><span>{error}</span><span>{text.length}/500</span></div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button disabled={submitting} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50">
                  {submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
                  {editing ? "Update review" : "Publish review"}
                </button>
                {editing && (
                  <button type="button" onClick={deleteReview} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                    <Trash2 size={16} /> Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10 text-emerald-600"><LoaderCircle className="animate-spin" /></div>
        ) : (
          <div className="relative space-y-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/70 to-transparent md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/70 to-transparent md:w-32" />

            {[0, 1].map((row) => {
              const rowReviews = displayReviews.filter((_, index) => index % 2 === row);
              const rowItems = rowReviews.length ? rowReviews : displayReviews;
              const items = [...rowItems, ...rowItems];

              return (
                <div key={row} className="overflow-hidden py-1">
                  <div className={`testimonial-track flex gap-4 ${row === 1 ? "reverse" : ""}`}>
                    {items.map((review, index) => (
                      <article key={`${review._id}-${index}`} className="w-[300px] shrink-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[360px]">
                        <div className="flex items-center justify-between gap-3">
                          <StarRating rating={review.rating} />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Verified customer</span>
                        </div>
                        <p className="mt-4 min-h-[96px] text-sm leading-6 text-slate-600">“{review.text}”</p>
                        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-xs font-bold text-white">
                            {getInitials(review.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-800">{review.name}</p>
                            <p className="text-xs text-slate-400">Customer</p>
                          </div>
                          {review.user && <Check size={15} className="ml-auto text-emerald-500" aria-label="Verified account" />}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
