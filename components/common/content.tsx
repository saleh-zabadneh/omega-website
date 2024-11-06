"use client";
import Image from "next/image";
import Link from "next/link";
import { ValidLocale } from "@/config/i18n-config";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Hero from "./hero";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ContentSectionProps {
  sectionTitle: string | Record<ValidLocale, string> | null;
  content: any[];
  lang: ValidLocale;
  className?: string;
}

export function ContentSection({
  sectionTitle,
  content,
  className,
  lang,
}: ContentSectionProps) {
  const title =
    typeof sectionTitle === "string"
      ? sectionTitle
      : sectionTitle?.[lang] ?? null;
  const heroContent = content.find((item) => item._type === "hero");
  const otherContent = content.filter((item) => item._type !== "hero");
  const orderedContent = heroContent ? [heroContent, ...otherContent] : content;
  console.log(orderedContent);
  return (
    <section className={cn("px-4 md:px-8", className)}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl capitalize font-bold mb-8 text-center text-brand"
        >
          {title}
        </motion.h2>
      )}
      <div className="space-y-12">
        {orderedContent?.map((item, index) => (
          <ContentItem key={index} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function ContentItem({ item, lang }: { item: any; lang: ValidLocale }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{ duration: 0.5 }}
      className="pb-12"
    >
      {(() => {
        switch (item._type) {
          case "localeText":
            return <LocaleText text={item[lang]} />;
          case "imageGrid":
            return <ImageGrid {...item} />;
          case "list":
            return <List items={item.items} lang={lang} />;
          case "quote":
            return <Quote text={item.text[lang]} author={item.author[lang]} />;
          case "callToAction":
            return <CallToAction text={item.text[lang]} url={item.url} />;
          case "video":
            return (
              <Video
                url={item.url}
                caption={item.caption ? item.caption[lang] : ""}
              />
            );
          case "hero":
            return <Hero slides={item.slides} lang={lang} />;
          default:
            return null;
        }
      })()}
    </motion.div>
  );
}

function LocaleText({ text }: { text: string }) {
  return <p className="text-lg leading-relaxed  max-w-4xl mx-auto">{text}</p>;
}
export function ImageGrid({
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
        className={`grid grid-cols-1 place-content-center mx-auto max-w-7xl md:grid-cols-${gridColumns} gap-6`}
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
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={handleOutsideClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
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
                className="absolute top-56 sm:top-4 right-4 md:top-0 md:-right-12 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X size={24} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all"
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

function List({
  items,
  lang,
}: {
  items: Record<ValidLocale, string>[];
  lang: ValidLocale;
}) {
  return (
    <ul className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center space-x-4"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 180 }}
            className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-white font-bold"
          >
            {index + 1}
          </motion.div>
          <span className="text-lg ">{item[lang]}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <blockquote className="relative p-8  rounded-lg shadow-inner max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl italic  mb-4">{text}</p>
        <footer className="text-right text-brand font-semibold">
          — {author}
        </footer>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-6xl text-brand opacity-25"
      >
        &quot;
      </motion.div>
    </blockquote>
  );
}

function CallToAction({ text, url }: { text: string; url: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="text-center">
      <Link href={url} passHref>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="inline-block bg-brand text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {text}
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block ml-2"
          >
            →
          </motion.span>
        </motion.a>
      </Link>
    </div>
  );
}

function Video({ url, caption }: { url: string; caption: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={url}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      {caption && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-sm text-gray-600 text-center"
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
