import Image from "next/image";
import Link from "next/link";
import { ValidLocale } from "@/config/i18n-config";
import { NewsItem } from "@/lib/sanity/queries/getNews";

export function NewsCard({
  item,
  lang,
}: {
  item: NewsItem;
  lang: ValidLocale;
}) {
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
