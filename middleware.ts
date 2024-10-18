import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./config/i18n-config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  // Check for protected routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/protected")) {
    const user = request.cookies.get("user");
    if (!user) {
      return NextResponse.redirect(
        new URL(`/${defaultLocale}/login`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
