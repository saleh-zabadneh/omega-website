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

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

interface HeaderProps {
  lang: ValidLocale;
}

export default function Component({ lang }: HeaderProps = { lang: "en" }) {
  const isRTL = lang === "ar";

  const navigation: NavigationItem[] = [
    {
      name: isRTL ? "الرئيسية" : "Home",
      href: `/${lang}`,
    },
    {
      name: isRTL ? "المنتجات" : "Products",
      href: `/${lang}/products`,
      children: [
        {
          name: isRTL ? "هياكل تركيب الألواح الشمسية" : "PV Mounting Structure",
          href: `/${lang}/products/pv-mounting-structure`,
        },
        {
          name: isRTL
            ? "خطوط إنتاج الصوف الصخري"
            : "Rock Wool Production Lines",
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
        {
          name: isRTL ? "المزيد" : "Other",
          href: `/${lang}/products`,
        },
      ],
    },
    { name: isRTL ? " المعرض" : "Gallery", href: `/${lang}/gallery` },
    { name: isRTL ? "من نحن" : "About", href: `/${lang}/about` },
    { name: isRTL ? "تواصل معنا" : "Contact", href: `/${lang}/contact` },
    {
      name: isRTL ? "المشاريع المرجعية" : "Reference Projects",
      href: `/${lang}/reference-projects`,
    },
  ];

  const reversedNavigation = isRTL ? [...navigation].reverse() : navigation;

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className={`container flex h-16 items-center ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className={`${isRTL ? "ml-4" : "mr-4"} flex items-center`}>
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Image src="/logoOmega2.png" alt="Logo" width={122} height={32} />
          </Link>
        </div>
        <div className={`${isRTL ? "mr-4" : "ml-4"} hidden md:flex`}>
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
          className={`flex flex-1 items-center justify-end space-x-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <LanguageSwitcher />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "right" : "left"} className="z-[100] ">
              <MobileNav navigation={navigation} isRTL={isRTL} />
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
}

function MobileNav({ navigation, isRTL }: MobileNavProps) {
  return (
    <ScrollArea
      className={`my-4 h-[calc(100vh-8rem)] z-[100] pb-10 ${
        isRTL ? "pr-6" : "pl-6"
      }`}
    >
      <div className="flex flex-col space-y-3">
        {navigation.map((item) => (
          <React.Fragment key={item.href}>
            {item.children ? (
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium transition-colors hover:text-primary">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {child.name}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                href={item.href}
                className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
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
