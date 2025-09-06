/**
 * 页面构建器组件市场 - 统一导出
 */

// 导出所有现有组件
export { HeaderBasic } from './headers/HeaderBasic';
export { HeaderAdvanced } from './headers/HeaderAdvanced';
export { FooterBasic } from './footers/FooterBasic';
export { FooterAdvanced } from './footers/FooterAdvanced';
export { HeroSimple } from './heroes/HeroSimple';
export { HeroCentered } from './heroes/HeroCentered';
export { FeaturesGrid } from './features/FeaturesGrid';
export { FeaturesList } from './features/FeaturesList';
export { CtaSimple } from './cta/CtaSimple';
export { CtaSplit } from './cta/CtaSplit';
export { StatsBasic } from './stats/StatsBasic';
export { StatsMinimal } from './stats/StatsMinimal';
export { TestimonialsGrid } from './testimonials/TestimonialsGrid';
export { TestimonialsSimple } from './testimonials/TestimonialsSimple';
export { SocialProofAvatars } from './social-proof/SocialProofAvatars';
export { SocialProofLogos } from './social-proof/SocialProofLogos';
export { PricingCardsBuilder } from './pricing/PricingCardsBuilder';
export { FAQAccordion } from './faq/FAQAccordion';

// 导出分类索引
export * from './headers';
export * from './heroes';
export * from './footers';
export * from './features';
export * from './cta';
export * from './testimonials';
export * from './social-proof';
export * from './pricing';
export * from './faq';

// 导出类型定义
export type {
  PropertyDefinition,
  ComponentDefinition,
  ComponentCategory,
  DraggedComponent,
  CanvasComponent,
} from './types';

// 导出注册表和工具函数
export {
  COMPONENT_CATEGORIES,
  getAllComponents,
  getComponentById,
  getComponentsByCategory,
  searchComponents,
  getComponentCategory,
} from './registry';

// 重新导出用于向后兼容
export {
  COMPONENT_CATEGORIES as COMPONENT_REGISTRY
} from './registry';
