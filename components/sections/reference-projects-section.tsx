import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ValidLocale } from "@/config/i18n-config";
import { Button } from "../ui/button";
import { getTranslation } from "@/lib/translation";
import Link from "next/link";
import { ReferenceProjectsList } from "../reference-projects/reference-project-list";
import { ReferenceProjectSectionType } from "@/types/types";

interface ReferenceProjectsSectionProps extends ReferenceProjectSectionType {
  lang: ValidLocale;
}

export function ReferenceProjectsSection({
  heading,
  referenceProjects,
  specialWord,
  lang,
}: ReferenceProjectsSectionProps) {
  console.log(referenceProjects);
  return (
    <SectionContainer>
      <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
        {heading[lang]}
      </Heading>
      <ReferenceProjectsList
        referenceProjects={referenceProjects}
        lang={lang}
      />
      <Link href={`/${lang}/reference-projects`} passHref>
        <Button className="bg-brand mx-auto flex justify-center capitalize text-lg">
          {getTranslation(lang, "shared", "Explore Projects")}
        </Button>
      </Link>
    </SectionContainer>
  );
}