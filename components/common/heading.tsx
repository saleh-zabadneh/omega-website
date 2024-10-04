import React from "react";
import { cn } from "@/lib/utils";
import BlurIn from "../ui/blur-in";

interface HeadingProps {
  children: React.ReactNode;
  specialWord?: string;
  className?: string;
}

export function Heading({ children, specialWord, className }: HeadingProps) {
  const headingText = children?.toString() || "";
  const parts = specialWord ? headingText.split(specialWord) : [headingText];

  return (
    <BlurIn
      className={cn(
        "font-bold capitalize py-4 text-4xl md:text-5xl text-brand-2 text-center",
        className
      )}
    >
      <h2>
        {parts[0]}
        {specialWord && <span className="text-brand"> {specialWord} </span>}
        {parts[1]}
      </h2>
    </BlurIn>
  );
}
