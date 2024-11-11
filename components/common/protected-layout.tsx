"use client";

import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { toast } = useToast();

  useEffect(() => {
    const preventSave = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        toast({
          title: "Image Protected",
          description: "This image is protected and cannot be downloaded.",
          variant: "destructive",
        });
      }
    };

    const preventDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventSave);
    document.addEventListener("dragstart", preventDragStart);

    return () => {
      document.removeEventListener("contextmenu", preventSave);
      document.removeEventListener("dragstart", preventDragStart);
    };
  }, [toast]);

  return (
    <div className="protected-layout">
      {children}
      <style jsx global>{`
        img {
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
        }
      `}</style>
    </div>
  );
}
