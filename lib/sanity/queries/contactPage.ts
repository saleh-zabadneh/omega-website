import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export interface ContactPageData {
  title: Record<ValidLocale, string>;
  mapDetails: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  contactInfo: {
    phones: string[];
    faxes: string[];
    mobiles: string[];
    addresses: Record<ValidLocale, string>[];
    emails: string[];
  };
  seo: {
    title: string;
    description: string;
    image: string;
  };
}

export async function getContactPage(
  lang: ValidLocale
): Promise<ContactPageData> {
  const query = `
    *[_type == "contactPage"][0] {
      title,
      mapDetails,
      contactInfo,
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<ContactPageData>(query, { lang });
}
