import { Translations, ValidLocale } from "@/config/i18n-config";
import {
  LocaleString,
  Product,
  ProductList,
  ProductsSectionType,
} from "@/types/types";
import { ReactNode } from "react";

export type ProductCardProps = {
  product: Product;
  lang: ValidLocale;
  translations: Translations;
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
  quote: string | LocaleString;
  name: string | LocaleString;
  title: string | LocaleString;
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
export interface TestimonialsAndCompaniesSectionType {
  _type: "testimonialsAndCompaniesSection";
  id: string;
  heading: LocaleString;
  specialWord?: LocaleString;
  testimonials: Testimonial[];
  companies: Company[];
}
