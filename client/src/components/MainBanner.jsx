import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        src={assets.main_banner_bg}
        className="w-full h-[400px] md:h-[650px] object-cover"
        alt="banner"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-black max-w-xl leading-tight">
          Freshness you can trust, savings you love 🌿
        </h1>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {/* Shop Now */}
          <Link
            to="/products"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
          >
            Shop Now
            <img src={assets.white_arrow_icon} className="w-4" alt="" />
          </Link>

          {/* Explore Deals */}
          <Link
            to="/products"
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-green-700 px-6 py-2 rounded-full border border-green-600 transition"
          >
            Explore Deals
            <img src={assets.black_arrow_icon} className="w-4" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
