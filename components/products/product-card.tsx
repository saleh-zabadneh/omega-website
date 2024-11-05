import { ProductCardProps } from "@/interfaces";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, lang }: ProductCardProps) {
  return (
    <div className="2xl:min-h-[35.5rem] rounded-lg lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center 2xl:w-[27rem] lg:w-96 2xl:mb-10 sm:w-72 md:w-[21rem] w-[80vw]">
      <Link
        className="bg-background w-full flex flex-col border-primary border-2 p-4 rounded-lg transition-transform items-center transform hover:scale-105 hover:shadow-lg"
        href={`/${lang}/products/${product.urlPath}`}
      >
        <div className="relative flex items-center justify-center sm:w-72 md:w-[21rem] lg:w-96 w-[80vw] overflow-hidden h-[10rem] lg:h-[12rem] mb-10 max-w-[99%]">
          <div className="relative w-full h-full overflow-hidden lg:rounded-3xl">
            <Image src="/bg.png" alt="bgimg" fill className="w-full h-full" />
          </div>
          <Image
            src={product.image.url}
            alt={product.title[lang]}
            fill
            objectFit="cover"
            placeholder={product.image.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={product.image.metadata?.lqip}
            className="z-10 absolute bottom-0 w-full h-full object-fit rounded-t-md"
          />
        </div>

        <div className="flex flex-col px-1 flex-1 justify-between">
          <div className="space-y-2">
            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
              {product.title[lang]}
            </h1>

            <p
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
              }}
            >
              {product.description[lang]}
            </p>
          </div>

          <div className="flex items-center justify-between mt-7 mb-3">
            <div className="flex items-center">
              {/* Icon list would go here */}
            </div>

            <div className="flex justify-center items-center">
              <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                {lang === "ar" ? "شاهد التفاصيل" : "Check Details"}
              </p>
              {lang === "ar" ? (
                <ArrowLeft className="h-4 w-4 mr-2" />
              ) : (
                <ArrowRight className="h-4 w-4 ml-2" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
