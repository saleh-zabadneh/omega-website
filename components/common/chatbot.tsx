"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, ArrowLeft, X, MessageCircle } from "lucide-react";

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
    <div className={`fixed bottom-4 "left-5" z-50`}>
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
        <div className="flex flex-col items-center">
          {showMessage && (
            <div className="animate-pulse mb-2">
              <span
                className={`inline-block py-1 px-2 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-medium`}
              >
                {message}
              </span>
            </div>
          )}
          <Button
            onClick={toggleChatbot}
            size="icon"
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center"
          >
            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">
              {lang === "en" ? "Open Chatbot" : "افتح روبوت الدردشة"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
