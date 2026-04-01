import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();

  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category,
  );

  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  return (
    <div className="mt-16 px-4 md:px-10 mb-10">
      {/* 🔹 Category Title */}
      {searchCategory && (
        <div className="mb-6">
          <p className="text-3xl font-semibold uppercase">
            {searchCategory.text}
          </p>
          <div className="w-16 h-1 bg-green-500 mt-2 rounded"></div>
        </div>
      )}

      {/* 🔹 Product Grid */}
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filterProducts.map((product) => (
            <div className="hover:scale-105 transition duration-200">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      ) : (
        // 🔹 Empty State
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
