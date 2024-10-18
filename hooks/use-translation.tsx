import { ValidLocale } from "@/config/i18n-config";

const translations = {
  en: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    searchPlaceholder: "Search...",
    searchNotFound: "No results found",
    message: "Message",
    sendMessage: "Send Message",
  },
  ar: {
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    searchPlaceholder: "بحث...",
    searchNotFound: "لم يتم العثور على نتائج",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
  },
};

export function useTranslations(locale: ValidLocale) {
  return (key: keyof typeof translations.en) => {
    return translations[locale][key] || key;
  };
}
