import { ReferenceProject, ReferenceProjectList } from "@/components/common/x";
import { fetchSanity } from "@/lib/sanity";

export async function getReferenceProjects(
  limit?: number
): Promise<ReferenceProjectList> {
  const query = `
    *[_type == "referenceProject"] | order(_createdAt desc) ${
      limit ? `[0...${limit}]` : ""
    } {
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
  `;

  return fetchSanity<ReferenceProjectList>(query);
}
export async function getReferenceProjectDetails(
  urlPath: string
): Promise<ReferenceProject> {
  const query = `
    *[_type == "referenceProject" && slug.current == $urlPath][0] {
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
      },
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

  return fetchSanity<ReferenceProject>(query, { urlPath });
}
