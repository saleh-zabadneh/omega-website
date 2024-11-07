import { ValidLocale } from "@/config/i18n-config";
import Image from "next/image";

interface ProductLayoutPageProps {
  lang: ValidLocale;
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

export function ProductPageLayout({
  lang,
  productHeading,
  productDescription,
  productPageImage,
}: ProductLayoutPageProps) {
  return (
    <div className="relative w-full aspect-[2/1] md:max-h-[500px] max-h-[650px]">
      <Image
        src={productPageImage.url}
        alt="Products"
        layout="fill"
        objectFit="cover"
        className="mb-4"
        placeholder="blur"
        blurDataURL={productPageImage.metadata.lqip}
      />
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center max-w-3xl ">
          {productHeading[lang] || productHeading.en}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-center">
          {productDescription[lang] || productDescription.en}
        </p>
      </div>
    </div>
  );
}
