"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onMouseEnter = () => {
    setIsHovering(true);
  };
  const onMouseLeave = () => {
    setIsHovering(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Link
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
    >
      <div className="w-full h-full">
        <div
          className={cn(
            "w-full h-full p-4 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] transition duration-700 overflow-hidden",
            isHovering
              ? "border-primary border-2"
              : "group-hover/pin:border-white/[0.2]"
          )}
        >
          <div className={cn("relative z-50", className)}>{children}</div>
          {isHovering && (
            <div className="absolute inset-0 z-40 transition-opacity duration-300 bg-primary/10"></div>
          )}
        </div>
      </div>
      {isHovering && (
        <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-lg transition-opacity duration-300 z-30"></div>
      )}
    </Link>
  );
};
