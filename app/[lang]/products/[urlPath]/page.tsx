import { ValidLocale } from "@/config/i18n-config";
import { getProductDetails } from "@/lib/sanity/queries/products";
import { Metadata } from "next";
import Image from "next/image";
import { Heading } from "@/components/common/heading";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { urlPath: string; lang: ValidLocale };
}): Promise<Metadata> {
  const product = await getProductDetails(params.urlPath);

  return {
    title: product.title[params.lang],
    description: product.description[params.lang],
    openGraph: {
      title: product.title[params.lang],
      description: product.description[params.lang],
      images: [
        {
          url: product.image.url,
          width: 800,
          height: 600,
          alt: product.title[params.lang],
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { urlPath: string; lang: ValidLocale };
}) {
  const product = await getProductDetails(params.urlPath);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen">
        <Image
          src={product.image.url}
          alt={product.title[params.lang]}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center text-white">
            <Heading className="text-white">
              {product.title[params.lang]}
            </Heading>
            <p className="mt-4 text-xl">{product.description[params.lang]}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {product.content && (
          <ContentSection
            sectionTitle="Product Details"
            content={product.content}
            lang={params.lang}
          />
        )}
      </div>
    </div>
  );
}
