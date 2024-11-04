import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of all supported languages
const supportedLanguages = ["en", "ar", "fr", "es", "de"];

// Function to get the default language (you can customize this based on your needs)
function getDefaultLanguage(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLanguage = acceptLanguage.split(",")[0].split("-")[0];
    if (supportedLanguages.includes(preferredLanguage)) {
      return preferredLanguage;
    }
  }
  return "en"; // Default to English if no match
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already includes a language
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (!pathnameHasLanguage) {
    // Redirect to the same path with the default language prefix
    const defaultLanguage = getDefaultLanguage(request);
    return NextResponse.redirect(
      new URL(`/${defaultLanguage}${pathname}`, request.url)
    );
  }

  // Extract language from URL
  const [, language, ...rest] = pathname.split("/");

  // Check if the current language is valid
  if (!supportedLanguages.includes(language)) {
    const defaultLanguage = getDefaultLanguage(request);
    return NextResponse.redirect(
      new URL(`/${defaultLanguage}/${rest.join("/")}`, request.url)
    );
  }

  // Handle language switch
  if (supportedLanguages.includes(rest[0])) {
    // If the next part of the URL is also a language, it's an invalid switch
    // Redirect to the new language with the rest of the path
    return NextResponse.redirect(
      new URL(`/${rest[0]}/${rest.slice(1).join("/")}`, request.url)
    );
  }

  // Check if it's a dashboard route
  if (pathname.startsWith(`/${language}/dashboard`)) {
    const token = request.cookies.get("user")?.value;

    if (!token) {
      // Redirect to login page if no token is present
      return NextResponse.redirect(new URL(`/${language}/login`, request.url));
    }

    try {
      // Verify the token (this is a simple check, you might want to use a proper JWT verification)
      const user = JSON.parse(token);
      if (!user.id) {
        throw new Error("Invalid token");
      }
    } catch (error) {
      // If token is invalid, clear the cookie and redirect to login
      const response = NextResponse.redirect(
        new URL(`/${language}/login`, request.url)
      );
      response.cookies.delete("user");
      return response;
    }
  }

  // Continue to the next middleware or to the application
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
