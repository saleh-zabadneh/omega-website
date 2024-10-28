import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export type TeamMember = {
  _id: string;
  name: string;
  image: string;
  position: string;
  description: string;
};

export type TeamSection = {
  title: Record<ValidLocale, string>;
  showTeam: boolean;
  teamMembers: TeamMember[];
};

export async function getTeamSection(
  lang: ValidLocale
): Promise<TeamSection | null> {
  const query = `
    *[_type == "teamSection"][0] {
      title,
      showTeam,
      "teamMembers": teamMembers[]-> {
        _id,
        name,
        "image": image.asset->url,
        position,
        description
      }
    }
  `;
  return fetchSanity<TeamSection | null>(query, { lang });
}
