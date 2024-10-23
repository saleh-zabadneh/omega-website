import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import { getNewsList, NewsItem } from "@/lib/sanity/queries/getNews";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/common/heading";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  return {
    title: "News | Omega Company",
    description: "Latest news from Omega Company",
  };
}

export default async function NewsPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const news = await getNewsList(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading
        specialWord="Latest"
        highlightColor="bg-primary/10"
        specialWordColor="bg-primary/20"
      >
        Latest News
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {news.map((item) => (
          <NewsCard key={item._id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function NewsCard({ item, lang }: { item: NewsItem; lang: ValidLocale }) {
  return (
    <Link href={`/${lang}/news/${item.slug}`} className="block">
      <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
