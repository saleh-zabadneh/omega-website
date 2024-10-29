"use client";

import { Button } from "@/components/ui/button";
import { DownloadableFile } from "@/lib/sanity/queries/getDownloadFiles";
import { Download } from "lucide-react";

export function DownloadButton({ file }: { file: DownloadableFile }) {
  const handleDownload = () => {
    if (file.fileType === "googleDrive" && file.googleDriveLink) {
      window.open(file.googleDriveLink, "_blank");
    } else {
      window.open(file.fileUrl, "_blank");
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="flex items-center py-5 font-xl space-x-2 bg-brand hover:bg-brand/90"
    >
      <Download size={16} />
      <span>{file.title}</span>
    </Button>
  );
}
