import { Heading } from "@/components/common/heading";
import { Paragraph } from "@/components/common/paragraph";
import { SectionContainer } from "@/components/common/section-container";
import { NormalReferenceProjectsList } from "@/components/reference-projects/normal-reference-project-list";
import { ValidLocale } from "@/config/i18n-config";
import { getReferenceProjects } from "@/lib/sanity/queries/referenceProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our References Projects",
  description: "Browse our wide range of References Projects",
};

export default async function ProductsPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const referenceProjects = await getReferenceProjects();

  return (
    <main className="relative bg-background flex justify-center max-w-7xl mx-auto items-center flex-col overflow-hidden">
      <SectionContainer>
        <Heading specialWord={lang === "ar" ? "المميزة" : "projects"}>
          {lang === "ar" ? "  المشاريع المرجعية " : "Special Reference"}
        </Heading>
        <Paragraph className="text-sm">
          {lang === "ar"
            ? "جميع المشاريع المرجعية الخاصة بنا "
            : "all of our reference projects"}
        </Paragraph>
        <div className=" mx-8">
          <NormalReferenceProjectsList
            referenceProjects={referenceProjects}
            lang={lang}
          />
        </div>
      </SectionContainer>
    </main>
  );
}
