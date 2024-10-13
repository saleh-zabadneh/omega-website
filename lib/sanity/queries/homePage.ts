import { ValidLocale } from "@/config/i18n-config";
import { fetchSanity } from "@/lib/sanity";
import { HomePage } from "@/types/types";

export async function getHomePage(lang: ValidLocale): Promise<HomePage> {
  const query = `
    *[_type == "homePage"][0] {
      title,
      "sections": sections[]-> {
        _type,
        _id,
        _type == "heroSection" => {
          heading,
          specialWord,
          "slides": slides[] {
            heading,
            subheading,
            specialWord,
            "backgroundImage": backgroundImage {
              "url": asset->url,
              "alt": alt
            },
            link
          }
        },
        _type == "aboutSectionv2" =>{
          heading,
          specialWord,
          badge,
          content,
          "image": image {
            "url": asset->url,
            "alt": asset->alt
          },
          stats[] {
            label,
            value
          }
        },
        _type == "productsSection" => {
          heading,
          specialWord,
          "featuredProducts": featuredProducts[]-> {
            _id,
            title,
            description,
            "slug": slug.current,
            "image": {
              "url": image.asset->url,
              "alt": image.alt
            }
          }
        },
        _type == "partnersSection" => {
          heading,
          specialWord,
          partners[] {
            _key,
            name,
            "logo": {
              "url": logo.asset->url,
              "alt": name
            }
          }
        },
        _type == "testimonialsAndCompaniesSection" => {
          heading,
          specialWord,
          "testimonials": testimonials[]-> {
            _id,
            quote,
            name,
            title
          },
          "companies": companies[]-> {
            _id,
            name,
            "logo": logo.asset->url,
            "nameImg": nameImg.asset->url
          }
        },
       _type == "referenceProjectSection" => {
          id,
          heading,
          specialWord,
          "referenceProjects": ReferenceProject[]-> {
            _id,
            title,
            description,
            "urlPath": slug.current,
            "image": image.asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            }
          }
        },
      _type == "referenceProjectSection2" => {
          id,
          heading,
          specialWord,
          "referenceProjects": referenceProjects[]-> {
            _id,
            text1,
            text2,
            "urlPath": slug.current,
            "image1": image1.asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            "image2": image2.asset->{
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            "category": category->name
          }
        }
      }
    }
  `;

  return fetchSanity<HomePage>(query, { lang });
}
