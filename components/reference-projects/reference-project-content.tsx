"use client";

import Image from "next/image";
import Link from "next/link";
import { ValidLocale } from "@/config/i18n-config";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

interface ReferenceProjectContentProps {
  content: any[];
  lang: ValidLocale;
}

export default function ReferenceProjectContent({
  content,
  lang,
}: ReferenceProjectContentProps) {
  return (
    <section className="my-16 px-4 md:px-8">
      <div className="space-y-12">
        {content?.map((item, index) => (
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
          default:
            return null;
        }
      })()}
    </motion.div>
  );
}

function LocaleText({ text }: { text: string }) {
  return <p className="text-lg leading-relaxed max-w-4xl mx-auto">{text}</p>;
}

function ImageGrid({ images, columns }: { images: any[]; columns: number }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getGridColumns = () => {
    if (columns > 0 && columns === 1) return columns + 1;
    if (images.length % 2 === 0) {
      return images.length > 4 ? 4 : 2;
    } else {
      return 3;
    }
  };

  const gridColumns = getGridColumns();

  return (
    <>
      <div
        className={`grid grid-cols-1 place-content-center mx-auto max-w-4xl md:grid-cols-${gridColumns} gap-6`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={
              index === 0 && images.length > 1 ? `md:col-span-${columns} ` : ""
            }
            onClick={() =>
              setSelectedImage(image?.asset?.url || image?.url || "")
            }
          >
            <Image
              src={image?.asset?.url || image?.url || ""}
              alt={image?.alt || ""}
              width={image?.asset?.metadata?.dimensions?.width || 800}
              height={image?.asset?.metadata?.dimensions?.height || 600}
              className="w-full h-44 object-cover rounded-lg shadow-lg cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <motion.img
              src={selectedImage}
              alt="Full screen image"
              className="max-h-full w-full h-full max-w-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
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
          <span className="text-lg">{item[lang]}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <blockquote className="relative p-8 rounded-lg shadow-inner max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl italic mb-4">{text}</p>
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