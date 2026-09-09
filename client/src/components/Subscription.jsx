const Subscription = () => {
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

          * {
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <div className="bg-slate-50 py-16 px-4 mt-11">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
              Flexible Plans for Every Shopper
            </h1>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose a plan that fits your grocery shopping needs. Enjoy
              convenient deliveries, exclusive discounts, and premium benefits
              designed to save you time and money.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* FREE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Free
              </h3>

              <p className="text-slate-600 mb-8">
                Perfect for occasional grocery shoppers who want reliable
                delivery and fresh products.
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">₹0</span>
                <span className="text-slate-500 ml-2">/month</span>
              </div>

              <button className="w-full py-3 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition mb-4">
                Start Shopping
              </button>

              <p className="text-sm text-slate-500 mb-6">
                Free forever. No hidden charges.
              </p>

              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div>✓ Browse all products</div>
                <div>✓ Standard delivery</div>
                <div>✓ Real-time order tracking</div>
                <div>✓ Regular discounts</div>
              </div>
            </div>

            {/* PRO */}
            <div className="bg-slate-900 border  rounded-2xl p-8 shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Pro</h3>

              <p className="text-slate-300 mb-8">
                Ideal for families and frequent shoppers looking for extra
                savings and faster deliveries.
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹199</span>
                <span className="text-slate-400 ml-2">/month</span>
              </div>

              <button>
                <style>{`
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  .rainbow::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 30%;
    background-position: 100% 50%;
    background-image: linear-gradient(#22c55e, #16a34a);
    filter: blur(6px);
    animation: rotate 4s linear infinite;
  }
`}</style>
                <div className="flex justify-center items-center  mb-6">
                  <div className="rainbow relative z-0 overflow-hidden p-0.5 rounded-full w-fit hover:scale-105 transition-all duration-300 active:scale-100">
                    <button className="px-12 py-3 md:ml-6 text-sm font-medium text-white bg-slate-800 rounded-full cursor-pointer">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </button>

              <p className="text-sm text-slate-400 mb-6">
                Save more with exclusive member benefits.
              </p>

              <div className="border-t border-slate-700 pt-6 space-y-4 text-white">
                <div>✓ Everything in Free</div>
                <div>✓ Free delivery on eligible orders</div>
                <div>✓ Priority order processing</div>
                <div>✓ Exclusive member discounts</div>
                <div>✓ Early access to sales</div>
                <div>✓ Priority support</div>
              </div>
            </div>

            {/* ENTERPRISE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-600 hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Enterprise
              </h3>

              <p className="text-slate-600 mb-8">
                Designed for restaurants, offices, and businesses that require
                bulk grocery purchases.
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">₹999</span>
                <span className="text-slate-500 ml-2">/month</span>
              </div>

              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:opacity-90 transition mb-4">
                Contact Sales
              </button>

              <p className="text-sm text-slate-500 mb-6">
                Premium solutions for growing businesses.
              </p>

              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div>✓ Everything in Pro</div>
                <div>✓ Bulk order discounts</div>
                <div>✓ Scheduled recurring deliveries</div>
                <div>✓ Dedicated account manager</div>
                <div>✓ Custom invoicing</div>
                <div>✓ 24/7 premium support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
