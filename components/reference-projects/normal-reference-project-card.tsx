import { ValidLocale } from "@/config/i18n-config";
import { LocaleText, ReferenceProject } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface NormalReferenceProjectCardProps {
  project: ReferenceProject;
  lang: ValidLocale;
}

export function NormalReferenceProjectCard({
  project,
  lang,
}: NormalReferenceProjectCardProps) {
  const getLocalizedString = (
    obj: LocaleText | undefined,
    fallback: string
  ): string => {
    if (!obj) return fallback;
    return obj[lang] || fallback;
  };

  return (
    <div className="w-full  md:w-[320px] h-[420px] md:h-[480px] drop-shadow-xl rounded-xl shadow-black/30 dark:shadow-white/30 border-[1.5px] border-primary">
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
    </div>
  );
}
