import { ProductCardProps } from "@/interfaces";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, lang }: ProductCardProps) {
  return (
    <div
      key={product._id}
      className="2xl:min-h-[35.5rem] rounded-lg lg:min-h-[32.5rem]  h-[25rem] flex items-center justify-center 2xl:w-[27rem] lg:w-96 2xl:mb-10 sm:w-72 md:w-[21rem] w-[80vw]"
    >
      <Link
        className="bg-background flex flex-col border-primary border-2 p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
        href={`/${lang}/products/${product.urlPath}`}
      >
        <div className="relative flex items-center justify-center sm:w-72 md:w-[21rem] lg:w-96 w-[80vw] overflow-hidden h-[10rem] lg:h-[12rem] mb-10">
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
            className="z-10 absolute bottom-0 w-full h-full object-fit   rounded-t-md "
          />
        </div>

        <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
          {product.title[lang]}
        </h1>

        <p
          className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
          style={{
            color: "#BEC1DD",
            margin: "1vh 0",
          }}
        >
          {product.description[lang]}
        </p>
        <div className="flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center">
            {/* {item.iconLists.map((icon, index) => (
              <div
                key={index}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                style={{
                  transform: `translateX(-${5 * index + 2}px)`,
                }}
              >
                <img src={icon} alt="icon5" className="p-2" />
              </div>
            ))} */}
          </div>

          <div className="flex justify-center items-center">
            <p className="flex lg:text-xl md:text-xs text-sm text-purple">
              {lang === "ar" ? "شاهد التفاصيل" : "Check Details"}
            </p>
            {lang === "ar" ? (
              <ArrowLeft className="h-4 w-4 mr-2" />
            ) : (
              <ArrowRight className="h-4 w-4 ml-2" />
            )}{" "}
          </div>
        </div>
      </Link>
    </div>
  );
}
