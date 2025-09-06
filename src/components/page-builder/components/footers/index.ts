/**
 * 页脚组件导出
 */

export { FooterBasic } from './FooterBasic';
export { FooterAdvanced } from './FooterAdvanced';

// 导出该分类的组件列表
export const FOOTER_COMPONENT_IDS = [
  'footer-basic',
  'footer-advanced',
] as const;

export type FooterComponentId = typeof FOOTER_COMPONENT_IDS[number];
