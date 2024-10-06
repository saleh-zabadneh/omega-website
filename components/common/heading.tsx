import React from "react";
import { cn } from "@/lib/utils";
import BlurIn from "../ui/blur-in";

interface HeadingProps {
  children: React.ReactNode;
  specialWord?: string;
  highlightSpecialWord?: boolean;
  specialWordClassName?: string;
  className?: string;
}

export function Heading({
  children,
  specialWord,
  highlightSpecialWord = false,
  specialWordClassName,
  className,
}: HeadingProps) {
  const headingText = children?.toString() || "";
  const parts = specialWord ? headingText.split(specialWord) : [headingText];

  return (
    <BlurIn
      className={cn(
        "font-bold capitalize py-4 text-3xl md:text-5xl text-brand-2 text-center",
        className
      )}
    >
      <h2>
        {parts[0]}
        {specialWord && (
          <span
            className={cn(
              highlightSpecialWord && "text-brand",
              specialWordClassName
            )}
          >
            {" "}
            {specialWord}{" "}
          </span>
        )}
        {parts[1]}
      </h2>
    </BlurIn>
  );
}
