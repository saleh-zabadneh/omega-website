import { ValidLocale } from "@/config/i18n-config";
import { LocaleText, ReferenceProject } from "@/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ReferenceProjectCardProps {
  project: ReferenceProject;
  offset: number;
  lang: ValidLocale;
}

export function ReferenceProjectCard({
  project,
  offset,
  lang,
}: ReferenceProjectCardProps) {
  // Helper function to safely access localized strings
  const getLocalizedString = (
    obj: LocaleText | undefined,
    fallback: string
  ): string => {
    if (!obj) return fallback;
    return obj[lang] || fallback;
  };

  return (
    <motion.div
      key={project._id}
      custom={offset}
      initial={{ opacity: 0, x: offset * 100 + "%", scale: 0.8 }}
      animate={{
        opacity: 1,
        x: offset * 100 + "%",
        scale: offset === 0 ? 1 : 0.8,
        zIndex: offset === 0 ? 2 : 1,
      }}
      exit={{ opacity: 0, x: offset * 100 + "%", scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 90,
        duration: 0.6,
      }}
      className={`absolute w-[280px] md:w-[350px] md:h-[500px] h-[450px] ${
        offset === 0
          ? "drop-shadow-xl rounded-xl shadow-black/30 dark:shadow-white/30 border-[1.5px] border-primary lg:scale-[1.1]"
          : ""
      }`}
    >
      <div className="relative w-full h-full bg-card rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
        {project.image && (
          <Image
            src={project.image.url}
            alt={getLocalizedString(project.title, "Project Image")}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={project.image.metadata.lqip}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">
            {getLocalizedString(project.title, "Untitled Project")}
          </h3>
          <p className="text-lg mb-4">
            {getLocalizedString(
              project.description,
              "No description available"
            )}
          </p>
          <Link
            href={`/${lang}/reference-projects/${project?.urlPath}` || ""}
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            Show Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}