import { ValidLocale } from "@/config/i18n-config";
import { motion, Variants } from "framer-motion";
import { Phone, Smartphone, MapPin, Mail, PhoneCallIcon } from "lucide-react";

interface ContactInfo {
  phones: string[];
  faxes: string[];
  mobiles: string[];
  addresses: Record<ValidLocale, string>[];
  emails: string[];
}

interface ContactInfoProps {
  contactInfo: ContactInfo;
  lang: ValidLocale;
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  variants: Variants;
}

export default function ContactInfo({ contactInfo, lang }: ContactInfoProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {contactInfo.phones.length > 0 && (
        <ContactItem
          icon={<Phone className="w-6 h-6 text-brand" />}
          title="Phone"
          items={contactInfo.phones}
          variants={itemVariants}
        />
      )}
      {contactInfo.faxes.length > 0 && (
        <ContactItem
          icon={<PhoneCallIcon className="w-6 h-6 text-brand" />}
          title="Fax"
          items={contactInfo.faxes}
          variants={itemVariants}
        />
      )}
      {contactInfo.mobiles.length > 0 && (
        <ContactItem
          icon={<Smartphone className="w-6 h-6 text-brand" />}
          title="Mobile"
          items={contactInfo.mobiles}
          variants={itemVariants}
        />
      )}
      {contactInfo.addresses.length > 0 && (
        <ContactItem
          icon={<MapPin className="w-6 h-6 text-brand" />}
          title="Address"
          items={contactInfo.addresses.map((address) => address[lang])}
          variants={itemVariants}
        />
      )}
      {contactInfo.emails.length > 0 && (
        <ContactItem
          icon={<Mail className="w-6 h-6 text-brand" />}
          title="Email"
          items={contactInfo.emails}
          variants={itemVariants}
        />
      )}
    </motion.div>
  );
}

function ContactItem({ icon, title, items, variants }: ContactItemProps) {
  return (
    <motion.div className="flex items-start space-x-4" variants={variants}>
      {icon}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}:</h3>
        {items.map((item, index) => (
          <p key={index} className="text-gray-600">
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
