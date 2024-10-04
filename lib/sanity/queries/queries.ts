import { HomePage } from "@/types/types";
import { ValidLocale } from "@/config/i18n-config";
import { fetchSanity } from "@/lib/sanity";

export async function getHomePage(lang: ValidLocale): Promise<HomePage> {
  const query = `
    *[_type == "homePage"][0] {
      hero[] {
        image {
          asset-> {
            _ref
          }
        },
        heading,
        subheading,
        link
      },
      whoWeAre {
        heading,
        paragraph,
        link,
        image {
          asset-> {
            _ref
          }
        }
      }
    }
  `;

  return fetchSanity<HomePage>(query, { lang });
}
