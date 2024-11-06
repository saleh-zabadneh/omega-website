import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export interface ProductsSection {
  id: string;
  heading: Record<ValidLocale, string>;
  specialWord: Record<ValidLocale, string>;
  featuredProducts: Array<{
    _id: string;
    title: Record<ValidLocale, string>;
    description: Record<ValidLocale, string>;
    urlPath: string;
    image: {
      url: string;
      metadata: {
        dimensions: { width: number; height: number };
        lqip: string;
      };
    };
  }>;
  productHeading: Record<ValidLocale, string>;
  productDescription: Record<ValidLocale, string>;
  productPageImage: {
    url: string;
    metadata: {
      dimensions: { width: number; height: number };
      lqip: string;
    };
  };
}

export async function getProductsSection(
  lang: ValidLocale
): Promise<ProductsSection> {
  const query = `
    *[_type == "productsSection"][0] {
      id,
      heading,
      specialWord,
      "featuredProducts": featuredProducts[]-> {
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
      },
      "productHeading": productHeading,
      "productDescription": productDescription,
      "productPageImage": productPageImage.asset->{
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  `;

  return fetchSanity<ProductsSection>(query);
}
