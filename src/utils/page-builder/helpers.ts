import { PageComponent, PageLayout, ComponentSchema } from '@/types/page-builder';

/**
 * 生成唯一ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 深拷贝对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * 验证组件属性
 */
export function validateComponentProps(
  props: Record<string, any>,
  schema: ComponentSchema
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // 这里可以使用 JSON Schema 验证库进行详细验证
  // 目前先做基础验证
  
  if (!props || typeof props !== 'object') {
    errors.push('组件属性必须是对象类型');
    return { isValid: false, errors };
  }
  
  // 检查必需属性
  const requiredProps = schema.propSchema.required || [];
  for (const requiredProp of requiredProps) {
    if (!(requiredProp in props)) {
      errors.push(`缺少必需属性: ${requiredProp}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 格式化时间
 */
export function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return '刚刚';
  }
}

/**
 * 获取组件在布局中的索引
 */
export function getComponentIndex(layout: PageLayout, componentId: string): number {
  return layout.components.findIndex(comp => comp.id === componentId);
}

/**
 * 获取组件的下一个位置
 */
export function getNextPosition(layout: PageLayout): number {
  return layout.components.length;
}

/**
 * 检查组件是否可以移动到指定位置
 */
export function canMoveComponent(
  layout: PageLayout,
  componentId: string,
  targetPosition: number
): boolean {
  const currentIndex = getComponentIndex(layout, componentId);
  if (currentIndex === -1) return false;
  
  return targetPosition >= 0 && targetPosition < layout.components.length;
}

/**
 * 获取组件的显示名称
 */
export function getComponentDisplayName(component: PageComponent): string {
  // 可以根据组件类型返回更友好的显示名称
  const displayNames: Record<string, string> = {
    'hero-simple': '简洁英雄区域',
    'hero-centered': '居中英雄区域',
    'features-grid': '功能网格',
    'features-list': '功能列表',
    'stats-minimal': '简洁统计',
    'stats-basic': '基础统计',
    'testimonials-simple': '简洁评价',
    'testimonials-grid': '评价网格',
    'social-proof-avatars': '用户头像',
    'social-proof-logos': '合作伙伴',
    'cta-simple': '简洁CTA',
    'cta-centered': '居中CTA',
    'header-basic': '基础头部',
    'footer-basic': '基础底部',
  };
  
  return displayNames[component.type] || component.type;
}

/**
 * 计算布局的统计信息
 */
export function calculateLayoutStats(layout: PageLayout) {
  const componentTypes = layout.components.map(comp => comp.type);
  const uniqueTypes = [...new Set(componentTypes)];
  
  const typeCount: Record<string, number> = {};
  componentTypes.forEach(type => {
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  
  return {
    totalComponents: layout.components.length,
    uniqueTypes: uniqueTypes.length,
    typeCount,
    lastUpdated: layout.updatedAt,
    createdAt: layout.createdAt,
  };
}

/**
 * 生成组件预览HTML
 */
export function generateComponentPreviewHtml(component: PageComponent): string {
  // 这里可以根据组件类型生成预览HTML
  // 目前返回基础的预览结构
  return `
    <div class="component-preview" data-component-type="${component.type}">
      <div class="component-content">
        ${getComponentDisplayName(component)}
      </div>
    </div>
  `;
}

/**
 * 检查布局是否为空
 */
export function isLayoutEmpty(layout: PageLayout | null): boolean {
  return !layout || layout.components.length === 0;
}

/**
 * 获取组件的默认样式类
 */
export function getComponentDefaultClasses(componentType: string): string {
  const defaultClasses: Record<string, string> = {
    'hero-simple': 'py-20 bg-background',
    'hero-centered': 'py-32 bg-gradient-to-br from-primary/5 to-secondary/5',
    'features-grid': 'py-16 bg-background',
    'features-list': 'py-16 bg-muted/50',
    'stats-minimal': 'py-12 bg-background',
    'stats-basic': 'py-16 bg-primary text-primary-foreground',
    'testimonials-simple': 'py-16 bg-muted/30',
    'testimonials-grid': 'py-20 bg-background',
    'social-proof-avatars': 'py-8 bg-background',
    'social-proof-logos': 'py-12 bg-muted/20',
    'cta-simple': 'py-16 bg-primary text-primary-foreground',
    'cta-centered': 'py-20 bg-gradient-to-r from-primary to-secondary text-white',
  };
  
  return defaultClasses[componentType] || 'py-8 bg-background';
}

/**
 * 生成缩略图URL
 */
export function generateThumbnailUrl(layout: PageLayout): string {
  // 这里可以实现缩略图生成逻辑
  // 目前返回占位符
  return `/api/thumbnails/${layout.id}`;
}

/**
 * 验证布局数据
 */
export function validateLayout(layout: any): layout is PageLayout {
  if (!layout || typeof layout !== 'object') {
    return false;
  }
  
  const requiredFields = ['id', 'name', 'components', 'metadata', 'createdAt', 'updatedAt'];
  for (const field of requiredFields) {
    if (!(field in layout)) {
      return false;
    }
  }
  
  if (!Array.isArray(layout.components)) {
    return false;
  }
  
  return true;
}

/**
 * 清理组件属性（移除undefined值）
 */
export function cleanComponentProps(props: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        cleaned[key] = cleanComponentProps(value);
      } else {
        cleaned[key] = value;
      }
    }
  }
  
  return cleaned;
}