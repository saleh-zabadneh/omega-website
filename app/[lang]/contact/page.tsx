import { Metadata } from "next";
import { ValidLocale } from "@/config/i18n-config";
import {
  getContactPage,
  ContactPageData,
} from "@/lib/sanity/queries/contactPage";
import ContactPageContent from "@/components/about/contact-page-content";

export async function generateMetadata({
  params,
}: {
  params: { lang: ValidLocale };
}): Promise<Metadata> {
  const contactPage = await getContactPage(params.lang);
  return {
    title: contactPage.seo.title,
    description: contactPage.seo.description,
    openGraph: {
      title: contactPage.seo.title,
      description: contactPage.seo.description,
      images: [{ url: contactPage.seo.image }],
    },
  };
}

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const contactPage: ContactPageData = await getContactPage(lang);

  return <ContactPageContent contactPage={contactPage} lang={lang} />;
}
