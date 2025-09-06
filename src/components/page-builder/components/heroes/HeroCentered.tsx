'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeroCenteredProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
  showVideoButton?: boolean;
  className?: string;
}

export function HeroCentered({ 
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  showSecondaryButton,
  showVideoButton,
  className 
}: HeroCenteredProps) {
  const t = useTranslations('hero-centered');
  
  // 从翻译文件中获取嵌套的数据
  const heroData = t.raw('hero-centered') as any;
  
  // 使用传入的props或从翻译文件获取默认值
  const finalTitle = title || heroData?.title || 'Build the Future of SaaS';
  const finalSubtitle = subtitle || heroData?.subtitle || 'Complete SaaS template with modern design and powerful features';
  const finalPrimaryButtonText = primaryButtonText || heroData?.primaryButtonText || 'Get Started';
  const finalSecondaryButtonText = secondaryButtonText || heroData?.secondaryButtonText || 'Watch Demo';
  const finalShowSecondaryButton = showSecondaryButton !== undefined ? showSecondaryButton : (heroData?.showSecondaryButton ?? true);
  const finalShowVideoButton = showVideoButton !== undefined ? showVideoButton : (heroData?.showVideoButton ?? false);
  
  return (
    <section className={cn('py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 主标题 - 使用移动端优化的标题类 */}
          <h1 className="hero-mobile font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            {finalTitle}
          </h1>

          {/* 副标题 - 使用移动端优化的文本类 */}
          <p className="subtitle-mobile text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            {finalSubtitle}
          </p>

          {/* CTA按钮 - 使用移动端优化的按钮类 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
            <Button 
              size="lg" 
              className="btn-mobile shadow-lg hover:shadow-xl transition-shadow"
            >
              {finalPrimaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {finalShowSecondaryButton && (
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-mobile border-2 hover:bg-muted/50"
              >
                {finalSecondaryButtonText}
              </Button>
            )}
            {finalShowVideoButton && (
              <Button 
                variant="ghost" 
                size="lg" 
                className="btn-mobile"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
            )}
          </div>

          {/* 信任标识 */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base text-muted-foreground">
              Trusted by 10,000+ developers worldwide
            </p>
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 opacity-60">
              <div className="text-xs sm:text-sm text-muted-foreground">GitHub</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Vercel</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Stripe</div>
              <div className="text-xs sm:text-sm text-muted-foreground">AWS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}