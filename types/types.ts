import { ReferenceProject2 } from "@/components/reference-projects/reference-projects-card-2";
import { Translations, ValidLocale } from "@/config/i18n-config";
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
  urlPath: string;
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
  content?: any[];
}
export type ProductList = Product[];
export interface ProductListProps {
  products: Product[];
  lang: ValidLocale;
  translations: Translations;
}
export interface ReferenceProject {
  _id: string;
  title: LocaleString;
  description: LocaleString;
  urlPath: string;
  image: {
    url: string;
    metadata: { dimensions: { width: number; height: number }; lqip: string };
  };
  content?: any[];
}

export type ReferenceProjectList = ReferenceProject[];
export interface ProductCardProps {
  product: Product;
  lang: ValidLocale;
  translations: Translations;
}
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
  // steps: Step[];
  // whatWeOfferItems: WhatWeOfferItem[];
}

export interface ProductsSectionType extends BaseSection {
  _type: "productsSection";
  featuredProducts: Product[];
}
export interface ReferenceProjectSectionType extends BaseSection {
  _type: "referenceProjectSection";
  referenceProjects: ReferenceProject[];
}

export interface PartnersSectionType extends BaseSection {
  _type: "partnersSection";
  partners: Partner[];
}
export interface TestimonialsAndCompaniesSectionType {
  _type: "testimonialsAndCompaniesSection";
  id: string;
  heading: LocaleString | string;
  specialWord?: LocaleString | string;
  testimonials: Testimonial[];
  companies: Company[];
}
export interface ReferenceProjectSection2Type extends BaseSection {
  _type: "referenceProjectSection2";
  referenceProjects: ReferenceProject2[];
}
export type Section =
  | HeroSectionType
  | AboutSectionType
  | AboutSectionTypeV2
  | ProductsSectionType
  | TestimonialsAndCompaniesSectionType
  | ReferenceProjectSectionType
  | ReferenceProjectSection2Type
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
export interface ImageAsset {
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface ImageGridItem {
  _type: "imageGrid";
  images: ImageAsset[];
  columns: number;
}

export interface ListItem {
  _type: "list";
  items: LocaleString[];
}

export interface QuoteItem {
  _type: "quote";
  text: LocaleString;
  author: LocaleString;
}

export interface CallToActionItem {
  _type: "callToAction";
  text: LocaleString;
  url: string;
}

export type ContentItemType =
  | LocaleString
  | ImageGridItem
  | ListItem
  | QuoteItem
  | CallToActionItem;

export interface AboutSection {
  sectionTitle: LocaleString;
  content: ContentItemType[];
}

export interface AboutPageTypes {
  title: LocaleString;
  sections: AboutSection[];
  seo: {
    title: string;
    description: string;
    image: string;
  };
}
export type ContentItems = LocaleString | ListItem | CallToActionItem;

export interface PrivacyPolicySection {
  sectionTitle: LocaleString;
  content: ContentItems[];
}

export interface PrivacyPolicyPropsPage {
  title: LocaleString;
  sections: PrivacyPolicySection[];
  seo: {
    title: string;
    description: string;
    image: string;
  };
}
export interface AboutSectionTypeV2 extends BaseSection {
  _type: "aboutSectionv2";
  heading: Record<ValidLocale, string>;
  specialWord?: Record<ValidLocale, string>;
  badge: Record<ValidLocale, string>;
  content: Record<ValidLocale, string>;
  image: {
    url: string;
    alt: string;
  };
  stats: Array<{
    label: Record<ValidLocale, string>;
    value: number;
  }>;
}
