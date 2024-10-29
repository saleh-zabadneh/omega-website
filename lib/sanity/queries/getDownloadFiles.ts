import { fetchSanity } from "@/lib/sanity";
import { ValidLocale } from "@/config/i18n-config";

export type DownloadableFile = {
  _id: string;
  title: string;
  fileUrl: string;
  fileType: "local" | "googleDrive";
  googleDriveLink?: string;
};

export type DownloadSectionProps = {
  title: Record<ValidLocale, string>;
  description: Record<ValidLocale, string>;
  files: DownloadableFile[];
};

export async function getDownloadSection(
  lang: ValidLocale
): Promise<DownloadSectionProps | null> {
  const query = `
    *[_type == "downloadSection"][0] {
      title,
      description,
      "files": files[]-> {
        _id,
        title,
        "fileUrl": file.asset->url,
        fileType,
        googleDriveLink
      }
    }
  `;
  return fetchSanity<DownloadSectionProps | null>(query, { lang });
}
