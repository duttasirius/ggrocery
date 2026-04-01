import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10">
      {/* Title */}
      <p className="text-2xl font-bold text-gray-800 mb-6">Categories </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer 
                       hover:scale-105 transition duration-200 shadow-sm hover:shadow-md"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.text}
              className="w-16 h-16 object-contain mb-3"
            />

            {/* Text */}
            <p className="text-sm font-medium text-gray-700 text-center">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
