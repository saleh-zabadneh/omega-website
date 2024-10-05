"use client";

import { useState } from "react";
import { ValidLocale } from "@/config/i18n-config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactForm({ lang }: { lang: ValidLocale }) {
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
      className="space-y-6"
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
      <div className="flex space-x-4">
        <motion.div className="w-1/2" variants={inputVariants}>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full focus:ring-2 focus:ring-brand focus:border-transparent"
            required
          />
        </motion.div>
        <motion.div className="w-1/2" variants={inputVariants}>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
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
          placeholder="Email"
          className="w-full focus:ring-2 focus:ring-brand focus:border-transparent"
          required
        />
      </motion.div>
      <motion.div className="phone-input-container" variants={inputVariants}>
        <PhoneInput
          country={"jo"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
          inputClass="!w-full p-2 border !border-border !bg-background rounded focus:ring-2 focus:ring-brand focus:border-transparent"
          containerClass="w-full"
          dropdownClass="!border-border !rounded-r-none focus:bg-background !hover:bg-background !bg-background"
          buttonClass="!border-border !rounded-r-none focus:bg-background !hover:bg-background !bg-background"
          searchClass="!border-border !rounded-r-none focus:bg-background !hover:bg-background !bg-background"
        />
      </motion.div>
      <motion.div variants={inputVariants}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full h-32 focus:ring-2 focus:ring-brand focus:border-transparent"
          required
        />
      </motion.div>
      <motion.div variants={inputVariants}>
        <Button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark transition-colors duration-300"
        >
          Send Message
        </Button>
      </motion.div>
    </motion.form>
  );
}
