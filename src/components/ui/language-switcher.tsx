'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { locales, localeLabels, localeFlags } from '@/lib/i18n-config';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('language');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // If only one locale is available, don't show the switcher
  if (locales.length <= 1) {
    return null;
  }

  const switchLanguage = (newLocale: string) => {
    // Get current path without locale prefix
    let pathWithoutLocale = pathname;

    // Remove any current locale prefix
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}`)) {
        pathWithoutLocale = pathname.slice(loc.length + 1) || '/';
        break;
      }
    }

    // Construct new path based on target locale
    let newPath: string;
    if (newLocale === 'en') {
      // For English, check if we need prefix based on localePrefix: 'as-needed'
      // Since en is default, no prefix needed
      newPath = pathWithoutLocale;
    } else {
      // Non-default locale, add prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('switch')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((availableLocale) => (
          <DropdownMenuItem
            key={availableLocale}
            onClick={() => switchLanguage(availableLocale)}
            className={locale === availableLocale ? 'bg-accent' : ''}
          >
            <span className="mr-2">{localeFlags[availableLocale]}</span>
            {localeLabels[availableLocale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
