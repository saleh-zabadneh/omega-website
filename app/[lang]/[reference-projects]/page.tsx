import { Heading } from "@/components/common/heading";
import { Paragraph } from "@/components/common/paragraph";
import { SectionContainer } from "@/components/common/section-container";
import { ReferenceProjectsList } from "@/components/reference-projects/reference-project-list";
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

  console.log(referenceProjects);
  return (
    <main className="relative bg-black-100 flex justify-center mx-auto items-center flex-col overflow-hidden">
      <SectionContainer>
        <Heading specialWord={lang === "ar" ? "المميزة" : "projects"}>
          {lang === "ar" ? "  المشاريع المرجعية " : "Special Reference"}
        </Heading>
        <Paragraph className="text-sm">
          {lang === "ar"
            ? "جميع المشاريع المرجعية الخاصة بنا "
            : "all of our reference projects"}
        </Paragraph>
        <ReferenceProjectsList
          referenceProjects={referenceProjects}
          lang={lang}
        />
      </SectionContainer>
    </main>
  );
}
