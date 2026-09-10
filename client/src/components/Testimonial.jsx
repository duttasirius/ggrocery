import { useEffect, useState } from "react";
import { Check, LoaderCircle, MessageSquareQuote, Star } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const getInitials = (name = "Customer") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const StarRating = ({ rating }) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={15}
        className={
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "text-slate-200"
        }
      />
    ))}
  </div>
);

const Testimonial = () => {
  const { axios } = useAppContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/api/reviews");
        if (data.success) setReviews(data.reviews || []);
      } catch (error) {
        console.log("FETCH REVIEWS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [axios]);

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white px-4 py-16 md:py-20">
      <style>{`
        @keyframes testimonialScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonial-track {
          animation: testimonialScroll 60s linear infinite;
          width: max-content;
          will-change: transform;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
          }
        }
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
            See what our customers think about their shopping experience.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10 text-emerald-600">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No customer reviews yet. Reviews will appear here after customers
            share their experience from a product page.
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/70 to-transparent md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/70 to-transparent md:w-32" />
            <div className="testimonial-track flex gap-4">
              {[...reviews, ...reviews].map((review, index) => (
                <article
                  key={`${review._id || review.name || "review"}-${index}`}
                  className="w-[300px] shrink-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[360px]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <StarRating rating={review.rating} />
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      <Check size={13} /> Verified
                    </span>
                  </div>
                  <p className="mt-4 min-h-[96px] text-sm leading-6 text-slate-600">
                    “{review.text}”
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-xs font-bold text-white">
                      {getInitials(review.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {review.name}
                      </p>
                      <p className="text-xs text-slate-400">Customer</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
