import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export interface GalleryPageTypes {
  title: {
    [key in ValidLocale]: string;
  };
  sections: {
    sectionTitle: {
      [key in ValidLocale]: string;
    };
    content: Array<{
      _type: string;
      [key: string]: any;
    }>;
  }[];
  seo: {
    title: string;
    description: string;
    image: string;
  };
}
export async function getGalleryPage(
  lang: ValidLocale
): Promise<GalleryPageTypes> {
  const query = `
    *[_type == "gallery"][0] {
      title,
      sections[] {
        sectionTitle,
        content[] {
          _type,
          _type == 'localeString' => {
            ...
          },
          _type == 'imageGrid' => {
            images[] {
              "url": asset->url,
              "metadata": asset->metadata
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
          },
          _type == 'hero' => {
            slides[] {
              heading,
              subheading,
              specialWord,
              backgroundImage {
                "url": asset->url,
                alt
              },
              link {
                text,
                url
              }
            }
          }
        }
      },
      "seo": seo {
        title,
        description,
        "image": image.asset->url
      }
    }
  `;
  return fetchSanity<GalleryPageTypes>(query);
}
