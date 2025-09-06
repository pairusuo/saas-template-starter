'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface HeaderAdvancedProps {
  showLanguageSwitcher?: boolean;
  showThemeToggle?: boolean;
  className?: string;
}

export function HeaderAdvanced({
  showLanguageSwitcher = true,
  showThemeToggle = true,
  className
}: HeaderAdvancedProps) {
  const t = useTranslations('header-basic');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 从翻译文件中获取导航项
  const headerData = t.raw('header-basic') as any;
  const navigationItems = headerData?.navigation || [];
  
  const navigation = navigationItems.map((item: { label: string; href: string }) => ({
    name: item.label,
    href: item.href.startsWith('#') ? `/${locale}${item.href}` : `/${locale}${item.href}`
  }));

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo href={`/${locale}`} showText={true} />
          </div>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item: { name: string; href: string }) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            {showLanguageSwitcher && <LanguageSwitcher />}
            {showThemeToggle && <ThemeToggle />}
            
            {/* CTA 按钮 */}
            {headerData?.showCTA && (
              <Button size="sm" className="hidden md:inline-flex">
                {headerData?.ctaText || t('ctaText')}
              </Button>
            )}

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item: { name: string; href: string }) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}