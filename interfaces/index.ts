import { ValidLocale } from "@/config/i18n-config";
import { Product, ProductList, ProductsSectionType } from "@/types/types";
import { ReactNode } from "react";

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
  items: ReactNode[];
  quote: Record<ValidLocale, string>;
  name: Record<ValidLocale, string>;
  title: Record<ValidLocale, string>;
}
export interface SocialMediaLink {
  _id: string;
  platform: string;
  url: string;
}
export interface Company {
  _id: string;

  nameImg: string;
}
