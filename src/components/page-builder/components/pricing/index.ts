/**
 * 定价组件导出
 */

export { PricingCardsBuilder } from './PricingCardsBuilder';

// 导出该分类的组件列表
export const PRICING_COMPONENT_IDS = [
  'pricing-cards-builder',
] as const;

export type PricingComponentId = typeof PRICING_COMPONENT_IDS[number];
