import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

interface IndustryField {
  _id: string;
  title: Record<ValidLocale, string>;
  content: any[];
  subCategories: Array<{
    _id: string;
    title: Record<ValidLocale, string>;
    slug: { current: string };
  }>;
  seo: {
    title: string;
    description: string;
    image: string;
  };
}

export async function getIndustryField(
  lang: ValidLocale,
  slug: string
): Promise<IndustryField | null> {
  const query = `
    *[_type == "industryField" && slug.current == $slug][0] {
      _id,
      title,
      content[] {
        _type,
        _type == 'localeText' => {
          ...
        },
        _type == 'imageGrid' => {
          images[] {
            "asset": asset->{
              "url": url,
              "metadata": metadata
            },
            alt
          },
          columns
        },
        _type == 'list' => {
          items
        },
        _type == 'quote' => {
          text,
          author
        },
        _type == 'callToAction' => {
          text,
          url
        },
        _type == 'video' => {
          url,
          caption
        }
      },
      "subCategories": *[_type == "industryField" && references(^._id)] {
        _id,
        title,
        "slug": slug.current
      },
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<IndustryField | null>(query, { slug, lang });
}

export async function getMainIndustryField(
  lang: ValidLocale
): Promise<IndustryField | null> {
  const query = `
    *[_type == "industryField" && isMainPage == true][0] {
      _id,
      title,
      content[] {
        _type,
        _type == 'localeText' => {
          ...
        },
        _type == 'imageGrid' => {
          images[] {
            "asset": asset->{
              "url": url,
              "metadata": metadata
            },
            alt
          },
          columns
        },
        _type == 'list' => {
          items
        },
        _type == 'quote' => {
          text,
          author
        },
        _type == 'callToAction' => {
          text,
          url
        },
        _type == 'video' => {
          url,
          caption
        }
      },
      "subCategories": *[_type == "industryField" && !isMainPage] {
        _id,
        title,
        "slug": slug
      },
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<IndustryField | null>(query, { lang });
}

interface IndustryFieldPath {
  lang: ValidLocale;
  slug: string;
}

export async function getIndustryFieldPaths(): Promise<IndustryFieldPath[]> {
  const query = `
    *[_type == "industryField" && !isMainPage] {
      "slug": slug.current,
      "locales": [_type == "localeString" && defined(en) && defined(ar) => ["en", "ar"]][0]
    }
  `;
  const industryFields = await fetchSanity<
    Array<{ slug: string; locales: ValidLocale[] }>
  >(query);
  return industryFields.flatMap((field) =>
    field.locales.map((locale) => ({
      lang: locale,
      slug: field.slug,
    }))
  );
}
