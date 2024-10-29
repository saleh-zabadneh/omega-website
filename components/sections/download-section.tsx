import { ValidLocale } from "@/config/i18n-config";
import { DownloadButton } from "../common/download-button";
import { DownloadSectionProps } from "@/lib/sanity/queries/getDownloadFiles";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";

export function DownloadSection({
  section,
  lang,
}: {
  section: DownloadSectionProps;
  lang: ValidLocale;
}) {
  return (
    <SectionContainer>
      <Heading>{section.title[lang]}</Heading>
      <div className="container mt-12 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.files.map((file) => (
            <DownloadButton key={file._id} file={file} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
