"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReferenceProjectCard } from "./reference-projects-card";
import { ReferenceProject } from "@/types/types";
import { ValidLocale } from "@/config/i18n-config";

interface ReferenceProjectsListProps {
  referenceProjects: ReferenceProject[];
  lang: ValidLocale;
}

export function ReferenceProjectsList({
  referenceProjects,
  lang,
}: ReferenceProjectsListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    if (referenceProjects?.length > 0) {
      setDirection(1);
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % referenceProjects.length
      );
    }
  }, [referenceProjects]);

  const prevSlide = useCallback(() => {
    if (referenceProjects?.length > 0) {
      setDirection(-1);
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + referenceProjects.length) % referenceProjects.length
      );
    }
  }, [referenceProjects]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const getItemIndex = (offset: number) =>
    (currentIndex + offset + referenceProjects.length) %
    referenceProjects.length;

  if (!referenceProjects || referenceProjects.length === 0) {
    return <div>No reference projects found.</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden py-12">
      <div className="flex justify-center items-center h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          {[-1, 0, 1].map((offset) => {
            const index = getItemIndex(offset);
            const project = referenceProjects[index];
            return (
              <ReferenceProjectCard
                key={`${project._id}-${offset}`}
                project={project}
                offset={offset}
                direction={direction}
                lang={lang}
              />
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
