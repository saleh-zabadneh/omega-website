"use client";

import { ValidLocale } from "@/config/i18n-config";
import { LocaleString } from "@/types/types";
import { motion } from "framer-motion";
import ReferenceProjectCard2, {
  groupReferenceProjectsByCategory,
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {Object.entries(groupedProjects).map(([category, projects], index) => (
          <div key={category} className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-2xl font-semibold mb-6 text-primary"
            >
              {category}
            </motion.h3>
            {projects.map((project) => (
              <ReferenceProjectCard2
                key={project._id}
                project={project}
                lang={lang}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
