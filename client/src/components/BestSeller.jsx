import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  const bestSellers = products
    .filter((product) => product?.inStock)
    .slice(0, 6);

  return (
    <section className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>

      <div className="my-6 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
        {bestSellers.map((product) => (
          <ProductCard key={product._id} product={product} fluid />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
