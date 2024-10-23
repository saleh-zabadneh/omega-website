"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, ArrowLeft, X } from "lucide-react";

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

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Chatbot
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChatbot}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
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
                  Back to Categories
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={toggleChatbot}
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      )}
    </div>
  );
}
