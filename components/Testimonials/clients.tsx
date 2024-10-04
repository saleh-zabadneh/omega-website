import React from "react";

import { ValidLocale } from "@/config/i18n-config";
import { getTestimonials } from "@/lib/sanity/queries/testimonials";
import { getCompanies } from "@/lib/sanity/queries/companies";
import { InfiniteMovingCards } from "../ui/infinity-cards";

interface ClientsProps {
  lang: ValidLocale;
}

async function Clients({ lang }: ClientsProps) {
  const testimonials = await getTestimonials(lang);
  const companies = await getCompanies(lang);

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company._id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={company.nameImg}
                  alt={"company"}
                  width={150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
