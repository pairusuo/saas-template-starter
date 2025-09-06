/**
 * 组件预览渲染器 - 在页面构建器中预览组件
 */

'use client';

import { HeroCentered } from '@/components/page-builder/components/heroes/HeroCentered';
import { HeroSimple } from '@/components/page-builder/components/heroes/HeroSimple';
import { PricingCardsBuilder } from '@/components/page-builder/components/pricing/PricingCardsBuilder';
import { FeaturesGrid } from '@/components/page-builder/components/features/FeaturesGrid';
import { FeaturesList } from '@/components/page-builder/components/features/FeaturesList';
import { TestimonialsGrid } from '@/components/page-builder/components/testimonials/TestimonialsGrid';
import { TestimonialsSimple } from '@/components/page-builder/components/testimonials/TestimonialsSimple';
import { FAQAccordion } from '@/components/page-builder/components/faq/FAQAccordion';
import { CtaSimple } from '@/components/page-builder/components/cta/CtaSimple';
import { CtaSplit } from '@/components/page-builder/components/cta/CtaSplit';
import { StatsBasic } from '@/components/page-builder/components/stats/StatsBasic';
import { StatsMinimal } from '@/components/page-builder/components/stats/StatsMinimal';
import { SocialProofAvatars } from '@/components/page-builder/components/social-proof/SocialProofAvatars';
import { SocialProofLogos } from '@/components/page-builder/components/social-proof/SocialProofLogos';
import { HeaderBasic } from '@/components/page-builder/components/headers/HeaderBasic';
import { HeaderAdvanced } from '@/components/page-builder/components/headers/HeaderAdvanced';
import { FooterBasic } from '@/components/page-builder/components/footers/FooterBasic';
import { FooterAdvanced } from '@/components/page-builder/components/footers/FooterAdvanced';
import { ContactFormBuilder } from '@/components/page-builder/components/contact/ContactFormBuilder';

interface ComponentPreviewProps {
  componentType: string;
  props: Record<string, any>;
  isPreview?: boolean;
  pageSlug?: string;
}

// 组件映射表
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  // Heroes
  'hero-simple': HeroSimple,
  'hero-centered': HeroCentered,
  'hero-split': HeroCentered, // 可以复用，通过props区分
  
  // Headers
  'header-basic': HeaderBasic,
  'header-advanced': HeaderAdvanced,
  
  // Footers  
  'footer-basic': FooterBasic,
  'footer-advanced': FooterAdvanced,
  
  // Pricing
  'pricing-cards': PricingCardsBuilder,
  'pricing-cards-builder': PricingCardsBuilder,
  'pricing-table': PricingCardsBuilder,
  'pricing-toggle': PricingCardsBuilder,
  
  // Features
  'features-grid': FeaturesGrid,
  'features-list': FeaturesList,
  
  // Testimonials
  'testimonials-grid': TestimonialsGrid,
  'testimonials-simple': TestimonialsSimple,
  
  // FAQ
  'faq-accordion': FAQAccordion,
  
  // CTA
  'cta-simple': CtaSimple,
  'cta-split': CtaSplit,
  'cta-section': CtaSimple, // 向后兼容
  
  // Stats
  'stats-basic': StatsBasic,
  'stats-minimal': StatsMinimal,
  'stats-section': StatsBasic, // 向后兼容
  
  // Social Proof
  'social-proof-avatars': SocialProofAvatars,
  'social-proof-logos': SocialProofLogos,
  'integrations': SocialProofLogos,
  'how-it-works': StatsBasic,
  
  // Contact
  'contact-form-builder': ContactFormBuilder,
  'contact-form': ContactFormBuilder, // 向后兼容
};

export function ComponentPreview({ 
  componentType, 
  props, 
  isPreview = true,
  pageSlug 
}: ComponentPreviewProps) {
  const ComponentToRender = COMPONENT_MAP[componentType];

  if (!ComponentToRender) {
    return (
      <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <div className="text-muted-foreground">
          <div className="text-lg font-medium mb-2">Unknown component type</div>
          <div className="text-sm">Component type: {componentType}</div>
          <div className="text-xs mt-2 text-red-500">
            Please check component mapping configuration
          </div>
        </div>
      </div>
    );
  }

  // 预览模式的特殊属性
  const previewProps = isPreview ? {
    ...props,
    // 在预览模式下禁用真实的支付功能
    paymentEnabled: false,
    pageSlug: undefined,
    // 添加预览模式标识
    isPreviewMode: true,
    // 截断长文本以适应预览
    title: props.title?.length > 50 ? `${props.title.substring(0, 50)}...` : props.title,
    subtitle: props.subtitle?.length > 100 ? `${props.subtitle.substring(0, 100)}...` : props.subtitle,
  } : {
    ...props,
    pageSlug,
    paymentEnabled: !!pageSlug, // 只有在有pageSlug时才启用支付
  };

  try {
    return (
      <div className={isPreview ? "pointer-events-none" : ""}>
        <ComponentToRender {...previewProps} />
      </div>
    );
  } catch (error) {
    console.error(`Error rendering component ${componentType}:`, error);
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-600">
          <div className="text-lg font-medium mb-2">Component render error</div>
          <div className="text-sm">Component type: {componentType}</div>
          <div className="text-xs mt-2">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </div>
      </div>
    );
  }
}

// 组件缩略图预览（用于组件库）
export function ComponentThumbnail({ componentType }: { componentType: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    'hero-centered': (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded">
        <div className="text-center">
          <div className="w-full h-2 bg-blue-200 rounded mb-2"></div>
          <div className="w-3/4 h-1 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="flex gap-1 justify-center">
            <div className="w-12 h-4 bg-blue-500 rounded"></div>
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    ),
    'pricing-cards': (
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="border rounded p-1">
              <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
              <div className="w-2/3 h-1 bg-blue-200 rounded mb-1"></div>
              <div className="w-full h-2 bg-blue-500 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'features-grid': (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div className="w-full h-1 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'testimonials-grid': (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="border rounded p-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-8 h-1 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'faq-accordion': (
      <div className="p-4 space-y-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded p-1">
            <div className="flex justify-between items-center">
              <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
              <div className="w-2 h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    ),
    'cta-section': (
      <div className="bg-blue-50 p-4 rounded text-center">
        <div className="w-3/4 h-2 bg-blue-200 rounded mx-auto mb-2"></div>
        <div className="w-1/2 h-1 bg-gray-200 rounded mx-auto mb-2"></div>
        <div className="w-16 h-3 bg-blue-500 rounded mx-auto"></div>
      </div>
    ),
    'stats-section': (
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-center">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <div className="w-full h-2 bg-blue-500 rounded mb-1"></div>
              <div className="w-3/4 h-1 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    'social-proof': (
      <div className="p-4">
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="border rounded p-1 text-center">
              <div className="w-full h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-16 bg-gray-50 border rounded overflow-hidden">
      {thumbnails[componentType] || (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-xs text-gray-400">Preview</div>
        </div>
      )}
    </div>
  );
}
