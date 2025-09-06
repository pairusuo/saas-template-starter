'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface FooterAdvancedProps {
  showSocialLinks?: boolean;
  className?: string;
}

export function FooterAdvanced({
  showSocialLinks = true,
  className
}: FooterAdvancedProps) {
  const t = useTranslations('footer-advanced');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;

  const footerLinks = {
    product: [
      { name: t('product.features'), href: '#features' },
      { name: t('product.pricing'), href: '#pricing' },
      { name: t('product.docs'), href: `/${locale}/docs` },
      { name: t('product.examples'), href: `/${locale}/examples` },
    ],
    company: [
      { name: t('company.about'), href: `/${locale}/about` },
      { name: t('company.blog'), href: `/${locale}/blog` },
      { name: t('company.careers'), href: `/${locale}/careers` },
      { name: t('company.contact'), href: `/${locale}/contact` },
    ],
    legal: [
      { name: t('legal.privacy'), href: `/${locale}/privacy` },
      { name: t('legal.terms'), href: `/${locale}/terms` },
      { name: t('legal.cookies'), href: `/${locale}/cookies` },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@example.com' },
  ];

  return (
    <footer className={cn('bg-muted/30 border-t', className)}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Mobile layout: stacked with collapsible sections */}
        <div className="md:hidden space-y-6">
          <div>
            <Logo href={`/${locale}`} className="mb-4" />
            <p className="text-sm text-muted-foreground mb-4 break-words">
              {t('description')}
            </p>
            {showSocialLinks && (
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <details className="rounded-lg border bg-background/50" open>
            <summary className="cursor-pointer select-none px-4 py-3 font-medium">{t('sections.product')}</summary>
            <ul className="px-4 pb-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-lg border bg-background/50">
            <summary className="cursor-pointer select-none px-4 py-3 font-medium">{t('sections.company')}</summary>
            <ul className="px-4 pb-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="rounded-lg border bg-background/50">
            <summary className="cursor-pointer select-none px-4 py-3 font-medium">{t('sections.legal')}</summary>
            <ul className="px-4 pb-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Desktop/tablet layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-6 lg:gap-8">
          {/* Logo和描述 */}
          <div className="md:col-span-3 lg:col-span-2">
            <Logo href={`/${locale}`} className="mb-4" />
            <p className="text-sm text-muted-foreground mb-4 max-w-xs break-words">
              {t('description')}
            </p>
            {showSocialLinks && (
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 产品链接 */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4">{t('sections.product')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 公司链接 */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4">{t('sections.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法律链接 */}
          <div>
            <h3 className="font-semibold mb-3 md:mb-4">{t('sections.legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            {t('madeWith')} ❤️ {t('by')} SaaS Template Team
          </p>
        </div>
      </div>
    </footer>
  );
}