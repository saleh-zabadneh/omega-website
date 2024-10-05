import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getMainIndustryField } from "@/lib/sanity/queries/industryField";
import Link from "next/link";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const industryField = await getMainIndustryField(params.lang);
  return {
    title: industryField?.seo?.title || "Industry Fields",
    description:
      industryField?.seo?.description || "Explore our industry fields",
    openGraph: {
      title: industryField?.seo?.title || "Industry Fields",
      description:
        industryField?.seo?.description || "Explore our industry fields",
      images: industryField?.seo?.image
        ? [{ url: industryField.seo.image }]
        : [],
    },
  };
}

export default async function IndustryFieldMainPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const industryField = await getMainIndustryField(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {industryField?.title?.[lang] || "Industry Fields"}
      </h1>
      {industryField?.content && (
        <ContentSection
          sectionTitle="Content"
          content={industryField.content}
          lang={lang}
        />
      )}
      {industryField?.subCategories &&
        industryField.subCategories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Industry Fields</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industryField.subCategories.map((subCategory) => (
                <li key={subCategory._id}>
                  <Link
                    href={`/${lang}/industry-field/${subCategory.slug.current}`}
                    className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {subCategory.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}
