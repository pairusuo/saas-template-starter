/**
 * CTA行动召唤组件导出
 */

export { CtaSimple } from './CtaSimple';
export { CtaSplit } from './CtaSplit';

// 导出该分类的组件列表
export const CTA_COMPONENT_IDS = [
  'cta-simple',
  'cta-split',
] as const;

export type CtaComponentId = typeof CTA_COMPONENT_IDS[number];