import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  ContactLink, 
  AboutLink, 
  CareerLink, 
  BlogLink, 
  PricingLink, 
  SupportLink 
} from '@/components/navigation';

interface HeaderEnhancedProps {
  showJobCount?: boolean;
  jobCount?: number;
  showNewBlogPosts?: boolean;
  hasNewPosts?: boolean;
  showPricingPromo?: boolean;
  promoText?: string;
  showSupportStatus?: boolean;
  isSupportOnline?: boolean;
}

export function HeaderEnhanced({
  showJobCount = false,
  jobCount = 0,
  showNewBlogPosts = false,
  hasNewPosts = false,
  showPricingPromo = false,
  promoText = '限时优惠',
  showSupportStatus = false,
  isSupportOnline = true
}: HeaderEnhancedProps) {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600" />
          <span className="font-bold text-xl">SaaS Template</span>
        </Link>

        {/* 导航菜单 */}
        <nav className="hidden md:flex items-center space-x-6">
          <AboutLink variant="dropdown" />
          
          <PricingLink 
            showPromoBadge={showPricingPromo}
            promoText={promoText}
          />
          
          <BlogLink 
            showNewBadge={showNewBlogPosts}
            hasNewPosts={hasNewPosts}
          />
          
          <CareerLink 
            showJobCount={showJobCount}
            jobCount={jobCount}
          />
          
          <SupportLink 
            showOnlineStatus={showSupportStatus}
            isOnline={isSupportOnline}
          />
          
          <ContactLink variant="dropdown" />
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              {t('login')}
            </Button>
            <Button size="sm">
              {t('signup')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}