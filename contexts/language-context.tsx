"use client";

import { LanguageContextType } from "@/types/types";
import { createContext } from "react";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
