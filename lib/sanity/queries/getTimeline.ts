import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export interface TimelineItem {
  _id: string;
  year: number;
  description: Record<ValidLocale, string>;
}

export async function getTimeline(lang: ValidLocale): Promise<TimelineItem[]> {
  const query = `
    *[_type == "timeline"] | order(year desc) {
      _id,
      year,
      description
    }
  `;
  return fetchSanity<TimelineItem[]>(query);
}
