import { ValidLocale } from "@/config/i18n-config";
import { Metadata } from "next";
import Image from "next/image";
import { Heading } from "@/components/common/heading";
import { ContentSection } from "@/components/common/content";
import { getReferenceProjectDetails } from "@/lib/sanity/queries/referenceProjects";

export async function generateMetadata({
  params,
}: {
  params: { urlPath: string; lang: ValidLocale };
}): Promise<Metadata> {
  const referenceProject = await getReferenceProjectDetails(params.urlPath);

  return {
    title: referenceProject?.title[params.lang],
    description: referenceProject?.description[params.lang],
    openGraph: {
      title: referenceProject?.title[params?.lang],
      description: referenceProject?.description[params?.lang],
      images: [
        {
          url: referenceProject?.image?.url,
          width: 800,
          height: 600,
          alt: referenceProject?.title[params?.lang],
        },
      ],
    },
  };
}

export default async function ReferenceProjectPage({
  params,
}: {
  params: { urlPath: string; lang: ValidLocale };
}) {
  const referenceProject = await getReferenceProjectDetails(params.urlPath);
  console.log(referenceProject);
  return (
    <div className="min-h-screen">
      <div className="relative h-screen">
        <Image
          src={referenceProject?.image?.url}
          alt={referenceProject?.title[params?.lang]}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center text-white">
            <Heading className="text-white">
              {referenceProject?.title[params?.lang]}
            </Heading>
            <p className="mt-4 text-xl">
              {referenceProject?.description[params?.lang]}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {referenceProject?.content && (
          <ContentSection
            sectionTitle="Reference Project Details"
            content={referenceProject?.content}
            lang={params?.lang}
          />
        )}
      </div>
    </div>
  );
}
