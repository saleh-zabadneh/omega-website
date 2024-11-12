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
    // <SectionContainer className="relative overflow-hidden bg-gradient-to-br from-background to-background/80 py-16 md:py-24">
    <section className="py-16 md:py-24 max-w-7xl w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
      <motion.div className="relative z-10 container mx-auto px-4">
        <Heading className="text-4xl md:text-5xl font-bold text-center mb-4">
          {heading[lang]}
        </Heading>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {subheading[lang]}
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {featuredNews.map((newsItem) => (
            <motion.div
              key={newsItem._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <NewsCard item={newsItem} lang={lang} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex justify-center">
          <Link href={`/${lang}/news`} passHref>
            <Button className="bg-brand capitalize text-lg">
              {getTranslation(lang, "shared", "view all news")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
  {
    /* </SectionContainer> */
  }
}
