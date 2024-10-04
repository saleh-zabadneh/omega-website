import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import { TranslationKey, ValidLocale } from "@/config/i18n-config";

const translations: Record<
  ValidLocale,
  Record<TranslationKey, Record<string, string | object>>
> = { en, ar };

export function getTranslation(
  locale: ValidLocale,
  section: TranslationKey,
  key: string
): string {
  if (!translations[locale]) {
    console.error(`Locale '${locale}' not found`);
    return key;
  }
  if (!translations[locale][section]) {
    console.error(`Section '${section}' not found in locale '${locale}'`);
    return key;
  }
  const value = translations[locale][section][key];
  if (typeof value === "object" && value !== null) {
    console.error(`Translation for '${key}' is an object, not a string`);
    return JSON.stringify(value);
  }
  return value || key;
}
