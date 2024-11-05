"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Category = {
  categoryText: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
};

type ChatbotProps = {
  categories: Category[];
  lang: "en" | "ar";
  isEnabled: boolean;
};

export default function Chatbot({ categories, lang, isEnabled }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showMessage, setShowMessage] = useState(true);

  const isRTL = lang === "ar";

  useEffect(() => {
    const hideMessage = () => {
      setShowMessage(false);
    };

    const showMessageAgain = () => {
      setShowMessage(true);
    };

    const initialHideTimer = setTimeout(hideMessage, 2000);
    const showAgainTimer = setInterval(() => {
      showMessageAgain();
      setTimeout(hideMessage, 2000);
    }, 11000);

    return () => {
      clearTimeout(initialHideTimer);
      clearInterval(showAgainTimer);
    };
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setShowMessage(false);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (!isEnabled) {
    return null;
  }

  const message = isRTL ? "تحدث معي" : "Talk to me";

  return (
    <div
      className={`fixed bottom-4 ${lang === "ar" ? "right-4" : "left-4"} z-50`}
    >
      {isOpen ? (
        <Card className="w-[26rem] h-[590px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="mr-2 h-8 w-8" />
              {lang === "en" ? "Chatbot" : "روبوت الدردشة"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChatbot}>
              <X className="h-4 w-4" />
              <span className="sr-only">
                {lang === "en" ? "Close" : "إغلاق"}
              </span>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              {selectedCategory ? (
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    {selectedCategory.categoryText[lang]}
                  </h3>
                  <p>{selectedCategory.description[lang]}</p>
                </div>
              ) : (
                <div className="grid gap-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      variant="outline"
                      className="justify-start"
                    >
                      {category.categoryText[lang]}
                    </Button>
                  ))}
                </div>
              )}
            </ScrollArea>
            {selectedCategory && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {lang === "en" ? "Back to Categories" : "العودة إلى الفئات"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="flex flex-col items-center">
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  className="mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className={`inline-block py-1 px-2 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-medium`}
                  >
                    {message}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              onClick={toggleChatbot}
              className="bg-primary text-white sm:p-4 p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={lang === "en" ? "Open Chatbot" : "افتح روبوت الدردشة"}
            >
              <Bot className="sm:h-7 h-6 w-6 sm:w-7" />
            </motion.button>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
