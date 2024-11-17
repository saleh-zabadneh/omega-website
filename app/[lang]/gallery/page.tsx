import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import {
  GalleryPageTypes,
  getGalleryPage,
} from "@/lib/sanity/queries/galleryPage";
import { ContentSection } from "@/components/common/content";
import ImageGalleryGrid from "@/components/common/ImageGalleryGrid";
import { SectionContainer } from "@/components/common/section-container";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const galleryPage = await getGalleryPage(params.lang);

  return {
    title: galleryPage?.seo?.title || "Gallery - Omega",
    description: galleryPage?.seo?.description || "Omega Industry Gallery",
    openGraph: {
      title: galleryPage?.seo?.title,
      description: galleryPage?.seo?.description,
      images: [{ url: galleryPage?.seo?.image }],
    },
  };
}

export default async function GalleryPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const galleryPage: GalleryPageTypes = await getGalleryPage(lang);
  const heroContent = galleryPage?.sections?.find((section) =>
    section.content.some((item) => item._type === "hero")
  );
  const galleryContent = galleryPage?.sections?.find((section) =>
    section.content.some((item) => item._type === "imageGrid")
  );

  return (
    <main className="relative bg-background flex justify-center  mx-auto items-center flex-col overflow-hidden">
      <SectionContainer>
        {heroContent && (
          <ContentSection
            key="hero-section"
            className="px-0 md:px-0"
            sectionTitle={heroContent.sectionTitle}
            content={heroContent.content}
            lang={lang}
          />
        )}
        {galleryContent && (
          <>
            <h2 className="text-4xl font-bold mb-8 text-center text-primary">
              {typeof galleryContent.sectionTitle === "string"
                ? galleryContent.sectionTitle
                : galleryContent.sectionTitle?.[lang] || "Gallery"}
            </h2>

            <div className="mx-4 py-2 mb-6 relative ">
              <ImageGalleryGrid
                images={
                  galleryContent.content.find(
                    (item) => item._type === "imageGrid"
                  )?.images || []
                }
                columns={
                  galleryContent.content.find(
                    (item) => item._type === "imageGrid"
                  )?.columns || 12
                }
              />
            </div>
          </>
        )}
        {galleryPage?.sections
          ?.filter(
            (section) => section !== heroContent && section !== galleryContent
          )
          .map((section, index) => (
            <ContentSection
              key={index}
              sectionTitle={section?.sectionTitle}
              content={section.content}
              lang={lang}
            />
          ))}
      </SectionContainer>
    </main>
  );
}
