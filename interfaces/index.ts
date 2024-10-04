import { ValidLocale } from "@/config/i18n-config";
import { Product, ProductList, ProductsSectionType } from "@/types/types";

export type ProductCardProps = {
  product: Product;
  lang: ValidLocale;
};
export type ProductListProps = {
  products: ProductList;
  lang: ValidLocale;
};
export type HomeProductSectionProps = {
  section: ProductsSectionType;
  lang: ValidLocale;
};
export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  title: string;
}

export interface Company {
  _id: string;

  nameImg: string;
}
