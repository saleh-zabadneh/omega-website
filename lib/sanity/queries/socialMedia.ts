import { ValidLocale } from "@/config/i18n-config";
import { SocialMediaLink } from "@/interfaces";
import { fetchSanity } from "@/lib/sanity";

export async function getSocialMedia(
  lang: ValidLocale
): Promise<SocialMediaLink[]> {
  const query = `
    *[_type == "socialMedia"] {
      _id,
      platform,
      url
    }
  `;

  return fetchSanity<SocialMediaLink[]>(query, { lang });
}
