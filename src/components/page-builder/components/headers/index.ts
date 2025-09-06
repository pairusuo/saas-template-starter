/**
 * 头部组件导出
 */

export { HeaderBasic } from './HeaderBasic';
export { HeaderAdvanced } from './HeaderAdvanced';

// 导出该分类的组件列表（用于动态加载）
export const HEADER_COMPONENT_IDS = [
  'header-basic',
  'header-advanced',
] as const;

export type HeaderComponentId = typeof HEADER_COMPONENT_IDS[number];
