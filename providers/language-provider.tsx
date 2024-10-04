"use client";

import { useState } from "react";
import { defaultLocale, ValidLocale } from "@/config/i18n-config";
import { LanguageContext } from "@/contexts/language-context";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<ValidLocale>(defaultLocale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
