import { Heading } from "@/components/common/heading";
import { Paragraph } from "@/components/common/paragraph";
import { SectionContainer } from "@/components/common/section-container";
import ReferenceProjectSection2 from "@/components/sections/reference-projects-section-2";
import { ValidLocale } from "@/config/i18n-config";
import { getReferenceProjects2 } from "@/lib/sanity/queries/referenceProjects2";
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
  const referenceProjects = await getReferenceProjects2();
  console.log(referenceProjects);
  return (
    //max-w-7xl
    <main className="relative bg-background flex justify-center  mx-auto items-center flex-col overflow-hidden">
      <SectionContainer>
        <Heading specialWord={lang === "ar" ? "المميزة" : "projects"}>
          {lang === "ar" ? "  المشاريع المرجعية " : "Special Reference"}
        </Heading>
        <Paragraph className="text-sm">
          {lang === "ar"
            ? "جميع المشاريع المرجعية الخاصة بنا "
            : "all of our reference projects"}
        </Paragraph>
        <div className="mx-1 md:mx-8">
          <ReferenceProjectSection2
            referenceProjects={referenceProjects}
            lang={lang}
          />
        </div>
      </SectionContainer>
    </main>
  );
}
