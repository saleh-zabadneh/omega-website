import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getIndustryFields } from "@/lib/sanity/queries/industryField";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  return {
    title: "Industry Fields",
    description: "Explore our industry fields",
  };
}

export default async function IndustryFieldMainPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const industryFields = await getIndustryFields(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Industry Fields</h1>
      <div className="space-y-8">
        {industryFields.map((field) => (
          <div key={field._id}>
            <h2 className="text-2xl font-bold mb-4">
              <Link
                href={`/${lang}/industry-field/${field._id}`}
                className="hover:underline"
              >
                {field.title[lang]}
              </Link>
            </h2>
            {field.subFields && field.subFields.length > 0 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {field.subFields.map((subField) => (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
