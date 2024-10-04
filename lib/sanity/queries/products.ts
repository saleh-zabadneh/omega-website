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

export async function getProductDetails(id: string): Promise<Product> {
  const query = `
    *[_type == "product" && _id == $id][0] {
      _id,
      title,
      description,
      "image": image.asset->{
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      links,
      content
    }
  `;

  return fetchSanity<Product>(query, { id });
}
