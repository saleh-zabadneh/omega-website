import React from "react";
import { cn } from "@/lib/utils";
import BlurIn from "../ui/blur-in";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <BlurIn className={cn("text-gray-300 mb-8", className)} blurAmount={13}>
      <p>{children}</p>
    </BlurIn>
  );
}
