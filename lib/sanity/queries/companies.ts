import { ValidLocale } from "@/config/i18n-config";
import { Company } from "@/interfaces";
import { fetchSanity } from "@/lib/sanity";

export async function getCompanies(lang: ValidLocale): Promise<Company[]> {
  const query = `
      *[_type == "company"] {
        _id,
       
        "nameImg": nameImg.asset->url
      }
    `;

  return fetchSanity<Company[]>(query, { lang });
}
