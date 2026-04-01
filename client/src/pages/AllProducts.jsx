import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery, setSearchQuery } = useAppContext();
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    // 👉 This hook runs whenever `products` OR `searchQuery` changes

    if (searchQuery.length > 0) {
      // 👉 If user typed something in search input

      setFilterProducts(
        // 👉 Update filtered products state

        products.filter(
          (product) =>
            // 👉 Loop through all products

            product.name.toLowerCase().includes(
              // 👉 Convert product name to lowercase
              searchQuery.toLowerCase(),
              // 👉 Convert search text to lowercase
            ),
          // 👉 Check if product name includes search text
        ),
      );
    } else {
      // 👉 If search input is empty

      setFilterProducts(products);
      // 👉 Reset: show all products again
    }
  }, [products, searchQuery]);
  // 👉 Dependency array:
  // runs effect when:
  // 1. products list changes
  // 2. searchQuery changes (user typing)

  return (
    <div className="mt-16 px-4 md:px-10 flex flex-col gap-8">
      <div className="flex flex-col items-end w-max">
        <p className="text-3xl font-semibold uppercase tracking-wide">
          ALL PRODUCTS
        </p>
        <div className="w-16 h-1 bg-green-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filterProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <div className="hover:scale-105 transition-transform duration-200">
              <ProductCard key={index} product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
