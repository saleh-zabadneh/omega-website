import React, { ReactNode } from "react";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ValidLocale } from "@/config/i18n-config";
import { TestimonialsAndCompaniesSectionType } from "@/types/types";
import { InfiniteMovingCards } from "../ui/infinity-cards";
import { Company, Testimonial } from "@/interfaces";

interface TestimonialsAndCompaniesSectionProps
  extends TestimonialsAndCompaniesSectionType {
  lang: ValidLocale;
}

interface LocaleString {
  [key: string]: string;
}

export function TestimonialsAndCompaniesSection({
  heading,
  specialWord,
  testimonials,
  companies,
  lang,
}: TestimonialsAndCompaniesSectionProps) {
  const testimonialItems: ReactNode[] = testimonials.map(
    (testimonial: Testimonial) => (
      <div
        key={testimonial._id}
        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-brand/10 px-8 py-6 md:w-[450px] bg-gradient-to-br from-brand/80 to-brand-sub/80 dark:from-brand/20 dark:to-brand-sub/20"
      >
        <blockquote
          className={`${lang === "ar" ? "text-right" : "text-left"}`} // Text alignment for blockquote
        >
          <span
            className={`relative z-20 text-sm leading-[1.6] text-primary-foreground font-normal ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {typeof testimonial.quote === "string"
              ? testimonial.quote
              : testimonial.quote[lang]}
          </span>
          <div
            className={`relative z-20 mt-6 flex items-center ${
              lang === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium leading-[1.6] text-primary-foreground">
                {typeof testimonial.name === "string"
                  ? testimonial.name
                  : testimonial.name[lang]}
              </span>
              <span className="text-sm leading-[1.6] text-primary-foreground/80 font-normal">
                {typeof testimonial.title === "string"
                  ? testimonial.title
                  : testimonial.title[lang]}
              </span>
            </div>
          </div>
        </blockquote>
      </div>
    )
  );

  const companyItems: ReactNode[] = companies.map((company: Company) => (
    <div
      key={company._id}
      className="flex md:max-w-60 max-w-32 items-center justify-center"
    >
      <img
        src={company.nameImg}
        alt="company"
        className="w-20 h-20 md:w-28 md:h-28 object-contain"
      />
    </div>
  ));

  return (
    <SectionContainer>
      <Heading
        highlightColor="bg-primary/40 "
        specialWordColor="text-primary"
        specialWord={
          specialWord
            ? typeof specialWord === "string"
              ? specialWord
              : specialWord[lang]
            : undefined
        }
      >
        {typeof heading === "string" ? heading : heading[lang]}
      </Heading>
      <div className="flex gap-16 flex-col items-center max-lg:mt-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfiniteMovingCards
            items={testimonialItems}
            direction={lang === "ar" ? "left" : "right"}
            speed="slow"
            className="py-4"
          />
        </div>
        {companyItems && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InfiniteMovingCards
              items={companyItems}
              direction="left"
              speed="normal"
              className="py-4"
            />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
