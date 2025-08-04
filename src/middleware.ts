import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false, // false means: detect locale from browser's Accept-Language header
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle internationalization
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
