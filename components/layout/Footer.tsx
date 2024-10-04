import { ValidLocale } from "@/config/i18n-config";
import { ArrowBigRight } from "lucide-react";
import MagicButton from "../ui/MagicButton";
import Image from "next/image";
import { getSocialMedia } from "@/lib/sanity/queries/socialMedia";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { getTranslation } from "@/lib/translation";

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

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    x: Twitter,
    linkedin: Linkedin,
  };

  return (
    <footer
      className="relative w-full xl:max-w-5xl 2xl:max-w-7xl overflow-hidden mx-auto pt-20 pb-10"
      id="contact"
    >
      <div className="w-full absolute left-0 -bottom-[12rem] md:-bottom-72 overflow-hidden min-h-96">
        <Image
          width={140}
          height={140}
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full md:opacity-50 opacity-65"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {getTranslation(lang, "footer", "heading")
            .split("your")
            .map((part, index) =>
              index === 0 ? (
                part
              ) : (
                <>
                  <span key={index} className="text-purple">
                    your
                  </span>
                  {part}
                </>
              )
            )}
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {getTranslation(lang, "footer", "subheading")}
        </p>
        <a href={`mailto:${getTranslation(lang, "footer", "email")}`}>
          <MagicButton
            title={getTranslation(lang, "footer", "cta")}
            icon={<ArrowBigRight />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {getTranslation(lang, "footer", "copyright")}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMediaLinks.map((link: SocialMediaLink) => {
            const Icon =
              platformIcons[link.platform as keyof typeof platformIcons];
            return (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
