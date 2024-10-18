"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurIn from "../ui/blur-in";

interface HeadingProps {
  children: React.ReactNode;
  specialWord?: string;
  className?: string;
  highlightColor?: string;
  specialWordColor?: string;
  duration?: string | number;
}

export function Heading({
  children,
  specialWord,
  className,
  highlightColor,
  duration = 0.5,
  specialWordColor,
}: HeadingProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const headingText = children?.toString() || "";
  const parts = specialWord ? headingText.split(specialWord) : [headingText];

  useEffect(() => {
    setShouldAnimate(!!highlightColor || !!specialWordColor);
  }, [highlightColor, specialWordColor]);

  const highlightVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: duration } },
    exit: { width: 0, transition: { duration: duration } },
  };

  return (
    <BlurIn
      className={cn(
        "font-bold capitalize py-4 text-3xl md:text-5xl text-center relative",
        className
      )}
    >
      <h2
        className="capitalize inline-block "
        onClick={() => setIsSelected(!isSelected)}
      >
        <motion.span className="relative px-2 inline-block">
          {parts[0]}
          {highlightColor && (
            <motion.span
              className={cn(
                "absolute inset-0 -z-10 md:block hidden",
                highlightColor
              )}
              initial="initial"
              animate={shouldAnimate && !isSelected ? "animate" : "initial"}
              variants={highlightVariants}
            />
          )}
        </motion.span>
        {specialWord && (
          <motion.span className="relative inline-block">
            <span className={cn("relative z-10 mx-2 text-primary")}>
              {" "}
              {specialWord}{" "}
            </span>
            {specialWordColor && (
              <motion.span
                className={cn("absolute inset-0 -z-10", specialWordColor)}
                initial="initial"
                animate={shouldAnimate && !isSelected ? "animate" : "initial"}
                variants={highlightVariants}
              />
            )}
          </motion.span>
        )}
        {parts[1] && (
          <motion.span className="relative inline-block">
            {parts[1]}
            {highlightColor && (
              <motion.span
                className={cn("absolute inset-0 -z-10", highlightColor)}
                initial="initial"
                animate={shouldAnimate && !isSelected ? "animate" : "initial"}
                variants={highlightVariants}
              />
            )}
          </motion.span>
        )}
      </h2>
    </BlurIn>
  );
}
