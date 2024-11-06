"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [shuffledImages, setShuffledImages] = useState(images);

  const shuffleImages = useCallback(() => {
    const newShuffled = [...images].sort(() => Math.random() - 0.5);
    setShuffledImages(newShuffled);
  }, [images]);

  useEffect(() => {
    shuffleImages();
  }, [shuffleImages]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  const goToPrevious = useCallback(() => {
    setSelectedImage((prev) =>
      prev === 0 ? shuffledImages.length - 1 : prev! - 1
    );
  }, [shuffledImages.length]);

  const goToNext = useCallback(() => {
    setSelectedImage((prev) =>
      prev === shuffledImages.length - 1 ? 0 : prev! + 1
    );
  }, [shuffledImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    },
    [closeLightbox, goToPrevious, goToNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {shuffledImages.map((image, index) => (
          <Card
            key={index}
            className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square"
            >
              <Image
                src={image?.asset?.url || image?.url || "/bg.svg"}
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
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  shuffledImages[selectedImage]?.asset?.url ||
                  shuffledImages[selectedImage]?.url ||
                  "/placeholder.svg"
                }
                alt={shuffledImages[selectedImage]?.alt || "Selected image"}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute  right-2 top-0 md:top-12 md:right-0 bg-white text-black hover:bg-gray-200"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
