"use client";

import React from "react";
import { motion } from "framer-motion";
import { ValidLocale } from "@/config/i18n-config";
import { TimelineItem } from "@/lib/sanity/queries/getTimeline";

interface TimelineProps {
  items: TimelineItem[];
  lang: ValidLocale;
}

export const Timeline: React.FC<TimelineProps> = ({ items, lang }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
      <div className="relative">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-1/2 px-4">
              <div
                className={`${index % 2 === 0 ? "text-right" : "text-left"}`}
              >
                <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                <p className="mt-2">{item.description[lang]}</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center z-10">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <div className="w-1/2 px-4" />
          </motion.div>
        ))}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-primary -translate-x-1/2" />
      </div>
    </div>
  );
};
