"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlowEffect } from "../ui/glow-effect";

interface InteractiveSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveSection({
  children,
  className,
}: InteractiveSectionProps) {
  return (
    <GlowEffect className={cn("w-full max-w-7xl", className)}>
      {children}
    </GlowEffect>
  );
}
