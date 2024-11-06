import { ValidLocale } from "@/config/i18n-config";
import { fetchSanity } from "@/lib/sanity";

export interface ProductNavName {
  title: string;
  slug: string;
}

export interface SettingsData {
  productsNavNames: ProductNavName[];
  showLanguageSwitcher: boolean;
}

export async function getSettingsData(
  lang: ValidLocale
): Promise<SettingsData> {
  const query = `*[_type == "setting"][0] {
    "productsNavNames": productsNavNames[]{
      "title": title.${lang},
      "slug": slug.current
    },
    showLanguageSwitcher
  }`;

  const result = await fetchSanity<SettingsData>(query);
  return {
    productsNavNames: result?.productsNavNames || [],
    showLanguageSwitcher: result?.showLanguageSwitcher || false,
  };
}
