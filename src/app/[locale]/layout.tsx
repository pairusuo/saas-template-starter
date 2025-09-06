import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { FloatingThemeToggle } from '@/components/ui/floating-theme-toggle';
import { getLogoSvgString } from '@/components/ui/logo';
import { Toaster } from 'sonner';
import '../globals.css';
export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000';
  const locale = params.locale || 'en';
  const canonical = locale === 'en' ? '/' : `/${locale}`;
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'SaaS Template',
      template: '%s | SaaS Template',
    },
    description:
      'A modern SaaS application template to help you build high-quality SaaS products quickly',
    keywords: ['SaaS', 'Template', 'Next.js', 'React', 'TypeScript'],
    authors: [{ name: 'SaaS Template Team' }],
    creator: 'SaaS Template',
    alternates: {
      canonical,
      languages: {
        en: '/',
        zh: '/zh'
      }
    },
    icons: {
      icon: `data:image/svg+xml,${encodeURIComponent(getLogoSvgString())}`,
      shortcut: `data:image/svg+xml,${encodeURIComponent(getLogoSvgString())}`,
      apple: `data:image/svg+xml,${encodeURIComponent(getLogoSvgString())}`,
    },
    openGraph: {
      type: 'website',
      url: baseUrl,
      title: 'SaaS Template',
      description: 'A modern SaaS application template',
      siteName: 'SaaS Template',
      images: [
        {
          url: `data:image/svg+xml,${encodeURIComponent(getLogoSvgString())}`,
          width: 32,
          height: 32,
          alt: 'SaaS Template Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SaaS Template',
      description: 'A modern SaaS application template',
      creator: '@saastemplate',
      images: [`data:image/svg+xml,${encodeURIComponent(getLogoSvgString())}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  } as const;
}

export const viewport = {
  themeColor: '#667eea',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <FloatingThemeToggle />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
