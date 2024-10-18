import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import { TranslationKey, ValidLocale } from "@/config/i18n-config";

const translations: Record<
  ValidLocale,
  Record<TranslationKey, Record<string, string>>
> = { en, ar };

export function getTranslation(
  lang: ValidLocale,
  section: TranslationKey,
  key: string
) {
  if (!translations[lang]) {
    console.error(`Language '${lang}' not found`);
    return key;
  }
  if (!translations[lang][section]) {
    console.error(`Section '${section}' not found in language '${lang}'`);
    return key;
  }
  return translations[lang][section][key] || key;
}
