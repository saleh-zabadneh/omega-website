import { fetchSanity } from "@/lib/sanity";

type ChatbotData = {
  title: string;
  isEnabled: boolean;
  categories: {
    categoryText: {
      en: string;
      ar: string;
    };
    description: {
      en: string;
      ar: string;
    };
  }[];
};

const fallbackData: ChatbotData = {
  title: "Chatbot",
  isEnabled: false,
  categories: [],
};

export async function getChatbotData(): Promise<ChatbotData> {
  const query = `
    *[_type == "chatbot"][0] {
      title,
      isEnabled,
      categories[] {
        categoryText {
          en,
          ar
        },
        description {
          en,
          ar
        }
      }
    }
  `;

  try {
    const result = await fetchSanity<ChatbotData | null>(query);

    if (!result) {
      console.warn("No chatbot data found in Sanity. Using fallback data.");
      return fallbackData;
    }

    return {
      title: result.title || fallbackData.title,
      isEnabled: result.isEnabled ?? fallbackData.isEnabled,
      categories: result.categories || fallbackData.categories,
    };
  } catch (error) {
    console.error("Error fetching chatbot data:", error);
    return fallbackData;
  }
}
