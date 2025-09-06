/**
 * 英雄区域组件导出
 */

export { HeroSimple } from './HeroSimple';
export { HeroCentered } from './HeroCentered';

// 导出该分类的组件列表
export const HERO_COMPONENT_IDS = [
  'hero-simple',
  'hero-centered',
] as const;

export type HeroComponentId = typeof HERO_COMPONENT_IDS[number];
