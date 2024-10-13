"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ValidLocale } from "@/config/i18n-config";
import { LocaleString } from "@/types/types";
import { motion } from "framer-motion";

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
  image2: {
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
}

interface ReferenceProjectCard2Props {
  project: ReferenceProject2;
  lang: ValidLocale;
}

export default function ReferenceProjectCard2({
  project,
  lang,
}: ReferenceProjectCard2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto"
    >
      <Link href={`/${lang}/reference-projects-2/${project.urlPath}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 ">
              <div className="relative h-72 ">
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
                <span className="text-base font-medium text-primary">
                  Learn more →
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-16 gap-x-1  order-3 lg:order-2">
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {project.text2[lang]}
                </h3>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {project.text1[lang]}
                </p>
                <span className="text-base font-medium text-primary">
                  Explore project →
                </span>
              </div>
              <div className="relative h-72  order-2 lg:order-3">
                <Image
                  src={project.image2.url}
                  alt={project.text2[lang]}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={project.image2.metadata.lqip}
                  className="rounded-b-lg lg:rounded-r-lg lg:rounded-b-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
