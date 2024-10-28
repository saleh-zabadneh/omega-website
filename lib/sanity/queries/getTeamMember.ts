import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export type TeamMember = {
  _id: string;
  name: string;
  image: string;
  position: string;
  description: string;
};

export async function getTeamMembers(lang: ValidLocale): Promise<TeamMember[]> {
  const query = `
    *[_type == "teamMember"] {
      _id,
      name,
      "image": image.asset->url,
      position,
      description
    }
  `;
  return fetchSanity<TeamMember[]>(query, { lang });
}
