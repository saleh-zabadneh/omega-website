import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getAboutPage } from "@/lib/sanity/queries/aboutPage";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const aboutPage = await getAboutPage(params.lang);
  return {
    title: aboutPage?.seo?.title || "About Omega",
    description: aboutPage?.seo?.description || "What about Omega Industry",
    openGraph: {
      title: aboutPage?.seo?.title,
      description: aboutPage?.seo?.description,
      images: [{ url: aboutPage?.seo?.image }],
    },
  };
}

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const aboutPage = await getAboutPage(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-4xl font-bold mb-8">{aboutPage.title[lang]}</h1> */}
      {aboutPage?.sections?.map((section, index) => (
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
