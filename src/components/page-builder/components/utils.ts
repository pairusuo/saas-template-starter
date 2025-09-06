/**
 * 组件市场工具函数
 */

import { ComponentDefinition, ComponentCategory } from './types';
import { COMPONENT_CATEGORIES } from './registry';

/**
 * 验证组件定义的完整性
 */
export function validateComponentDefinition(component: ComponentDefinition): boolean {
  const required = ['id', 'name', 'category', 'description', 'component'];
  return required.every(field => component[field as keyof ComponentDefinition]);
}

/**
 * 获取组件的预览信息
 */
export function getComponentPreview(componentId: string) {
  const component = getComponentById(componentId);
  if (!component) return null;

  return {
    id: component.id,
    name: component.name,
    description: component.description,
    thumbnail: component.thumbnail,
    category: component.category,
    tags: component.tags,
    isPro: component.isPro || false,
  };
}

/**
 * 根据标签筛选组件
 */
export function getComponentsByTags(tags: string[]): ComponentDefinition[] {
  return getAllComponents().filter(component =>
    tags.some(tag => 
      component.tags.some(componentTag => 
        componentTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

/**
 * 获取热门组件（基于使用频率或推荐）
 */
export function getPopularComponents(limit: number = 6): ComponentDefinition[] {
  // 这里可以根据实际使用数据来排序
  // 目前返回一些推荐的组件
  const popularIds = [
    'header-basic',
    'hero-simple', 
    'features-grid-builder',
    'pricing-cards-builder',
    'hero-centered',
    'footer-basic'
  ];
  
  return popularIds
    .map(id => getComponentById(id))
    .filter(Boolean)
    .slice(0, limit) as ComponentDefinition[];
}

/**
 * 获取新增组件
 */
export function getNewComponents(limit: number = 4): ComponentDefinition[] {
  // 这里可以根据组件添加时间来排序
  // 目前返回最近添加的组件
  return getAllComponents()
    .slice(-limit)
    .reverse();
}

/**
 * 获取组件的兼容性信息
 */
export function getComponentCompatibility(componentId: string) {
  const component = getComponentById(componentId);
  if (!component) return null;

  return {
    responsive: true, // 大部分组件都支持响应式
    darkMode: true,   // 支持暗色模式
    i18n: !!component.i18nNamespace, // 是否支持国际化
    accessibility: true, // 可访问性支持
  };
}

/**
 * 获取组件的使用示例
 */
export function getComponentUsageExample(componentId: string): string {
  const component = getComponentById(componentId);
  if (!component) return '';

  const props = Object.entries(component.defaultProps)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .join('\n  ');

  return `<${component.component.displayName || component.name}
  ${props}
/>`;
}

/**
 * 生成组件的导入语句
 */
export function generateComponentImport(componentId: string): string {
  const component = getComponentById(componentId);
  if (!component) return '';

  const componentName = component.component.displayName || component.name;
  return `import { ${componentName} } from '@/components/page-builder/components';`;
}

/**
 * 获取组件的依赖信息
 */
export function getComponentDependencies(componentId: string): string[] {
  const component = getComponentById(componentId);
  if (!component) return [];

  // 这里可以分析组件的依赖关系
  // 目前返回一些通用依赖
  const baseDependencies = [
    '@/components/ui/button',
    '@/components/ui/card',
    '@/lib/utils',
  ];

  // 根据组件类型添加特定依赖
  if (component.category === 'pricing') {
    baseDependencies.push('@/components/ui/switch', '@/components/ui/badge');
  }

  if (component.i18nNamespace) {
    baseDependencies.push('next-intl');
  }

  return baseDependencies;
}

/**
 * 导入必要的工具函数
 */
function getAllComponents(): ComponentDefinition[] {
  return COMPONENT_CATEGORIES.flatMap(category => category.components);
}

function getComponentById(id: string): ComponentDefinition | undefined {
  return getAllComponents().find(component => component.id === id);
}
