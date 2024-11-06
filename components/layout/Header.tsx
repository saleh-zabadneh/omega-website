"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import LanguageSwitcher from "../common/language-switcher";
import { ThemeToggle } from "../common/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ValidLocale } from "@/config/i18n-config";
import { usePathname } from "next/navigation";
import { ProductNavName } from "@/lib/sanity/queries/productsNavNames";

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

interface HeaderProps {
  lang: ValidLocale;
  dynamicProducts: ProductNavName[];
  showLanguageSwitcher: boolean;
}

export default function Header({
  lang,
  dynamicProducts,
  showLanguageSwitcher,
}: HeaderProps) {
  const isRTL = lang === "ar";
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    {
      name: lang === "ar" ? "الرئيسية" : "Home",
      href: `/${lang}`,
    },
    {
      name: lang === "ar" ? "المنتجات" : "Products",
      href: `/${lang}/products`,
      children: [
        {
          name:
            lang === "ar"
              ? "هياكل تركيب الألواح الشمسية"
              : "PV Mounting Structure",
          href: `/${lang}/products/pv-mounting-structure`,
        },
        {
          name:
            lang === "ar"
              ? "خطوط إنتاج الصوف الصخري"
              : "Rock Wool Production Lines",
          href: `/${lang}/products/rock-wool-production-lines`,
        },
        {
          name:
            lang === "ar" ? "مصنع إعادة تدوير الرصاص" : "Lead Recycling Plant",
          href: `/${lang}/products/lead-recycling-plant`,
        },
        {
          name:
            lang === "ar"
              ? "روبوت تنظيف الألواح الشمسية"
              : "Solar Panel Cleaning Robot",
          href: `/${lang}/products/solar-panel-cleaning-robot`,
        },
        ...dynamicProducts.map((product) => ({
          name: product.title,
          href: `/${lang}/products/${product.slug}`,
        })),
        {
          name: lang === "ar" ? "المزيد" : "Other",
          href: `/${lang}/products`,
        },
      ],
    },
    { name: lang === "ar" ? "من نحن" : "About", href: `/${lang}/about` },
    {
      name: lang === "ar" ? "المشاريع المرجعية" : "Reference Projects",
      href: `/${lang}/reference-projects`,
    },
    { name: lang === "ar" ? "المعرض" : "Gallery", href: `/${lang}/gallery` },
    { name: lang === "ar" ? "الاخبار" : "News", href: `/${lang}/news` },
    {
      name: lang === "ar" ? "تواصل معنا" : "Contact",
      href: `/${lang}/contact`,
    },
  ];

  const reversedNavigation = isRTL ? [...navigation].reverse() : navigation;

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-16 items-center">
        <div className="flex items-center">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={122} height={32} />
          </Link>
        </div>
        <div className={`${isRTL ? "mr-4" : "ml-4"} hidden md:flex flex-1`}>
          <NavigationMenu>
            <NavigationMenuList>
              {reversedNavigation.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  {child.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div
          className={`flex items-center  space-x-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {showLanguageSwitcher && <LanguageSwitcher />}
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "right" : "left"} className="z-[100]">
              <MobileNav
                navigation={navigation}
                isRTL={isRTL}
                lang={lang}
                closeSheet={() => setIsSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

interface MobileNavProps {
  navigation: NavigationItem[];
  isRTL: boolean;
  lang: ValidLocale;
  closeSheet: () => void;
}

function MobileNav({ navigation, isRTL, lang, closeSheet }: MobileNavProps) {
  const pathname = usePathname();
  const [openCollapsible, setOpenCollapsible] = React.useState<string | null>(
    null
  );

  const handleLinkClick = () => {
    closeSheet();
  };

  const handleCollapsibleToggle = (href: string) => {
    setOpenCollapsible(openCollapsible === href ? null : href);
  };

  return (
    <ScrollArea
      className={`my-4 h-[calc(100vh-8rem)] z-[100] pb-10 ${
        isRTL ? "pr-6" : "pl-6"
      }`}
    >
      <div className="flex flex-col space-y-3 ">
        {navigation.map((item) => (
          <React.Fragment key={item.href}>
            {item.children ? (
              <Collapsible
                open={openCollapsible === item.href}
                onOpenChange={() => handleCollapsibleToggle(item.href)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium transition-colors hover:text-primary">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 ">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block py-2 pl-4 text-sm transition-colors hover:text-primary ${
                        pathname === child.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {child.name}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                href={item.href}
                className={`block py-2 text-sm transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
