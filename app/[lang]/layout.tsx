import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/layout/Footer";
import { ValidLocale, defaultLocale } from "@/config/i18n-config";
import WhatsAppLink from "@/components/common/whatsapp-link";
import { LanguageProvider } from "@/providers/language-provider";
import ChatbotWrapper from "@/components/common/ChatbotWrapper";
import HeaderWrapper from "@/components/layout/header-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedLayout } from "@/components/common/protected-layout";

const inter = Inter({ subsets: ["latin"] });

const dubai = localFont({
  src: [
    {
      path: "../fonts/Dubai-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Dubai-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Dubai-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Dubai-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dubai",
});

export const metadata: Metadata = {
  title: "Omega Company",
  description: "Omega Company Solutions",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: ValidLocale };
}) {
  const lang = params.lang || defaultLocale;

  return (
    <html
      lang={params.lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${dubai.variable} ${inter.className} ${
          lang === "ar" ? "font-dubai" : "font-sans"
        }`}
        style={{
          fontFamily:
            lang === "ar" ? "var(--font-dubai), sans-serif" : "inherit",
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider initialLocale={lang}>
            <ProtectedLayout>
              <div className="flex flex-col min-h-screen">
                <HeaderWrapper lang={lang} />
                <main className="flex-grow">{children}</main>
                <Footer lang={lang} />
              </div>
              <WhatsAppLink
                lang={lang}
                phoneNumber="1234567890"
                message="Hi, I'd like to know more about your services."
              />
              <ChatbotWrapper lang={lang} />
            </ProtectedLayout>
          </LanguageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
