"use client";

import { useState } from "react";
import { ValidLocale } from "@/config/i18n-config";
import PhoneInput from "react-phone-input-2";
import "@/styles/phone-input.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translation";

export default function ContactForm({ lang }: { lang: ValidLocale }) {
  const isRTL = lang === "ar";
  const t = useTranslations(lang);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ firstName, lastName, email, phone, message });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div
        className={`flex ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}
      >
        <motion.div className="w-1/2" variants={inputVariants}>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t("firstName")}
            className="w-full focus:ring-2 focus:ring-brand focus:border-transparent"
            required
          />
        </motion.div>
        <motion.div className="w-1/2" variants={inputVariants}>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t("lastName")}
            className="w-full focus:ring-2 focus:ring-brand focus:border-transparent"
            required
          />
        </motion.div>
      </div>
      <motion.div variants={inputVariants}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          className="w-full focus:ring-2 focus:ring-brand focus:border-transparent"
          required
        />
      </motion.div>
      <motion.div className="phone-input-container">
        <PhoneInput
          country={"jo"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
          inputClass={`!w-full p-2 border !border-border !bg-background rounded focus:ring-2 focus:ring-brand focus:border-transparent ${
            isRTL ? "rtl-input" : ""
          }`}
          containerClass="w-full"
          dropdownClass="!border-border !rounded-r-none focus:bg-background !hover:bg-background !bg-background"
          buttonClass={`!border-border focus:bg-background !hover:bg-background !bg-background ${
            isRTL
              ? "!rounded-l-none !rounded-r-md absoulte right-0"
              : "!rounded-r-none !rounded-l-md"
          }`}
          searchClass="!border-border !rounded-r-none focus:bg-background !hover:bg-background !bg-background"
          enableSearch={true}
          disableSearchIcon={false}
          searchPlaceholder={t("searchPlaceholder")}
          searchNotFound={t("searchNotFound")}
          enableAreaCodes={true}
        />
      </motion.div>
      <motion.div variants={inputVariants}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("message")}
          className="w-full h-32 focus:ring-2 focus:ring-brand focus:border-transparent"
          required
        />
      </motion.div>
      <motion.div variants={inputVariants}>
        <Button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark transition-colors duration-300"
        >
          {t("sendMessage")}
        </Button>
      </motion.div>
    </motion.form>
  );
}
