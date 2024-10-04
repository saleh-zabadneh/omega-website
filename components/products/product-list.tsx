import { ProductListProps } from "@/interfaces";
import ProductCard from "./product-card";

export default function ProductList({ products, lang }: ProductListProps) {
  return (
    <div className="flex flex-wrap items-center justify-center p-4 md:gap-x-16 ">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} lang={lang} />
      ))}
    </div>
  );
}
