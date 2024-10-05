import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";
import { PrivacyPolicyPropsPage } from "@/types/types";

export async function getPrivacyPolicyPage(
  lang: ValidLocale
): Promise<PrivacyPolicyPropsPage> {
  const query = `
    *[_type == "privacyPolicy"][0] {
      title,
      sections[] {
        sectionTitle,
        content[] {
          _type,
          _type == 'localeText' => {
            ...
          },
          _type == 'list' => {
            items
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
  return fetchSanity<PrivacyPolicyPropsPage>(query);
}
