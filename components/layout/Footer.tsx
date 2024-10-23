import React from "react";
import { ValidLocale } from "@/config/i18n-config";
import { ArrowBigRight } from "lucide-react";
import MagicButton from "../ui/MagicButton";
import Image from "next/image";
import { getSocialMedia } from "@/lib/sanity/queries/socialMedia";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  ContactPageData,
  getContactPage,
} from "@/lib/sanity/queries/contactPage";

export interface SocialMediaLink {
  _id: string;
  platform: string;
  url: string;
}

interface FooterProps {
  lang: ValidLocale;
}

const Footer = async ({ lang }: FooterProps) => {
  const socialMediaLinks = await getSocialMedia(lang);
  const contactData: ContactPageData = await getContactPage(lang);

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    x: Twitter,
    linkedin: Linkedin,
  };

  const isRTL = lang === "ar";

  const navigation = [
    { name: isRTL ? " المعرض" : "Gallery", href: `/${lang}/gallery` },
    {
      name: isRTL ? "المشاريع المرجعية" : "Reference Projects",
      href: `/${lang}/reference-projects`,
    },
    { name: isRTL ? " الاخبار" : "News", href: `/${lang}/news` },
    { name: isRTL ? "من نحن" : "About", href: `/${lang}/about` },
    { name: isRTL ? "تواصل معنا" : "Contact", href: `/${lang}/contact` },
  ];

  const products = [
    {
      name: isRTL ? "هياكل تركيب الألواح الشمسية" : "PV Mounting Structure",
      href: `/${lang}/products/pv-mounting-structure`,
    },
    {
      name: isRTL ? "خطوط إنتاج الصوف الصخري" : "Rock Wool Production Lines",
      href: `/${lang}/products/rock-wool-production-lines`,
    },
    {
      name: isRTL ? "مصنع إعادة تدوير الرصاص" : "Lead Recycling Plant",
      href: `/${lang}/products/lead-recycling-plant`,
    },
    {
      name: isRTL
        ? "روبوت تنظيف الألواح الشمسية"
        : "Solar Panel Cleaning Robot",
      href: `/${lang}/products/solar-panel-cleaning-robot`,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-sm mb-4">{contactData.title[lang]}</p>
            <div className="flex space-x-4">
              {socialMediaLinks.map((link: SocialMediaLink) => {
                const Icon =
                  platformIcons[link.platform as keyof typeof platformIcons];
                return (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            {contactData.contactInfo.addresses.map((address, index) => (
              <div key={index} className="flex items-center mb-2">
                <MapPin size={16} className="mr-2" />
                <p>{address[lang]}</p>
              </div>
            ))}
            {contactData.contactInfo.phones.map((phone, index) => (
              <div key={index} className="flex items-center mb-2">
                <Phone size={16} className="mr-2" />
                <p>{phone}</p>
              </div>
            ))}
            {contactData.contactInfo.emails.map((email, index) => (
              <div key={index} className="flex items-center mb-2">
                <Mail size={16} className="mr-2" />
                <p>{email}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
          <div className="flex items-center">
            <a href={`mailto:${contactData.contactInfo.emails[0]}`}>
              <MagicButton
                title={isRTL ? "تواصل معنا" : "Contact Us"}
                icon={<ArrowBigRight />}
                position="right"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
