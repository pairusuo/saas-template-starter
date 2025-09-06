'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeroSimpleProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
  className?: string;
}

export function HeroSimple({ 
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  showSecondaryButton,
  className 
}: HeroSimpleProps) {
  const t = useTranslations('hero-simple');
  
  // 从翻译文件中获取嵌套的数据
  const heroData = t.raw('hero-simple') as any;
  
  // 使用传入的props或从翻译文件获取默认值
  const finalTitle = title || heroData?.title || 'Build Modern SaaS Applications';
  const finalSubtitle = subtitle || heroData?.subtitle || 'Complete SaaS template based on Next.js 14';
  const finalPrimaryButtonText = primaryButtonText || heroData?.primaryButtonText || 'Get Started';
  const finalSecondaryButtonText = secondaryButtonText || heroData?.secondaryButtonText || 'View Demo';
  const finalShowSecondaryButton = showSecondaryButton !== undefined ? showSecondaryButton : (heroData?.showSecondaryButton ?? true);
  
  return (
    <section className={cn('py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 主标题 - 移动端优化字体大小 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            {finalTitle}
          </h1>

          {/* 副标题 - 移动端优化间距和字体 */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            {finalSubtitle}
          </p>

          {/* CTA按钮 - 移动端优化布局 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-shadow text-base"
            >
              {finalPrimaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {finalShowSecondaryButton && (
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 hover:bg-muted/50 text-base"
              >
                {finalSecondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}