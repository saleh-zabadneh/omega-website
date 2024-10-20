import { ReferenceProject2 } from "@/components/reference-projects/reference-projects-card-2";
import { ReferenceProjectList2 } from "@/components/sections/reference-projects-section-2";
import { fetchSanity } from "@/lib/sanity";

export async function getReferenceProjects2(
  limit?: number
): Promise<ReferenceProjectList2> {
  const query = `
    *[_type == "referenceProject2"] | order(_createdAt desc) ${
      limit ? `[0...${limit}]` : ""
    } {
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
      "category": category->title,
      content[] {
        _type,
        _type == 'localeText' => {
          ...
        },
        _type == 'imageGrid' => {
          images[] {
            "asset": asset->{
              "url": url,
              "metadata": metadata
            },
            alt
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
        }
      }
    }
  `;

  return fetchSanity<ReferenceProjectList2>(query);
}

export async function getReferenceProjectDetails2(
  urlPath: string
): Promise<ReferenceProject2> {
  const query = `
    *[_type == "referenceProject2" && slug.current == $urlPath][0] {
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
      "category": category->title,
      content[] {
        _type,
        _type == 'localeText' => {
          ...
        },
        _type == 'imageGrid' => {
          images[] {
            "asset": asset->{
              "url": url,
              "metadata": metadata
            },
            alt
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
        }
      }
    }
  `;

  return fetchSanity<ReferenceProject2>(query, { urlPath });
}
