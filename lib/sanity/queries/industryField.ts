import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

interface IndustryField {
  _id: string;
  title: Record<ValidLocale, string>;
  content: any[];
  subFields: IndustryField[];
  seo: {
    title: string;
    description: string;
    image: string;
  };
}

export async function getIndustryFields(
  lang: ValidLocale
): Promise<IndustryField[]> {
  const query = `
    *[_type == "industryField" && !defined(parent)] | order(order asc) {
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
      "subFields": *[_type == "industryField" && references(^._id)] | order(order asc) {
        _id,
        title,
        "subFields": *[_type == "industryField" && references(^._id)] | order(order asc) {
          _id,
          title
        }
      },
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<IndustryField[]>(query, { lang });
}

export async function getIndustryField(
  lang: ValidLocale,
  id: string
): Promise<IndustryField | null> {
  const query = `
    *[_type == "industryField" && _id == $id][0] {
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
      "subFields": *[_type == "industryField" && references(^._id)] | order(order asc) {
        _id,
        title,
        "subFields": *[_type == "industryField" && references(^._id)] | order(order asc) {
          _id,
          title
        }
      },
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<IndustryField | null>(query, { id, lang });
}
