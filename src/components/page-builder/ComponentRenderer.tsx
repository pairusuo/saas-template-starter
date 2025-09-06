'use client';

import React from 'react';
import { PageComponent, PreviewMode } from '@/types/page-builder';

// 导入页面构建器专用组件
import { HeroSimple } from '@/components/page-builder/components/heroes/HeroSimple';
import { HeroCentered } from '@/components/page-builder/components/heroes/HeroCentered';
import { HeaderBasic } from '@/components/page-builder/components/headers/HeaderBasic';
import { FooterBasic } from '@/components/page-builder/components/footers/FooterBasic';

// 导入功能组件
import { FeaturesGrid } from '@/components/page-builder/components/features/FeaturesGrid';
import { FeaturesList } from '@/components/page-builder/components/features/FeaturesList';
import { StatsMinimal } from '@/components/page-builder/components/stats/StatsMinimal';
import { StatsBasic } from '@/components/page-builder/components/stats/StatsBasic';
import { TestimonialsSimple } from '@/components/page-builder/components/testimonials/TestimonialsSimple';
import { TestimonialsGrid } from '@/components/page-builder/components/testimonials/TestimonialsGrid';
import { SocialProofAvatars } from '@/components/page-builder/components/social-proof/SocialProofAvatars';
import { SocialProofLogos } from '@/components/page-builder/components/social-proof/SocialProofLogos';
import { CtaSimple } from '@/components/page-builder/components/cta/CtaSimple';
import { CtaSplit } from '@/components/page-builder/components/cta/CtaSplit';
import { PricingCardsBuilder } from '@/components/page-builder/components/pricing/PricingCardsBuilder';
import { FAQAccordion } from '@/components/page-builder/components/faq/FAQAccordion';
// 站点控制组件
import { SiteControls } from '@/components/page-builder/components/site/SiteControls';
import { SiteControlsPopover } from '@/components/page-builder/components/site/SiteControlsPopover';
import { SiteControlsInlineBar } from '@/components/page-builder/components/site/SiteControlsInlineBar';

interface ComponentRendererProps {
  component: PageComponent;
  isPreview?: boolean;
  previewMode?: PreviewMode;
}

export function ComponentRenderer({ component, isPreview = false, previewMode }: ComponentRendererProps) {
  const { type, props } = component;

  // 组件映射表
  const componentMap = {
    'hero-simple': HeroSimple,
    'hero-centered': HeroCentered,
    'features-grid': FeaturesGrid,
    'features-list': FeaturesList,
    'stats-minimal': StatsMinimal,
    'stats-basic': StatsBasic,
    'testimonials-simple': TestimonialsSimple,
    'testimonials-grid': TestimonialsGrid,
    'social-proof-avatars': SocialProofAvatars,
    'social-proof-logos': SocialProofLogos,
    'cta-simple': CtaSimple,
    'cta-split': CtaSplit,
    'pricing-cards': PricingCardsBuilder,
    'faq-accordion': FAQAccordion,
    'header-basic': HeaderBasic,
    'footer-basic': FooterBasic,
    // 站点控制
    'site-control-pill-dock': SiteControls,
    'site-control-gear-popover': SiteControlsPopover,
    'site-control-inline-bar': SiteControlsInlineBar,
  } as const;

  // 获取对应的组件
  const Component = componentMap[type as keyof typeof componentMap];

  if (!Component) {
    return (
      <div className="p-8 border-2 border-dashed border-destructive/50 bg-destructive/5 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            未知组件类型
          </h3>
          <p className="text-sm text-muted-foreground">
            组件类型 "{type}" 未找到对应的实现
          </p>
          <div className="mt-4 p-3 bg-muted rounded text-xs font-mono text-left">
            <div>类型: {type}</div>
            <div>属性: {JSON.stringify(props, null, 2)}</div>
          </div>
        </div>
      </div>
    );
  }

  try {
    // 渲染组件（在构建器预览时对特定组件进行增强）
    if (type === 'header-basic') {
      // 传递 previewMode，让 Header 在移动端预览时使用折叠菜单
      return <HeaderBasic {...(props as any)} builderPreview={isPreview} previewMode={previewMode} />;
    }
    if (type === 'site-control-pill-dock' || type === 'site-control-gear-popover' || type === 'site-control-inline-bar') {
      return <Component {...props} usePreviewTheme={isPreview} /> as any;
    }
    return <Component {...props} />;
  } catch (error) {
    console.error(`渲染组件 ${type} 时出错:`, error);
    
    return (
      <div className="p-8 border-2 border-dashed border-destructive/50 bg-destructive/5 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            组件渲染错误
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            组件 "{type}" 渲染时发生错误
          </p>
          <details className="text-left">
            <summary className="cursor-pointer text-sm font-medium mb-2">
              错误详情
            </summary>
            <div className="p-3 bg-muted rounded text-xs font-mono">
              {error instanceof Error ? error.message : String(error)}
            </div>
          </details>
        </div>
      </div>
    );
  }
}