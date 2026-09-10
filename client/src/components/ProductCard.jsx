import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product, fluid = false }) => {
  const { addToCart, removeFromCart, navigate, cartItems } = useAppContext();

  if (!product) return null;

  return (
    <div
      onClick={() =>
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
      }
      className={`w-full rounded-md border border-gray-500/20 bg-white px-3 py-2 md:px-4 ${
        fluid ? "min-w-0 max-w-none" : "min-w-56 max-w-56"
      }`}
    >
      <div className="group flex cursor-pointer items-center justify-center px-2">
        <img
          className="max-w-26 transition group-hover:scale-105 md:max-w-36"
          src={product.image?.[0]}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="text-sm text-gray-500/60">
        <p>{product.category}</p>
        <p className="w-full truncate text-lg font-medium text-gray-700">
          {product.name}
        </p>

        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
              />
            ))}
          <p>(5)</p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-base font-medium text-indigo-500 md:text-xl">
            ${product.offerPrice}{" "}
            <span className="text-xs text-gray-500/60 line-through md:text-sm">
              ${product.price}
            </span>
          </p>

          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 text-indigo-500"
          >
            {!cartItems[product._id] ? (
              <button
                className="flex h-[34px] w-[64px] cursor-pointer items-center justify-center gap-1 rounded border border-indigo-300 bg-indigo-100 font-medium text-indigo-600 md:w-[80px]"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} className="w-5" alt="" />
                Add
              </button>
            ) : (
              <div className="flex h-[34px] w-16 select-none items-center justify-center gap-2 rounded bg-indigo-500/25 md:w-20">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="h-full cursor-pointer px-2 text-md"
                  aria-label={`Decrease ${product.name} quantity`}
                >
                  -
                </button>
                <span className="w-5 text-center">{cartItems[product._id]}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="h-full cursor-pointer px-2 text-md"
                  aria-label={`Increase ${product.name} quantity`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
