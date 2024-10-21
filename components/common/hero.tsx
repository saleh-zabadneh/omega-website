"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValidLocale } from "@/config/i18n-config";
import { ParticleNetwork } from "./particles";

interface HeroSlide {
  heading: Record<ValidLocale, string>;
  subheading: Record<ValidLocale, string>;
  specialWord?: Record<ValidLocale, string>;
  backgroundImage: {
    url: string;
    alt: string;
  };
  link: {
    text: Record<ValidLocale, string>;
    url: string;
  };
}

interface HeroProps {
  id?: string;
  slides: HeroSlide[];
  lang: ValidLocale;
}

export default function Hero({ slides, lang }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  const slideVariants = {
    hidden: (direction: number) => ({
      y: direction > 0 ? "30px" : "-30px",
      opacity: 0,
    }),
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "tween", duration: 0.9, ease: "easeOut" },
        opacity: { duration: 0.9 },
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-30px" : "30px",
      opacity: 0,
      transition: {
        y: { type: "tween", duration: 0.9, ease: "easeIn" },
        opacity: { duration: 0.9 },
      },
    }),
  };

  return (
    <div className="relative h-screen w-full max-w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 z-10"
        >
          <Image
            src={slides[currentIndex].backgroundImage.url}
            alt={
              slides[currentIndex].backgroundImage.alt ||
              "Hero background image"
            }
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="text-center  text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {slides[currentIndex].heading[lang]}
                {slides[currentIndex].specialWord && (
                  <span className="bg-primary/60 px-2">
                    {slides[currentIndex].specialWord[lang]}
                  </span>
                )}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {slides[currentIndex].subheading[lang]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 z-[200] top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 transition-colors"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-[200] transform -translate-y-1/2 bg-white/20 hover:bg-white/40 transition-colors"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
}
