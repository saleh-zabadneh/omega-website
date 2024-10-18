export const defaultLocale = "en";
export const locales = ["en", "ar"] as const;
export type ValidLocale = (typeof locales)[number];

export type TranslationKey =
  | "shared"
  | "home"
  | "about"
  | "contact"
  | "auth"
  | "dashboard"
  | "products"
  | "footer";

export type Translations = {
  [key in TranslationKey]: {
    [key: string]: string;
  };
};
