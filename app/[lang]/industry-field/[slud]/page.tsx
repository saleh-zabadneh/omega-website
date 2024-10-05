import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import {
  getIndustryField,
  getIndustryFieldPaths,
} from "@/lib/sanity/queries/industryField";
import Link from "next/link";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale; slug: string };
}): Promise<Metadata> {
  const industryField = await getIndustryField(params.lang, params.slug);
  return {
    title: industryField?.seo?.title || "Industry Field",
    description:
      industryField?.seo?.description || "Explore this industry field",
    openGraph: {
      title: industryField?.seo?.title || "Industry Field",
      description:
        industryField?.seo?.description || "Explore this industry field",
      images: industryField?.seo?.image
        ? [{ url: industryField.seo.image }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const paths = await getIndustryFieldPaths();
  return paths;
}

export default async function IndustryFieldPage({
  params: { lang, slug },
}: {
  params: { lang: ValidLocale; slug: string };
}) {
  const industryField = await getIndustryField(lang, slug);

  if (!industryField) {
    return <div>Industry field not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{industryField.title[lang]}</h1>
      {industryField.content && (
        <ContentSection
          sectionTitle="Content"
          content={industryField.content}
          lang={lang}
        />
      )}
      {industryField.subCategories &&
        industryField.subCategories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Industry Fields</h2>
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
      <div className="mt-8">
        <Link
          href={`/${lang}/industry-field`}
          className="text-blue-500 hover:underline"
        >
          Back to All Industry Fields
        </Link>
      </div>
    </div>
  );
}
