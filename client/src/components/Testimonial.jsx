const Testimonial = () => {
  const testimonials = [
    {
      text: "I've been using this grocery delivery app for a few months, and it has made shopping so much easier. The products are always fresh, delivery is on time, and the app interface is simple to navigate. Highly recommended for busy families.",
      name: "Cristofer Levin",
      role: "Home Chef",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      text: "This app saves me a lot of time every week. I can quickly order groceries from home and receive them within hours. The prices are reasonable, customer support is responsive, and the delivery staff are always polite and professional",
      name: "Rohan Mehta",
      role: "Busy Parent",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      text: "I am very satisfied with the service provided by this grocery delivery app. The product selection is extensive, and I rarely encounter missing items. Deliveries arrive as scheduled, and the packaging keeps everything fresh and well-organized every time.",
      name: "Jason Kim",
      role: "Weekly Grocery Buyer",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      text: "Shopping through this app has been a wonderful experience. The ordering process is smooth, and I appreciate the frequent discounts available. Fresh vegetables, fruits, and household essentials arrive promptly, making grocery shopping much more convenient and stress-free.",
      name: "Alex Turner",
      role: "Regular Customer",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      text: "The app is reliable and user-friendly. I especially like the real-time order tracking feature, which keeps me informed throughout the delivery process. The quality of groceries is consistently good, and the service has exceeded my expectations every time.",
      name: "Sofia Martinez",
      role: "Frequent User",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      text: "This grocery delivery app has become an essential part of my routine. It offers a great variety of products, competitive prices, and fast delivery. The convenience it provides helps me save time while ensuring I always have fresh groceries.",
      name: "Daniel Wong",
      role: "Premium Member",
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];

  const rows = [
    { start: 0, end: 3, className: "animate-scroll" },
    { start: 3, end: 6, className: "animate-scroll-reverse" },
  ];

  const renderCard = (testimonial, index) => (
    <div
      key={index}
      className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-[350px] max-sm:mx-10"
    >
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star text-transparent fill-[#737373]"
              aria-hidden="true"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
          ))}
      </div>
      <p className="text-neutral-700 text-sm mb-6">{testimonial.text}</p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-neutral-800 text-sm">
            {testimonial.name}
          </p>
          <p className="text-neutral-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollReverse {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 15s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scrollReverse 15s linear infinite;
                    }
                `}
      </style>
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-neutral-100 border border-neutral-400 rounded-full px-4 py-1 mb-3">
              <span className="text-xs text-neutral-600">
                Loved by our Customer
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 mb-4">
              What people are saying
            </h2>
            <p className="text-neutral-600 text-sm max-w-96 mx-auto">
              See what our happy customers have to say about their experience
              with our grocery delivery service. From fresh products to fast
              deliveries, their feedback reflects our commitment to quality,
              convenience, and customer satisfaction. 🌟🛒
            </p>
          </div>

          <div className="space-y-6">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                <div className={`flex gap-6 ${row.className}`}>
                  {[
                    ...testimonials.slice(row.start, row.end),
                    ...testimonials.slice(row.start, row.end),
                  ].map((testimonial, index) => renderCard(testimonial, index))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Testimonial;
