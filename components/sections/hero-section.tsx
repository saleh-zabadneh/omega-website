"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { Paragraph } from "../common/paragraph";
import { ValidLocale } from "@/config/i18n-config";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ParticleNetwork } from "../common/particles";

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

interface HeroSectionProps {
  id: string;
  slides: HeroSlide[];
  lang: ValidLocale;
}

export function HeroSection({ slides, lang }: HeroSectionProps) {
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
    <SectionContainer className="relative h-screen max-w-full overflow-hidden">
      <div className="absolute inset-0 z-[100]">
        <ParticleNetwork
          particleColor="rgba(219, 105, 24, 0.5)"
          lineColor="rgba(255, 255, 255, 0.1)"
          particleCount={50}
          lineMaxLength={150}
        />
      </div>
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
            <div className="text-center max-w-7xl text-white px-4">
              <Heading
                duration={1.6}
                highlightColor="bg-primary/60"
                specialWord={slides[currentIndex].specialWord?.[lang]}
                className="mb-4"
              >
                {slides[currentIndex].heading[lang]}
              </Heading>
              <Paragraph className="text-xl md:text-2xl mb-8">
                {slides[currentIndex].subheading[lang]}
              </Paragraph>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild>
                  <a href={slides[currentIndex].link.url}>
                    {slides[currentIndex].link.text[lang]}
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 z-[200] top-1/2 transform -translate-y-1/2  bg-white/20 hover:bg-white/40 transition-colors"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 " />
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
    </SectionContainer>
  );
}
