import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getNewsDetails } from "@/lib/sanity/queries/getNews";
import { ContentSection } from "@/components/common/content";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale; slug: string };
}): Promise<Metadata> {
  const newsItem = await getNewsDetails(params.slug, params.lang);
  return {
    title: `${newsItem.title} | Omega Company News`,
    description: newsItem.description,
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      images: [{ url: newsItem.image }],
    },
  };
}

export default async function NewsDetailsPage({
  params: { lang, slug },
}: {
  params: { lang: ValidLocale; slug: string };
}) {
  const newsItem = await getNewsDetails(slug, lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{newsItem.title}</h1>
      <Image
        src={newsItem.image}
        alt={newsItem.title}
        width={1200}
        height={600}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
      />
      <p className="text-xl text-muted-foreground mb-8">
        {newsItem.description}
      </p>
      {newsItem.content &&
        newsItem.content.map((section, index) => (
          <ContentSection
            key={index}
            sectionTitle={null}
            content={[section]}
            lang={lang}
          />
        ))}
    </div>
  );
}
