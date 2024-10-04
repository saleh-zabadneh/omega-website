"use client";

import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { Steps } from "../about/steps";
import { WhatWeOffer } from "../about/what-we-0ffer";
import { ValidLocale } from "@/config/i18n-config";
import { AboutSectionType } from "@/types/types";
interface AboutSectionProps extends AboutSectionType {
  lang: ValidLocale;
}
export function AboutSection({
  heading,
  specialWord,
  lang,
  steps,
  whatWeOfferItems,
}: AboutSectionProps) {
  return (
    <SectionContainer>
      <Heading specialWord={specialWord?.[lang]}>{heading[lang]}</Heading>
      <div className="container">
        <div className="relative flex md:flex-wrap flex-nowrap border-2 border-s3 rounded-7xl md:overflow-hidden max-md:flex-col feature-after md:g7 max-md:border-none max-md:rounded-none max-md:gap-3">
          <WhatWeOffer items={whatWeOfferItems} lang={lang} />
          <ul className="relative flex justify-around flex-grow px-[5%] border-2 border-s3 rounded-7xl max-md:hidden">
            <div className="absolute bg-s3/20 top-[38%] left-0 right-0 w-full h-[1px] z-10" />
            <Steps steps={steps} />
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
