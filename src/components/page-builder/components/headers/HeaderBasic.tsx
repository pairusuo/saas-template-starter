'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeaderBasicProps {
  logo?: string;
  navigation?: Array<{ label: string; href: string }>;
  showCTA?: boolean;
  ctaText?: string;
  className?: string;
  builderPreview?: boolean;
  previewMode?: 'desktop' | 'tablet' | 'mobile';
}

export function HeaderBasic({ 
  logo,
  navigation,
  showCTA,
  ctaText,
  className,
  builderPreview = false,
  previewMode,
}: HeaderBasicProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('header-basic');
  
  // 从翻译文件中获取嵌套的数据
  const headerData = t.raw('header-basic') as any;
  
  // 使用传入的props或从翻译文件获取默认值
  const finalLogo = logo || headerData?.logo || 'SaaS Template';
  const navigationFromI18n = headerData?.navigation || [];
  const finalNavigation = navigation || (Array.isArray(navigationFromI18n) ? navigationFromI18n : [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]);
  const finalShowCTA = showCTA !== undefined ? showCTA : (headerData?.showCTA ?? true);
  const finalCtaText = ctaText || headerData?.ctaText || 'Get Started';
  
  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container mx-auto px-4">
        {/* 移动端：简化的单行布局 */}
        <div className="flex h-14 items-center justify-between md:hidden">
          {/* 移动端Logo - 只显示图标 */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 h-10 w-10 rounded-lg hover:bg-muted/50" 
            onClick={() => setIsMenuOpen(v => !v)} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* 桌面端：完整布局 */}
        <div className="hidden md:flex h-16 items-center justify-between">
          {/* 桌面端Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">{finalLogo}</span>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className="flex items-center space-x-6">
            {finalNavigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 桌面端CTA按钮 */}
          {finalShowCTA && (
            <Button size="sm" className="px-4 py-2">
              {finalCtaText}
            </Button>
          )}
        </div>

        {/* 移动端全屏菜单 */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur">
            <div className="flex flex-col h-full">
              {/* 移动端菜单头部 */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </div>
                  <span className="font-bold text-lg">{finalLogo}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 h-10 w-10 rounded-lg" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* 移动端菜单内容 */}
              <div className="flex-1 px-4 py-6">
                <div className="space-y-6">
                  {/* 导航链接 */}
                  <div className="space-y-2">
                    {finalNavigation.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block text-lg font-medium text-foreground py-4 px-4 rounded-lg hover:bg-muted/50 border border-transparent hover:border-muted transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                  
                  {/* CTA按钮 */}
                  {finalShowCTA && (
                    <div className="pt-6 border-t">
                      <Button 
                        className="w-full justify-center py-4 text-lg font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {finalCtaText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}