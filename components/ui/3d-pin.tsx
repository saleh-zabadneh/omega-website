"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CanvasRevealEffect } from "./canvas-reveal-effect";

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
        <div className="w-full h-full p-4 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden">
          <div className={cn("relative z-50", className)}>{children}</div>
          {isHovering && (
            <div className="absolute inset-0 z-40 transition-opacity duration-300">
              <CanvasRevealEffect
                animationSpeed={5}
                containerClassName="absolute inset-0 bg-transparent pointer-events-none"
                colors={[
                  [255, 135, 66], // Primary color (converted from HSL 24.6 95% 53.1%)
                  [255, 135, 66],
                ]}
                dotSize={3}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
