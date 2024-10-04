import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <section className={cn("py-16 md:py-24 max-w-7xl w-full", className)}>
      {children}
    </section>
  );
}
