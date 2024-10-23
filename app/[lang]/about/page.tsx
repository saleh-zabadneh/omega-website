import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getAboutPage } from "@/lib/sanity/queries/aboutPage";
import { ContentSection } from "@/components/common/content";
import { getPrivacyPolicyPage } from "@/lib/sanity/queries/privacyPolicy";
import { PrivacyPolicyPropsPage } from "@/types/types";
import { Timeline } from "@/components/common/timeline";
import { getTimeline } from "@/lib/sanity/queries/getTimeline";

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
  const privacyPolicyPage: PrivacyPolicyPropsPage = await getPrivacyPolicyPage(
    lang
  );
  const aboutPage = await getAboutPage(lang);
  const heroContent = aboutPage?.sections?.find((section) =>
    section.content.some((item) => item._type === "hero")
  );
  const timelineItems = await getTimeline(lang);

  return (
    <div className="">
      {heroContent && (
        <ContentSection
          key="hero-section"
          className="px-0 md:px-0"
          sectionTitle={heroContent.sectionTitle}
          content={heroContent.content}
          lang={lang}
        />
      )}
      {timelineItems.length > 0 && (
        <Timeline items={timelineItems} lang={lang} />
      )}
      {aboutPage?.sections
        ?.filter((section) => section !== heroContent)
        .map((section, index) => (
          <ContentSection
            key={index}
            sectionTitle={section?.sectionTitle}
            content={section.content}
            lang={lang}
          />
        ))}
      {privacyPolicyPage?.sections?.map((section, index) => (
        <ContentSection
          key={index}
          sectionTitle={section.sectionTitle}
          content={section.content}
          lang={lang}
        />
      ))}
    </div>
  );
}
