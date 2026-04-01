import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24 w-full overflow-hidden rounded-2xl">
      {/* Background Image */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full  object-cover"
      />

      {/* Overlay */}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-end px-6 md:px-16">
        <div className="max-w-md text-black space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            WHY WE ARE THE BEST
          </h1>

          <div className="space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl"
              >
                <img
                  src={feature.icon}
                  alt=""
                  className="w-10 h-10 object-contain"
                />

                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-black">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
