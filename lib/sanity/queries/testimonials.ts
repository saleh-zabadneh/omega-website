import { ValidLocale } from "@/config/i18n-config";
import { Testimonial } from "@/interfaces";
import { fetchSanity } from "@/lib/sanity";

export async function getTestimonials(
  lang: ValidLocale
): Promise<Testimonial[]> {
  const query = `
    *[_type == "testimonial"] {
      _id,
      
      "quote": quote.${lang},
      "name": name.${lang},
      "title": title.${lang}
    }
  `;

  return fetchSanity<Testimonial[]>(query, { lang });
}
