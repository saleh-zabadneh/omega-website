"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { ValidLocale } from "@/config/i18n-config";
import { AboutSectionTypeV2 } from "@/types/types";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AboutSectionPropsV2 extends AboutSectionTypeV2 {
  lang: ValidLocale;
}

export function AboutSectionPropsV2({
  lang,
  heading,
  specialWord,
  badge,
  content,
  image,
  stats,
}: AboutSectionPropsV2) {
  const [isLoading, setIsLoading] = useState(true);
  const [countedStats, setCountedStats] = useState<number[]>([]);
  const [hasCounted, setHasCounted] = useState(false); // Prevent counting multiple times
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (stats && !isLoading && !hasCounted) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounting(); // Trigger the counting animation
              observer.disconnect(); // Stop observing once counted
            }
          });
        },
        { threshold: 0.3 } // Adjust threshold as needed
      );

      if (statsSectionRef.current) {
        observer.observe(statsSectionRef.current);
      }

      return () => observer.disconnect();
    }
  }, [isLoading, stats, hasCounted]);

  const startCounting = () => {
    const duration = 3000; // 4 seconds for the counting animation
    const frameDuration = 2000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameDuration);

    const counters = stats.map((stat) => ({
      start: 0,
      end: stat.value,
      current: 0,
    }));

    let frame = 0;
    const countInterval = setInterval(() => {
      const progress = frame / totalFrames;
      const newCountedStats = counters.map((counter) => {
        const value = Math.round(
          counter.start + (counter.end - counter.start) * progress
        );
        return value > counter.end ? counter.end : value;
      });

      setCountedStats(newCountedStats);

      if (frame === totalFrames) {
        clearInterval(countInterval);
        setHasCounted(true); // Ensure counting only happens once
      }
      frame++;
    }, frameDuration);
  };

  const formatValue = (value: number) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k+` : value.toString();
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="container mx-auto relative">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="z-[-1] absolute inset-0 blur-xl h-[580px]"
          style={{
            background:
              "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 114, 18, 0.13) 10.92%, rgba(204, 171, 238, 0) 70.35%)",
          }}
        ></motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-6 w-40 md:w-96" />
            ) : (
              <Badge
                variant="secondary"
                className="text-sm bg-primary font-semibold px-3 py-1"
              >
                {badge?.[lang]}
              </Badge>
            )}
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <h2 className="text-4xl capitalize md:text-5xl font-bold leading-tight">
                {heading?.[lang]}
                <span className="px-1 capitalize text-brand">
                  {specialWord?.[lang]}
                </span>
              </h2>
            )}
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <p className="text-lg">{content?.[lang]}</p>
            )}
          </div>
          <div className="relative group">
            {isLoading ? (
              <Skeleton className="h-[400px] w-full rounded-lg" />
            ) : (
              <>
                <img
                  src={image?.url}
                  alt={image?.alt}
                  className="rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-gray-900 rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors duration-200">
                    <Play className="w-8 h-8" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div
          ref={statsSectionRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-24 w-full rounded-lg" />
                ))
            : stats?.map((stat, index) => (
                <Card key={index} className="border-brand">
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {formatValue(countedStats[index] || 0)}
                    </div>
                    <div className="text-sm">{stat.label?.[lang]}</div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
