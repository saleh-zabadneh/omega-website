"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ValidLocale } from "@/config/i18n-config";
import { Button } from "../ui/button";
import { getTranslation } from "@/lib/translation";
import Link from "next/link";
import { NewsCard } from "../news/news-card";
import { NewsSectionP } from "@/lib/sanity/queries/newsSection";

interface NewsSectionProps extends NewsSectionP {
  lang: ValidLocale;
}

export function NewsSection({
  heading,
  subheading,
  featuredNews,
  lang,
}: NewsSectionProps) {
  return (
    <SectionContainer className="relative overflow-hidden">
      <motion.div className="relative z-10">
        <Heading>{heading[lang]}</Heading>
        <p className="text-center text-muted-foreground mb-8">
          {subheading[lang]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredNews.map((newsItem) => (
            <NewsCard key={newsItem._id} item={newsItem} lang={lang} />
          ))}
        </div>
        <Link href={`/${lang}/news`} passHref>
          <motion.div className="flex justify-center">
            <Button className="bg-brand capitalize text-lg ">
              {getTranslation(lang, "shared", "view all news")}
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </SectionContainer>
  );
}
