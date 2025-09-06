import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  // Use explicit locale prefixes for all locales to match the [locale] segment
  localePrefix: 'always',
  localeDetection: false, // 禁用自动语言检测，避免URL和内容不一致
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If no locale is present in the path, rewrite to default locale
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/_static') || pathname.startsWith('/imgs');
  const isPublicFile = /\.[\w-]+$/.test(pathname);

  if (!hasLocale && !isPublicAsset && !isPublicFile && pathname !== '/robots.txt' && pathname !== '/sitemap.xml') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    // Use redirect to update the URL and avoid showing the 404 first
    const redirect = NextResponse.redirect(url, 308);
    redirect.headers.set('X-Frame-Options', 'DENY');
    redirect.headers.set('X-Content-Type-Options', 'nosniff');
    redirect.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    redirect.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    return redirect;
  }

  // Handle internationalization via next-intl
  const intlResponse = intlMiddleware(request);

  // Add security headers to the response
  const response = intlResponse || NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - all root files inside /public (e.g. /favicon.ico)
    '/((?!_next|_static|imgs|api|robots.txt|sitemap.xml).*)',
  ],
};
