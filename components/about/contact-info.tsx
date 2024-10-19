import { ValidLocale } from "@/config/i18n-config";
import { motion, Variants } from "framer-motion";
import { Phone, Smartphone, MapPin, Mail, PhoneCall } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

  const contactItems = [
    {
      icon: <Phone className="w-5   h-5 text-primary" />,
      title: lang === "ar" ? "الهاتف" : "Phone",
      items: contactInfo.phones,
    },
    {
      icon: <PhoneCall className="w-5  h-5 text-primary" />,
      title: lang === "ar" ? "فاكس" : "Fax",
      items: contactInfo.faxes,
    },
    {
      icon: <Smartphone className="w-5  h-5 text-primary" />,
      title: lang === "ar" ? "رقم الموبايل" : "Mobile",
      items: contactInfo.mobiles,
    },
    {
      icon: <MapPin className="w-5  h-5 text-primary" />,
      title: lang === "ar" ? "العنوان" : "Address",
      items: contactInfo.addresses.map((address) => address[lang]),
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: lang === "ar" ? "البريد الالكتروني" : "Email",
      items: contactInfo.emails,
    },
  ].filter((item) => item.items.length > 0);

  return (
    <motion.div
      className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {contactItems.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card>
            <CardContent className="py-6 px-4">
              <ContactItem
                icon={item.icon}
                title={item.title}
                items={item.items}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ContactItem({ icon, title, items }: ContactItemProps) {
  return (
    <div className="flex items-center flex-wrap space-x-4">
      <div className="flex-shrink-0  w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold px-2 text-lg mb-2">{title}</h3>
        {items.map((item, index) => (
          <p key={index} className="text-muted-foreground text-sm">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
