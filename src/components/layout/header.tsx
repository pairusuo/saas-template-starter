'use client';

import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Header() {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const t = useTranslations('navigation');

  // Check if we're on the home page
  const isHomePage = () => {
    const homePaths = ['/', '/en', '/zh'];
    const current = pathname.replace(/\/$/, '') || '/';
    return homePaths.includes(current);
  };

  // Create localized path
  const createLocalizedPath = (path: string) => {
    return locale === 'en' ? path : `/${locale}${path}`;
  };

  // Smooth scroll to anchor
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();

    // If not on the home page, go there first
    if (!isHomePage()) {
      window.location.href = `${createLocalizedPath('/')}#${anchor}`;
      return;
    }
    // Already on the home page, smooth scroll
    const el = document.getElementById(anchor);
    if (el) {
      const headerHeight = 56;
      const pos = el.offsetTop - headerHeight;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      window.history.pushState(null, '', `${createLocalizedPath('/')}#${anchor}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Logo size="header" className="mr-6" href={createLocalizedPath('/')} />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a
              href={`${createLocalizedPath('/')}#features`}
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
            >
              {t('features')}
            </a>
            <a
              href={`${createLocalizedPath('/')}#pricing`}
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer"
            >
              {t('pricing')}
            </a>
            <Link
              href={createLocalizedPath('/docs')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('docs')}
            </Link>
            <Link
              href={createLocalizedPath('/blog')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('blog')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other components */}
          </div>
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}