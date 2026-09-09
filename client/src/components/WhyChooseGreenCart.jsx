"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description:
      "Shop confidently with secure payments and reliable protection for every order.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your favorite products delivered quickly and safely right to your doorstep.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Changed your mind? Enjoy a simple and hassle-free return experience.",
  },
  {
    icon: Headphones,
    title: "Always Here to Help",
    description:
      "Our support team is ready to help whenever you need assistance with your order.",
  },
];

function WhyChooseGreenCart() {
  return (
    <section className="w-full bg-[#f7faf7] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
            Why GreenCart
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Shopping made{" "}
            <span className="text-green-600">simple, secure & better.</span>
          </h2>

          <p className="mt-4 text-gray-500 text-sm sm:text-base leading-7">
            From discovering the right products to getting them delivered,
            GreenCart is built to make every step of your shopping experience
            smooth and reliable.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
              >
                {/* Decorative circle */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-50 transition-all duration-300 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="relative mt-6 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 h-[2px] w-8 rounded-full bg-green-500 transition-all duration-300 group-hover:w-16" />
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-8 rounded-3xl border border-gray-200 bg-white px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Everything you need, all in one place.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Quality products. Reliable service. A better way to shop.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Trusted shopping experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseGreenCart;
