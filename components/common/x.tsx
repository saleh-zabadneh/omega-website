"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LocaleString } from "@/types/types";
import { getReferenceProjects } from "@/lib/sanity/queries/referenceProjects";

export interface ReferenceProject {
  _id: string;
  title: LocaleString;
  description: LocaleString;
  urlPath: string;
  image: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip: string;
    };
  };
  content?: any[];
}

export type ReferenceProjectList = ReferenceProject[];

export default function UpdatedCarousel() {
  const [items, setItems] = useState<ReferenceProjectList>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await getReferenceProjects();
        setItems(projects);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch reference projects:", error);
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const nextSlide = useCallback(() => {
    if (items.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  }, [items]);

  const prevSlide = useCallback(() => {
    if (items.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    }
  }, [items]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const getItemIndex = (offset: number) =>
    (currentIndex + offset + items.length) % items.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>No reference projects found.</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden py-12">
      <div className="flex justify-center items-center h-[500px]">
        <AnimatePresence initial={false}>
          {[-1, 0, 1].map((offset) => {
            const index = getItemIndex(offset);
            const item = items[index];
            return (
              <motion.div
                key={item._id}
                custom={offset}
                initial={{ opacity: 0, x: offset * 100 + "%", scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: offset * 100 + "%",
                  scale: offset === 0 ? 1 : 0.8,
                  zIndex: offset === 0 ? 2 : 1,
                }}
                exit={{ opacity: 0, x: offset * 100 + "%", scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 90,
                  duration: 0.6,
                }}
                className={`absolute w-[280px] md:w-[350px] md:h-[500px] h-[450px] ${
                  offset === 0
                    ? "drop-shadow-xl rounded-xl shadow-black/30 dark:shadow-white/30 border-[1.5px] border-primary lg:scale-[1.1]"
                    : ""
                }`}
              >
                <div className="relative w-full h-full bg-card rounded-xl overflow-hidden transition-all duration-300 ease-in-out">
                  <Image
                    src={item.image.url}
                    alt={item.title.en}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={item.image.metadata.lqip}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title.en}</h3>
                    <p className="text-lg mb-4">{item.description.en}</p>
                    <Link
                      href={item.urlPath}
                      className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
                    >
                      Show Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
