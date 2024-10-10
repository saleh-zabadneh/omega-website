import { ValidLocale } from "@/config/i18n-config";
import { fetchSanity } from "@/lib/sanity";

export interface WorkExperience {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    asset: {
      url: string;
    };
  };
}

export async function getWorkExperience(
  lang: ValidLocale
): Promise<WorkExperience[]> {
  const query = `
    *[_type == "workExperience"] {
      _id,
      title,
      description,
      thumbnail {
        asset-> {
          url
        }
      }
    }
  `;

  return fetchSanity<WorkExperience[]>(query, { lang });
}
