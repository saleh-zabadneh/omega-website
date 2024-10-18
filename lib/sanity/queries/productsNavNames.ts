import { ValidLocale } from "@/config/i18n-config";
import { fetchSanity } from "@/lib/sanity";

export interface ProductNavName {
  title: string;
  slug: string;
}

export async function getProductsNavNames(
  lang: ValidLocale
): Promise<ProductNavName[]> {
  const query = `*[_type == "setting"][0] {
    "productsNavNames": productsNavNames[]{
      "title": title.${lang},
      "slug": slug.current
    }
  }`;

  const result = await fetchSanity<{ productsNavNames: ProductNavName[] }>(
    query
  );
  return result?.productsNavNames || [];
}
