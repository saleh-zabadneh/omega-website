import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
};

export type NewsDetails = NewsItem & {
  content: any[];
};

export async function getNewsList(lang: ValidLocale): Promise<NewsItem[]> {
  const query = `
    *[_type == "news"] {
      _id,
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url
    }
  `;
  return fetchSanity<NewsItem[]>(query);
}

export async function getNewsDetails(
  slug: string,
  lang: ValidLocale
): Promise<NewsDetails> {
  const query = `
    *[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "image": image.asset->url,
      content
    }
  `;
  return fetchSanity<NewsDetails>(query, { slug });
}
