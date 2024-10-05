import { fetchSanity } from "@/lib/sanity";
import { Product, ProductList } from "@/types/types";

export async function getProducts(limit?: number): Promise<ProductList> {
  const query = `
    *[_type == "product"] | order(_createdAt desc) ${
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

  return fetchSanity<ProductList>(query);
}

export async function getProductDetails(urlPath: string): Promise<Product> {
  const query = `
    *[_type == "product" && slug.current == $urlPath][0] {
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

  return fetchSanity<Product>(query, { urlPath });
}
