import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { navigate, products, addToCart } = useAppContext();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  // 🔄 Related products logic
  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(
        (item) =>
          item.category === product.category && item._id !== product._id, // exclude current product
      );

      setRelatedProducts(productsCopy.slice(0, 8));
    }
  }, [products, product]);

  // 🖼️ Thumbnail setup
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  return (
    product && (
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        {/* 🔗 Breadcrumb */}
        <p className="text-sm text-gray-500">
          <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-indigo-500 font-medium"> {product.name}</span>
        </p>

        {/* 🧱 Main Section */}
        <div className="flex flex-col md:flex-row gap-10 mt-6">
          {/* 🖼️ Images */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border w-20 h-20 border-gray-300 rounded cursor-pointer overflow-hidden"
                >
                  <img
                    src={image}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="border w-80 h-80 border-gray-300 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 📄 Product Info */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>

            {/* ⭐ Rating */}
            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < product.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="w-4"
                    alt="star"
                  />
                ))}
              <span className="text-sm text-gray-500 ml-2">(10)</span>
            </div>

            {/* 💰 Price */}
            <div className="mt-5">
              <p className="text-gray-400 line-through">₹{product.price}</p>
              <p className="text-2xl font-bold text-green-400">
                ₹{product.offerPrice}
              </p>
              <span className="text-xs text-gray-500">
                (inclusive of all taxes)
              </span>
            </div>

            {/* 📝 Description */}
            <p className="mt-6 font-medium">About Product</p>
            <p>{product.description}</p>

            {/* 🛒 Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => addToCart(product._id)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 transition rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="flex-1 py-3 bg-green-500 text-white hover:bg-green-600 transition rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 RELATED PRODUCTS */}
        <div className="mt-16">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold flex items-center justify-center">
              Related Products
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-9">
            {relatedProducts
              .filter((item) => item.inStock)
              .map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mx-auto flex items-center justify-center cursor-pointer px-12 my-16 py-3 border rounded text-xl  bg-green-500 hover:bg-green-600"
          >
            See More
          </button>
          {/* Empty state */}
          {relatedProducts.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">
              No related products found.
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default ProductDetails;
