/**
 * 功能特性组件导出
 */

export { FeaturesGrid } from './FeaturesGrid';
export { FeaturesList } from './FeaturesList';

// 导出该分类的组件列表
export const FEATURES_COMPONENT_IDS = [
  'features-grid',
  'features-list',
] as const;

export type FeaturesComponentId = typeof FEATURES_COMPONENT_IDS[number];
