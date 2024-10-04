import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { defaultLocale, ValidLocale } from "@/config/i18n-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Themed Next.js App",
  description: "A Next.js app with global dark and light mode using shadcn/ui",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  const lang = (params.lang || defaultLocale) as ValidLocale;
  const isRTL = lang === "ar";

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header lang={lang} />
            <main className="flex-grow">{children}</main>
            <Footer lang={lang} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
