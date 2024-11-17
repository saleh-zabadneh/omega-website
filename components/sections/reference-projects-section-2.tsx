"use client";

import { motion } from "framer-motion";
import { ValidLocale } from "@/config/i18n-config";
import ReferenceProjectCard2, {
  ReferenceProject2,
} from "../reference-projects/reference-projects-card-2";

export interface ReferenceProjectSection2Props {
  lang: ValidLocale;
  referenceProjects: ReferenceProject2[];
}

export default function ReferenceProjectSection2({
  lang,
  referenceProjects,
}: ReferenceProjectSection2Props) {
  const groupedProjects = groupReferenceProjectsByCategory(
    referenceProjects,
    lang
  );

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {Object.entries(groupedProjects).map(([category, projects], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-24 last:mb-0"
          >
            <div className="relative mb-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-start">
                <span className="pr-3 bg-background md:text-4xl text-xl font-semibold leading-6 text-primary">
                  {category}
                </span>
              </div>
            </div>

            <div className=" mx-auto space-y-12">
              {projects.map((project, projectIndex) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="relative"
                >
                  <div
                    className={`absolute ${
                      lang === "ar" ? "-right-8" : "-left-8"
                    } md:text-2xl top-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-background font-bold text-md`}
                  >
                    {projectIndex + 1}
                  </div>
                  <ReferenceProjectCard2 project={project} lang={lang} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
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
