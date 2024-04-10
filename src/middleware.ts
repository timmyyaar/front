import { NextRequest, NextResponse } from "next/server";

const locales = ["pl", "en", "ru", "ua"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const cookieLocale = request.cookies.get("locale");
  const defaultLocale = cookieLocale?.value || "pl";

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|static|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
