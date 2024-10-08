"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { ValidLocale } from "@/config/i18n-config";
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
import { getTranslation } from "@/lib/translation";

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

const Header: React.FC<{ lang: ValidLocale }> = ({ lang }) => {
  const isRTL = lang === "ar";

  const navigation: NavigationItem[] = [
    {
      name: getTranslation(lang, "shared", "home"),
      href: `/${lang}`,
    },
    {
      name: getTranslation(lang, "shared", "products"),
      href: `/${lang}/products`,
      children: [
        {
          name: getTranslation(lang, "products", "PV Mounting Structure"),
          href: `/${lang}/products/pv-mounting-structure`,
        },
        {
          name: getTranslation(lang, "products", "rock-wool-production-lines"),
          href: `/${lang}/products/rock-wool-production-lines`,
        },
        {
          name: getTranslation(lang, "products", "lead-recycling-plant"),
          href: `/${lang}/products/lead-recycling-plant`,
        },
        {
          name: getTranslation(lang, "products", "solar-panel-cleaning-robot"),
          href: `/${lang}/products/solar-panel-cleaning-robot`,
        },
        {
          name: getTranslation(lang, "products", "other"),
          href: `/${lang}/products`,
        },
      ],
    },
    { name: getTranslation(lang, "shared", "about"), href: `/${lang}/about` },
    {
      name: getTranslation(lang, "shared", "contact"),
      href: `/${lang}/contact`,
    },
    {
      name: getTranslation(lang, "shared", "privacy-policy"),
      href: `/${lang}/privacy-policy`,
    },
    {
      name: getTranslation(lang, "shared", "reference-projects"),
      href: `/${lang}/reference-projects`,
    },
  ];

  return (
    <header className="sticky top-0 py-2 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className={`container flex h-14 items-center ${
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
              {navigation.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[900px]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block capitalize select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
          className={`flex flex-1 items-center justify-between space-x-2 ${
            isRTL ? "flex-row-reverse" : ""
          } md:justify-end`}
        >
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <LanguageSwitcher />
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${
                    isRTL ? "ml-2" : "mr-2"
                  } px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0`}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "right" : "left"}
                className={isRTL ? "pl-0" : "pr-0"}
              >
                <MobileNav navigation={navigation} isRTL={isRTL} />
              </SheetContent>
            </Sheet>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

interface MobileNavProps {
  navigation: NavigationItem[];
  isRTL: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ navigation, isRTL }) => {
  return (
    <ScrollArea
      className={`my-4 h-[calc(100vh-8rem)] pb-10 ${isRTL ? "pr-6" : "pl-6"}`}
    >
      <div className="flex flex-col space-y-3">
        {navigation.map((item) => (
          <React.Fragment key={item.href}>
            {item.children ? (
              <Collapsible>
                <CollapsibleTrigger className="flex w-full pr-4 items-center justify-between py-2 text-sm font-medium transition-colors hover:text-primary">
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
};

export default Header;
