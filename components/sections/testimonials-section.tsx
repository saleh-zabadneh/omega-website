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
        <blockquote>
          <span className="relative z-20 text-sm leading-[1.6] text-primary-foreground font-normal">
            {testimonial.quote}
          </span>
          <div className="relative z-20 mt-6 flex flex-row items-center">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium leading-[1.6] text-primary-foreground">
                {testimonial.name}
              </span>
              <span className="text-sm leading-[1.6] text-primary-foreground/80 font-normal">
                {testimonial.title}
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
      <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
        {heading[lang]}
      </Heading>
      <div className="flex gap-16 flex-col items-center max-lg:mt-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfiniteMovingCards
            items={testimonialItems}
            direction="right"
            speed="slow"
            className="py-4"
          />
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfiniteMovingCards
            items={companyItems}
            direction="left"
            speed="normal"
            className="py-4"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
