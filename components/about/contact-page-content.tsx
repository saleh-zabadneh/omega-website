"use client";

import { ValidLocale } from "@/config/i18n-config";
import { ContactPageData } from "@/lib/sanity/queries/contactPage";
import ContactForm from "@/components/about/contact-form";
import ContactInfo from "@/components/about/contact-info";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ContactPageContentProps {
  contactPage: ContactPageData;
  lang: ValidLocale;
}

export default function ContactPageContent({
  contactPage,
  lang,
}: ContactPageContentProps) {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center "
        >
          <span className="bg-clip-text text-transparent bg-brand">
            {contactPage.title[lang]}
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=" p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 ">Get in Touch</h2>
            <ContactForm lang={lang} />
          </motion.div>

          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className=" p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 ">
              Contact Information
            </h2>
            <ContactInfo contactInfo={contactPage.contactInfo} lang={lang} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
