"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ValidLocale } from "@/config/i18n-config";
import { LocaleString } from "@/types/types";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReferenceProjectContent = dynamic(
  () => import("./reference-project-content"),
  {
    loading: () => <p>Loading...</p>,
  }
);

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
  const [isContentVisible, setIsContentVisible] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto mb-8 opacity-0 animate-fadeIn">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
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
              <button
                onClick={() => setIsContentVisible(!isContentVisible)}
                className="text-base font-medium text-primary"
              >
                {isContentVisible ? "Show less ↑" : "Learn more →"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isContentVisible && (
        <div className="mt-8">
          <ReferenceProjectContent project={project} lang={lang} />
        </div>
      )}
    </div>
  );
}

export interface ReferenceProjectList2 extends Array<ReferenceProject2> {}

export interface GroupedReferenceProjects {
  [category: string]: ReferenceProject2[];
}

export function groupReferenceProjectsByCategory(
  projects: ReferenceProjectList2,
  lang: ValidLocale
): GroupedReferenceProjects {
  return projects?.reduce((acc, project) => {
    const category = project?.category[lang];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as GroupedReferenceProjects);
}
