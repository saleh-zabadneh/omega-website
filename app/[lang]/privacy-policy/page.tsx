import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getPrivacyPolicyPage } from "@/lib/sanity/queries/privacyPolicy";
import { PrivacyPolicyPropsPage } from "@/types/types";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const privacyPolicyPage = await getPrivacyPolicyPage(params.lang);
  return {
    title: privacyPolicyPage?.seo?.title || "Omega Policy",
    description:
      privacyPolicyPage?.seo?.description || "Privacy Policy of Omega Industry",
    openGraph: {
      title: privacyPolicyPage?.seo?.title,
      description: privacyPolicyPage?.seo?.description,
      images: [{ url: privacyPolicyPage?.seo?.image }],
    },
  };
}

export default async function PrivacyPolicyPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const privacyPolicyPage: PrivacyPolicyPropsPage = await getPrivacyPolicyPage(
    lang
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {privacyPolicyPage.title[lang]}
      </h1>
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
