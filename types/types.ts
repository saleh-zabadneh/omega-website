import { Step } from "@/components/about/steps";
import { WhatWeOfferItem } from "@/components/about/what-we-0ffer";
import { ValidLocale } from "@/config/i18n-config";
import { Company, Testimonial } from "@/interfaces";

// Basic types
export type LocaleString = {
  [key in ValidLocale]: string;
} & {
  [key: string]: string;
};

export type LocaleText = {
  [key in ValidLocale]: string;
} & {
  [key: string]: string;
};

export interface Image {
  url: string;
  alt: string;
}

// Language context
export type LanguageContextType = {
  locale: ValidLocale;
  setLocale: (locale: ValidLocale) => void;
};

// Base section type
export interface BaseSection {
  id: string;
  _type: string;
  heading: LocaleString;
  specialWord?: LocaleString;
}

// Product types
export interface Product {
  _id: string;
  title: LocaleString;
  description: LocaleString;
  image: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip: string;
    };
  };
  links?: Array<{
    title: string;
    url: string;
  }>;
  content?: any; // You might want to define a more specific type for your content blocks
}

export type ProductList = Product[];

// Partner type
export interface Partner {
  _key: string;
  name: string;
  logo?: Image;
}

// Section types
export interface HeroSlide {
  heading: Record<ValidLocale, string>;
  subheading: Record<ValidLocale, string>;
  specialWord?: Record<ValidLocale, string>;
  backgroundImage: Image;
  link: {
    text: Record<ValidLocale, string>;
    url: string;
  };
}

export interface HeroSectionType extends BaseSection {
  _type: "heroSection";
  slides: HeroSlide[];
}

export interface AboutSectionType extends BaseSection {
  _type: "aboutSection";
  lang: ValidLocale;
  steps: Step[];
  whatWeOfferItems: WhatWeOfferItem[];
}

export interface ProductsSectionType extends BaseSection {
  _type: "productsSection";
  featuredProducts: Product[];
}

export interface PartnersSectionType extends BaseSection {
  _type: "partnersSection";
  partners: Partner[];
}
export interface TestimonialsAndCompaniesSectionType {
  _type: "testimonialsAndCompaniesSection";
  id: string;
  heading: LocaleString;
  specialWord?: LocaleString;
  testimonials: Testimonial[];
  companies: Company[];
}
export type Section =
  | HeroSectionType
  | AboutSectionType
  | ProductsSectionType
  | TestimonialsAndCompaniesSectionType
  | PartnersSectionType;

// Home page type
export interface HomePage {
  title: string;
  sections: Section[];
}
export interface AboutSectionType {
  heading: Record<ValidLocale, string>;
  content: Record<ValidLocale, string>;
  specialWord?: Record<ValidLocale, string>;
}
