import { InteractiveSection } from "@/components/common/interactive-section";
import { AboutSectionPropsV2 } from "@/components/sections/about-section-2";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { ReferenceProjectsSection } from "@/components/sections/reference-projects-section";
import { TestimonialsAndCompaniesSection } from "@/components/sections/testimonials-section";
import { NewsSection } from "@/components/sections/newsSection";
import { ValidLocale } from "@/config/i18n-config";
import { getHomePage } from "@/lib/sanity/queries/homePage";
import { getProducts } from "@/lib/sanity/queries/products";
import { getNewsSection } from "@/lib/sanity/queries/newsSection";
import { Section } from "@/types/types";

export default async function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const [homePageData, products, newsSection] = await Promise.all([
    getHomePage(lang),
    getProducts(4),
    getNewsSection(lang),
  ]);

  const heroSection = homePageData?.sections?.find(
    (section: Section) => section._type === "heroSection"
  );
  const aboutSection = homePageData?.sections?.find(
    (section: Section) => section._type === "aboutSectionv2"
  );
  const productsSection = homePageData?.sections?.find(
    (section: Section) => section._type === "productsSection"
  );
  const testimonialsSection = homePageData?.sections?.find(
    (section: Section) => section._type === "testimonialsAndCompaniesSection"
  );
  const referenceProjectSection = homePageData?.sections?.find(
    (section: Section) => section._type === "referenceProjectSection"
  );

  return (
    <main className="relative bg-black-100 flex justify-center mx-auto items-center w-full flex-col overflow-hidden">
      <InteractiveSection className="max-w-full w-full">
        {heroSection && (
          <HeroSection key={heroSection.id} {...heroSection} lang={lang} />
        )}
      </InteractiveSection>
      <InteractiveSection>
        {aboutSection && (
          <AboutSectionPropsV2
            key={aboutSection.id}
            {...aboutSection}
            lang={lang}
          />
        )}
      </InteractiveSection>
      <InteractiveSection>
        {productsSection && (
          <ProductsSection
            key={productsSection.id}
            {...productsSection}
            lang={lang}
            featuredProducts={products}
          />
        )}
      </InteractiveSection>
      <InteractiveSection>
        {testimonialsSection && (
          <TestimonialsAndCompaniesSection
            key={testimonialsSection.id}
            {...testimonialsSection}
            lang={lang}
          />
        )}
      </InteractiveSection>
      <InteractiveSection>
        {referenceProjectSection && (
          <ReferenceProjectsSection
            key={referenceProjectSection.id}
            {...referenceProjectSection}
            lang={lang}
          />
        )}
      </InteractiveSection>
      <InteractiveSection>
        {newsSection && (
          <NewsSection key={newsSection._id} {...newsSection} lang={lang} />
        )}
      </InteractiveSection>
    </main>
  );
}
