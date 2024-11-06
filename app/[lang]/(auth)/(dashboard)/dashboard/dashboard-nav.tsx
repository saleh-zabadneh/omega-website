"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

export default function DashboardNav({ lang }: { lang: string }) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-lg font-semibold">Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={`/${lang}/dashboard`}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isLinkActive(`/${lang}/dashboard`)
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                Super Admins
              </Link>
              <Link
                href={`/${lang}/dashboard/devices`}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isLinkActive(`/${lang}/dashboard/devices`)
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                Devices
              </Link>
              <Link
                href={`/${lang}/dashboard/contacts`}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isLinkActive(`/${lang}/dashboard/contacts`)
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <form action={logout}>
              <input type="hidden" name="lang" value={lang} />
              <Button type="submit" variant="ghost">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
