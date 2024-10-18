"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ValidLocale } from "@/config/i18n-config";
import { usePathname, useRouter } from "next/navigation";

type LanguageContextType = {
  locale: ValidLocale;
  setLocale: (locale: ValidLocale) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLocale: ValidLocale;
}> = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState<ValidLocale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentLang = pathname.split("/")[1] as ValidLocale;
    if (currentLang !== locale) {
      setLocale(currentLang);
    }
  }, [pathname, locale]);

  const handleSetLocale = (newLocale: ValidLocale) => {
    setLocale(newLocale);
    const currentPathname = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${currentPathname}`);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
