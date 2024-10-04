// import Image from "next/image";
import Button from "@/components/MarkerButton";
import { ValidLocale } from "@/config/i18n-config";
import Image from "next/image";

export interface WhatWeOfferItem {
  _id: string;
  icon: { url: string };
  caption: string;
  title: string;
  text: string;
  button: {
    icon: { url: string };
    title: string;
  };
}

interface WhatWeOfferProps {
  items: WhatWeOfferItem[];
  lang: ValidLocale;
}
export function WhatWeOffer({ items, lang }: WhatWeOfferProps) {
  return (
    <>
      {items.map(({ _id, icon, caption, title, text, button }) => (
        <div
          key={_id}
          className="relative text-white z-2 md:px-10 px-5 md:pb-10 pb-5 flex-50 max-md:g7 max-md:border-2 max-md:border-s3 max-md:rounded-3xl max-md:flex-320"
        >
          <div className="w-full flex justify-start items-start">
            <div className="-ml-3 mb-12 flex items-center justify-center flex-col">
              <div className="w-0.5 h-16 bg-s3" />
              <Image
                src={"/feature-1.png"}
                width={112}
                height={112}
                className="size-28 object-contain"
                alt={typeof title === "object" ? title[lang] || "" : title}
              />
            </div>
          </div>
          <p className="caption mb-5 max-md:mb-6">
            {typeof caption === "object" ? caption[lang] : caption}
          </p>
          <h2 className="max-w-400 mb-7 h3 text-p4 max-md:mb-6 max-md:h5">
            {typeof title === "object" ? title[lang] : title}
          </h2>
          <p className="mb-11 body-1 max-md:mb-8 max-md:body-3">
            {typeof text === "object" ? text[lang] : text}
          </p>
          <Button icon={button?.icon?.url || ""}>
            {typeof button?.title === "object"
              ? button.title[lang]
              : button?.title}
          </Button>
        </div>
      ))}
    </>
  );
}
