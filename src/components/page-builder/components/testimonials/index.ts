/**
 * 用户评价组件导出
 */

export { TestimonialsGrid } from './TestimonialsGrid';
export { TestimonialsSimple } from './TestimonialsSimple';

// 导出该分类的组件列表
export const TESTIMONIALS_COMPONENT_IDS = [
  'testimonials-grid',
  'testimonials-simple',
] as const;

export type TestimonialsComponentId = typeof TESTIMONIALS_COMPONENT_IDS[number];