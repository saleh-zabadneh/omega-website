"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageGalleryGrid({
  images,
  columns,
}: {
  images: any[];
  columns: number;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const getGridColumns = () => {
    if (columns > 0 && columns === 1) return columns + 1;
    if (images.length % 2 === 0) {
      return images.length > 4 ? 4 : 2;
    } else {
      return 3;
    }
  };

  const gridColumns = getGridColumns();

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
    <>
      <div
        className={`grid grid-cols-2 place-content-center mx-auto max-w-7xl md:grid-cols-${gridColumns} gap-6`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={
              index === 0 && images.length > 1 ? `md:col-span-${columns} ` : ""
            }
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image?.asset?.url || image?.url || ""}
              alt={image?.alt || ""}
              width={image?.asset?.metadata?.dimensions?.width || 800}
              height={image?.asset?.metadata?.dimensions?.height || 600}
              className="w-full h-56 object-cover rounded-lg shadow-lg cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={handleOutsideClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute  md:right-4 right-2 md:top-1 top-[18%]    text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              onClick={handleOutsideClick}
            >
              <div className=" mx-auto">
                <motion.img
                  src={
                    images[selectedImageIndex]?.asset?.url ||
                    images[selectedImageIndex]?.url ||
                    ""
                  }
                  alt={images[selectedImageIndex]?.alt || "Gallery image"}
                  className=" w-full max-w-[50rem]  h-full max-h-96   object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                />
              </div>

              <button
                className="absolute left-4  top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
