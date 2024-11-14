"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageGalleryGridProps {
  images: Array<{
    asset?: { url: string };
    url?: string;
    alt?: string;
  }>;
}

export default function ImageGalleryGrid({ images }: ImageGalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null || prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === null || prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevImage();
    if (e.key === "ArrowRight") handleNextImage();
    if (e.key === "Escape") setSelectedImageIndex(null);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImageIndex(null);
    }
  };
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImageIndex(index)}
              className="relative aspect-square"
            >
              <Image
                src={image?.asset?.url || image?.url || "/placeholder.svg"}
                alt={image?.alt || "Gallery image"}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 sm:max-h-96 max-h-[32rem] inset-0 bg-black bg-opacity-90 flex items-center justify-center max-w-7xl px-12 md:px-52 mx-auto z-50 "
            onClick={handleOutsideClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div className="relative w-full h-full flex items-center justify-center">
              <div className="mx-auto">
                <motion.img
                  src={
                    images[selectedImageIndex]?.asset?.url ||
                    images[selectedImageIndex]?.url ||
                    ""
                  }
                  alt={images[selectedImageIndex]?.alt || "Gallery image"}
                  className="w-full max-w-[50rem] h-full max-h-96 object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                />
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="absolute md:top-2 top-[10%] right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all  sm:flex"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
