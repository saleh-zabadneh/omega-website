import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ValidLocale } from "@/config/i18n-config";
import { Button } from "../ui/button";
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
  return (
    // <SectionContainer>
    <section className="py-16 md:py-24 max-w-7xl w-full relative overflow-hidden">
      <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
        {heading[lang]}
      </Heading>
      <ReferenceProjectsList
        referenceProjects={referenceProjects}
        lang={lang}
      />
      <Link href={`/${lang}/reference-projects`} passHref>
        <Button className="bg-brand mx-auto flex justify-center capitalize text-lg">
          {lang === "ar" ? "مشاهدة جميع المشاريع" : "Explore Projects"}
        </Button>
      </Link>
    </section>
  );
  {
    /* </SectionContainer> */
  }
}
