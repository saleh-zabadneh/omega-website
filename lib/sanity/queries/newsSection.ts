import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";
import { NewsItem } from "./getNews";

export type NewsSectionP = {
  _id: string;
  _type: "newsSection";
  id: string;
  heading: Record<ValidLocale, string>;
  subheading: Record<ValidLocale, string>;
  featuredNews: NewsItem[];
};

export async function getNewsSection(
  lang: ValidLocale
): Promise<NewsSectionP | null> {
  const query = `
    *[_type == "newsSection"][0] {
      _id,
      _type,
      id,
      heading,
      subheading,
      "featuredNews": featuredNews[]-> {
        _id,
        title,
        "slug": slug.current,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<NewsSectionP | null>(query, { lang });
}
