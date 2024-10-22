import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import {
  GalleryPageTypes,
  getGalleryPage,
} from "@/lib/sanity/queries/galleryPage";
import { ContentSection } from "@/components/common/content";
import ImageGalleryGrid from "@/components/common/ImageGalleryGrid";

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
    <div className="space-y-12">
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
        <section className="px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-brand">
            {typeof galleryContent.sectionTitle === "string"
              ? galleryContent.sectionTitle
              : galleryContent.sectionTitle?.[lang] || "Gallery"}
          </h2>
          <ImageGalleryGrid
            images={
              galleryContent.content.find((item) => item._type === "imageGrid")
                ?.images || []
            }
          />
        </section>
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
    </div>
  );
}
