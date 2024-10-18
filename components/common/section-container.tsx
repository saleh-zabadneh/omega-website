import React from "react";
import { cn } from "@/lib/utils";
import { InteractiveSection } from "./interactive-section";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <InteractiveSection className={className}>
      <section className={cn("py-16 md:py-24 max-w-7xl w-full", className)}>
        {children}
      </section>
    </InteractiveSection>
  );
}
