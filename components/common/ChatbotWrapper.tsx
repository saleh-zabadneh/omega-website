import { getChatbotData } from "@/lib/sanity/queries/getChatbotData";
import Chatbot from "@/components/common/chatbot";
import { ValidLocale } from "@/config/i18n-config";
import { Suspense } from "react";

export default function ChatbotWrapper({ lang }: { lang: ValidLocale }) {
  return (
    <Suspense fallback={null}>
      <ChatbotContent lang={lang} />
    </Suspense>
  );
}

async function ChatbotContent({ lang }: { lang: ValidLocale }) {
  const chatbotData = await getChatbotData();

  return (
    <Chatbot
      categories={chatbotData.categories}
      lang={lang}
      isEnabled={chatbotData.isEnabled}
    />
  );
}
