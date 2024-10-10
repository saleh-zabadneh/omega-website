import { ValidLocale } from "@/config/i18n-config";
import { ReferenceProject } from "@/types/types";
import { NormalReferenceProjectCard } from "./normal-reference-project-card";

interface NormalReferenceProjectsListProps {
  referenceProjects: ReferenceProject[];
  lang: ValidLocale;
}

export function NormalReferenceProjectsList({
  referenceProjects,
  lang,
}: NormalReferenceProjectsListProps) {
  if (!referenceProjects || referenceProjects.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No reference projects found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto py-12">
      {referenceProjects.map((project) => (
        <NormalReferenceProjectCard
          key={project._id}
          project={project}
          lang={lang}
        />
      ))}
    </div>
  );
}
