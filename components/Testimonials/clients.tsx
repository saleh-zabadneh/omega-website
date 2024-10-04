import React, { ReactNode } from "react";
import Image from "next/image";
import { ValidLocale } from "@/config/i18n-config";
import { getTestimonials } from "@/lib/sanity/queries/testimonials";
import { getCompanies } from "@/lib/sanity/queries/companies";
import { InfiniteMovingCards } from "../ui/infinity-cards";
import { Testimonial, Company } from "@/interfaces";
import { LocaleString } from "@/types/types";

interface ClientsProps {
  lang: ValidLocale;
}

function getLocalizedString(
  value: string | LocaleString,
  lang: ValidLocale
): string {
  if (typeof value === "string") {
    return value;
  }
  return value[lang] || Object.values(value)[0] || "";
}

async function Clients({ lang }: ClientsProps) {
  const testimonials = await getTestimonials(lang);
  const companies = await getCompanies(lang);

  const testimonialItems: ReactNode[] = testimonials.map(
    (testimonial: Testimonial) => (
      <div
        key={testimonial._id}
        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-brand/10 px-8 py-6 md:w-[450px] bg-gradient-to-br from-brand/80 to-brand-sub/80 dark:from-brand/20 dark:to-brand-sub/20"
      >
        <blockquote>
          <p className="relative z-20 text-sm leading-[1.6] text-primary-foreground font-normal">
            {getLocalizedString(testimonial.quote, lang)}
          </p>
          <footer className="relative z-20 mt-6 flex flex-row items-center">
            <div className="flex flex-col gap-1">
              <cite className="text-sm font-medium leading-[1.6] text-primary-foreground not-italic">
                {getLocalizedString(testimonial.name, lang)}
              </cite>
              <p className="text-sm leading-[1.6] text-primary-foreground/80 font-normal">
                {getLocalizedString(testimonial.title, lang)}
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    )
  );

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonialItems}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company: Company) => (
            <div key={company._id} className="flex md:max-w-60 max-w-32 gap-2">
              <Image
                src={company.nameImg}
                alt="company"
                width={150}
                height={150}
                className="md:w-24 w-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
