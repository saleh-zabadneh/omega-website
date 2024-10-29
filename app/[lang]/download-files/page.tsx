import { DownloadSection } from "@/components/sections/download-section";
import { ValidLocale } from "@/config/i18n-config";
import { getDownloadSection } from "@/lib/sanity/queries/getDownloadFiles";

export default async function DownloadFilesPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const downloadSection = await getDownloadSection(lang);

  if (!downloadSection) {
    return <div>No download section found.</div>;
  }

  return (
    <div className="min-h-screen flex justify-center ">
      <DownloadSection section={downloadSection} lang={lang} />
    </div>
  );
}
