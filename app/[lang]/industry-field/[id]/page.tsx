import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getIndustryField } from "@/lib/sanity/queries/industryField";
import Link from "next/link";
import { ContentSection } from "@/components/common/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale; id: string };
}): Promise<Metadata> {
  const industryField = await getIndustryField(params.lang, params.id);
  return {
    title:
      industryField?.seo?.title ||
      industryField?.title[params.lang] ||
      "Industry Field",
    description:
      industryField?.seo?.description || "Explore our industry field",
    openGraph: {
      title:
        industryField?.seo?.title ||
        industryField?.title[params.lang] ||
        "Industry Field",
      description:
        industryField?.seo?.description || "Explore our industry field",
      images: industryField?.seo?.image
        ? [{ url: industryField.seo.image }]
        : [],
    },
  };
}

export default async function IndustryFieldPage({
  params: { lang, id },
}: {
  params: { lang: ValidLocale; id: string };
}) {
  const industryField = await getIndustryField(lang, id);

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
      {industryField.subFields && industryField.subFields.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Sub Fields</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryField.subFields.map((subField) => (
              <li key={subField._id}>
                <Link
                  href={`/${lang}/industry-field/${subField._id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {subField.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
