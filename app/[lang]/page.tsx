// import Carousel from "@/components/common/x";
import { AboutSectionPropsV2 } from "@/components/sections/about-section-2";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { ReferenceProjectsSection } from "@/components/sections/reference-projects-section";
import { TestimonialsAndCompaniesSection } from "@/components/sections/testimonials-section";
import { ValidLocale } from "@/config/i18n-config";
import { getHomePage } from "@/lib/sanity/queries/homePage";
import { getProducts } from "@/lib/sanity/queries/products";
import { Section } from "@/types/types";

export default async function Home({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const [homePageData, products] = await Promise.all([
    getHomePage(lang),
    getProducts(4),
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
    <main className="relative bg-black-100 flex justify-center mx-auto items-center flex-col overflow-hidden">
      {heroSection && (
        <HeroSection key={heroSection.id} {...heroSection} lang={lang} />
      )}
      {aboutSection && (
        <AboutSectionPropsV2
          key={aboutSection.id}
          {...aboutSection}
          lang={lang}
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
      {referenceProjectSection && (
        <ReferenceProjectsSection
          key={referenceProjectSection.id}
          {...referenceProjectSection}
          lang={lang}
        />
      )}
      {/* <Carousel /> */}
    </main>
  );
}
