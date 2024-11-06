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
      className="  max-w-full w-full md:max-w-7xl mx-auto mb-16"
    >
      <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg ">
        <div className="flex flex-col capitalize lg:flex-row">
          <div className="flex-1 p-6 lg:p-8 flex flex-col">
            <div className="flex-grow overflow-y-auto">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 ">
                {project.text1[lang]}
              </h3>
            </div>
            <div className="flex-grow overflow-y-auto">
              <p className="text-base lg:text-lg">{project.text2[lang]}</p>
            </div>
          </div>
          <div className="relative lg:w-1/2 h-72 lg:h-auto">
            <Image
              src={project.image1.url}
              alt={project.text1[lang]}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={project.image1.metadata.lqip}
              className="rounded-b-lg lg:rounded-r-lg lg:rounded-l-none"
            />
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
