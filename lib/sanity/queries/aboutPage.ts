import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";
import { AboutPageTypes } from "@/types/types";

export async function getAboutPage(lang: ValidLocale): Promise<AboutPageTypes> {
  const query = `
    *[_type == "about"][0] {
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
  return fetchSanity<AboutPageTypes>(query);
}
