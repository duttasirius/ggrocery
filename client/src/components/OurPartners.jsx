import appleImage from "../assets/apple_image.png";
import amulMilkImage from "../assets/amul_milk_image.png";
import organicVegetableImage from "../assets/organic_vegitable_image.png";
import butterCroissantImage from "../assets/butter_croissant_image.png";
import quinoaImage from "../assets/quinoa_image.png";
import bottlesImage from "../assets/bottles_image.png";
import paneerImage from "../assets/paneer_image.png";

const partners = [
  {
    name: "Fresh Farms",
    subtitle: "Farm-picked produce",
    image: organicVegetableImage,
  },
  {
    name: "Orchard Select",
    subtitle: "Fresh seasonal fruit",
    image: appleImage,
  },
  {
    name: "Daily Dairy",
    subtitle: "Fresh dairy essentials",
    image: amulMilkImage,
  },
  {
    name: "Bakehouse Co.",
    subtitle: "Fresh baked favorites",
    image: butterCroissantImage,
  },
  {
    name: "Pure Grains",
    subtitle: "Wholesome pantry staples",
    image: quinoaImage,
  },
  {
    name: "Cool Refresh",
    subtitle: "Chilled drinks & more",
    image: bottlesImage,
  },
  {
    name: "Fresh Kitchen",
    subtitle: "Everyday dairy goodness",
    image: paneerImage,
  },
];

const OurPartners = () => {
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <style>{`
        .partners-marquee {
          animation: partnersMarquee 28s linear infinite;
        }

        .partners-track:hover .partners-marquee {
          animation-play-state: paused;
        }

        @keyframes partnersMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-marquee {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Our partners
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Great food starts with great partners
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            A handpicked network across fresh produce, dairy, bakery, beverages,
            and pantry essentials — bringing quality closer to your doorstep.
          </p>
        </div>

        <div className="partners-track relative overflow-hidden rounded-[28px] border border-slate-100 bg-white/80 py-3 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.28)] backdrop-blur">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-32" />

          <div className="partners-marquee flex w-max will-change-transform">
            {marqueeItems.map((partner, index) => (
              <article
                key={`${partner.name}-${index}`}
                className="group mx-2.5 flex w-[230px] shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-100 hover:shadow-md sm:w-[255px] sm:mx-3"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-100 transition duration-300 group-hover:bg-emerald-50">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                    draggable={false}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-900">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {partner.subtitle}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Store partner
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="h-px w-8 bg-slate-200" />
          <span>Hover to pause</span>
          <span className="h-px w-8 bg-slate-200" />
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
