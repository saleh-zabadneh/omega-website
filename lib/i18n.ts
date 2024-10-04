import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import { TranslationKey, ValidLocale } from "@/config/i18n-config";

const translations: Record<
  ValidLocale,
  Record<TranslationKey, Record<string, string>>
> = { en, ar };

export function getTranslation(
  locale: ValidLocale,
  section: TranslationKey,
  key: string
) {
  if (!translations[locale]) {
    console.error(`Locale '${locale}' not found`);
    return key;
  }
  if (!translations[locale][section]) {
    console.error(`Section '${section}' not found in locale '${locale}'`);
    return key;
  }
  return translations[locale][section][key] || key;
}
