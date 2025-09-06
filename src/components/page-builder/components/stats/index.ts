/**
 * 统计数据组件导出
 */

export { StatsBasic } from './StatsBasic';
export { StatsMinimal } from './StatsMinimal';

// 导出该分类的组件列表
export const STATS_COMPONENT_IDS = [
  'stats-basic',
  'stats-minimal',
] as const;

export type StatsComponentId = typeof STATS_COMPONENT_IDS[number];