import { ProductListProps } from "@/interfaces";
import ProductCard from "./product-card";

export default function ProductList({
  products,
  lang,
  translations,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 justify-content-center p-4 md:gap-x-10 ">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          lang={lang}
          translations={translations}
        />
      ))}
    </div>
  );
}
