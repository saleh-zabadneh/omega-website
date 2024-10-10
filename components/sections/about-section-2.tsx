"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { ValidLocale } from "@/config/i18n-config";
import { AboutSectionTypeV2 } from "@/types/types";

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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && stats) {
      const duration = 4000; // 2 seconds for the counting animation
      const frameDuration = 3000 / 60; // 60 fps
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
        }
        frame++;
      }, frameDuration);

      return () => clearInterval(countInterval);
    }
  }, [isLoading, stats]);

  const formatValue = (value: number) => {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k+` : value.toString();
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {isLoading ? (
              <Skeleton className="h-6 w-40 md:w-96" />
            ) : (
              <Badge
                variant="secondary"
                className="text-sm font-semibold px-3 py-1"
              >
                {badge?.[lang]}
              </Badge>
            )}
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {heading?.[lang]}
                <span className="px-1 text-brand">{specialWord?.[lang]}</span>
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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
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
