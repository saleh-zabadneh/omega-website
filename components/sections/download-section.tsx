"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ValidLocale } from "@/config/i18n-config";
import {
  DownloadSectionProps,
  DownloadableFile,
} from "@/lib/sanity/queries/getDownloadFiles";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { Download, FileText, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FileCard({
  file,
  lang,
}: {
  file: DownloadableFile;
  lang: ValidLocale;
}) {
  const handleDownload = () => {
    if (file.fileType === "googleDrive" && file.googleDriveLink) {
      window.open(file.googleDriveLink, "_blank");
    } else {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = file.fileUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = file.title;

      // Append to the document body
      document.body.appendChild(link);

      // Programmatically click the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          {file.title}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleDownload} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DownloadSection({
  section,
  lang,
}: {
  section: DownloadSectionProps;
  lang: ValidLocale;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = section.files.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Split the title into parts for the Heading component
  const titleParts = section.title[lang].split(" ");
  const specialWord = titleParts.pop(); // Use the last word as the special word
  const mainTitle = titleParts.join(" ");

  return (
    <SectionContainer className="py-12">
      <Heading
        specialWord={specialWord}
        highlightColor="bg-primary/10"
        specialWordColor="bg-primary/20"
        duration={0.8}
      >
        {mainTitle}
      </Heading>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        {section.description[lang]}
      </p>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <AnimatePresence>
          {filteredFiles.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredFiles.map((file) => (
                <motion.div
                  key={file._id}
                  layout
                  className="file-card"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FileCard file={file} lang={lang} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              className="text-center text-gray-500"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              No files found matching your search.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
