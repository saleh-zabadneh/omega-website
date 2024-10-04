import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { TestimonialsAndCompaniesSection } from "@/components/sections/testimonials-section";
import { ValidLocale } from "@/config/i18n-config";
import { getHomePage } from "@/lib/sanity/queries/homePage";
import { getProducts } from "@/lib/sanity/queries/products";
import { getSteps } from "@/lib/sanity/queries/steps";
import { getWhatWeOffer } from "@/lib/sanity/queries/whatWeOffer";
import { Section } from "@/types/types";

export default async function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const [homePageData, products, whatWeOffer, steps] = await Promise.all([
    getHomePage(lang),
    getProducts(4),
    getWhatWeOffer(),
    getSteps(),
  ]);

  const heroSection = homePageData?.sections?.find(
    (section: Section) => section._type === "heroSection"
  );
  const aboutSection = homePageData?.sections?.find(
    (section: Section) => section._type === "aboutSection"
  );
  const productsSection = homePageData?.sections?.find(
    (section: Section) => section._type === "productsSection"
  );
  const testimonialsSection = homePageData?.sections?.find(
    (section: Section) => section._type === "testimonialsAndCompaniesSection"
  );

  return (
    <main className="relative bg-black-100 flex justify-center mx-auto items-center flex-col overflow-hidden">
      {heroSection && (
        <HeroSection key={heroSection.id} {...heroSection} lang={lang} />
      )}
      {aboutSection && (
        <AboutSection
          key={aboutSection.id}
          {...aboutSection}
          lang={lang}
          steps={steps}
          whatWeOfferItems={whatWeOffer}
        />
      )}
      {productsSection && (
        <ProductsSection
          key={productsSection.id}
          {...productsSection}
          lang={lang}
          featuredProducts={products}
        />
      )}
      {testimonialsSection && (
        <TestimonialsAndCompaniesSection
          key={testimonialsSection.id}
          {...testimonialsSection}
          lang={lang}
        />
      )}
    </main>
  );
}
