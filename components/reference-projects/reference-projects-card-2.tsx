"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ValidLocale } from "@/config/i18n-config";
import { LocaleString } from "@/types/types";
import ReferenceProjectContent from "./reference-project-content";

export interface ReferenceProject2 {
  _id: string;
  text1: LocaleString;
  text2: LocaleString;
  urlPath: string;
  image1: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip: string;
    };
  };
  category: LocaleString;
  content?: any[];
}

interface ReferenceProjectCard2Props {
  project: ReferenceProject2;
  lang: ValidLocale;
}

export default function ReferenceProjectCard2({
  project,
  lang,
}: ReferenceProjectCard2Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto mb-16"
    >
      <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative h-72">
            <Image
              src={project.image1.url}
              alt={project.text1[lang]}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={project.image1.metadata.lqip}
              className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-16 gap-x-1">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {project.text1[lang]}
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6">
              {project.text2[lang]}
            </p>
          </div>
        </div>
      </div>
      {project.content && (
        <div className="mt-8">
          <ReferenceProjectContent content={project.content} lang={lang} />
        </div>
      )}
    </motion.div>
  );
}
