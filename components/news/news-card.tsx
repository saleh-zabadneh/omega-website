"use client";

import Image from "next/image";
import Link from "next/link";
import { ValidLocale } from "@/config/i18n-config";
import { NewsItem } from "@/lib/sanity/queries/getNews";
import { motion } from "framer-motion";

export function NewsCard({
  item,
  lang,
}: {
  item: NewsItem;
  lang: ValidLocale;
}) {
  return (
    <Link href={`/${lang}/news/${item.slug}`}>
      <motion.div
        className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        whileHover={{ y: -5 }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-brand transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
