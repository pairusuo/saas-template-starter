import { ComponentSchema, ComponentType, ComponentCategory } from '@/types/page-builder';

/**
 * 组件注册表类
 * 管理所有可用的页面构建组件
 */
class ComponentRegistry {
  private components = new Map<string, ComponentSchema>();
  private categories = new Map<ComponentCategory, ComponentSchema[]>();

  /**
   * 注册组件
   */
  register(schema: ComponentSchema): void {
    // 验证组件配置
    this.validateSchema(schema);
    
    // 注册到主映射表
    this.components.set(schema.type, schema);
    
    // 注册到分类映射表
    if (!this.categories.has(schema.category)) {
      this.categories.set(schema.category, []);
    }
    
    const categoryComponents = this.categories.get(schema.category)!;
    const existingIndex = categoryComponents.findIndex(c => c.type === schema.type);
    
    if (existingIndex >= 0) {
      categoryComponents[existingIndex] = schema;
    } else {
      categoryComponents.push(schema);
    }
  }

  /**
   * 批量注册组件
   */
  registerMany(schemas: ComponentSchema[]): void {
    schemas.forEach(schema => this.register(schema));
  }

  /**
   * 获取组件配置
   */
  get(type: string): ComponentSchema | undefined {
    return this.components.get(type);
  }

  /**
   * 获取所有组件
   */
  getAll(): ComponentSchema[] {
    return Array.from(this.components.values());
  }

  /**
   * 获取所有组件（别名方法，用于向后兼容）
   */
  getAllComponents(): ComponentSchema[] {
    return this.getAll();
  }

  /**
   * 根据分类获取组件
   */
  getByCategory(category: ComponentCategory): ComponentSchema[] {
    return this.categories.get(category) || [];
  }

  /**
   * 搜索组件
   */
  search(query: string): ComponentSchema[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(component => 
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * 根据标签过滤组件
   */
  filterByTags(tags: string[]): ComponentSchema[] {
    return this.getAll().filter(component =>
      tags.some(tag => component.tags.includes(tag))
    );
  }

  /**
   * 获取所有分类
   */
  getCategories(): ComponentCategory[] {
    return Array.from(this.categories.keys());
  }

  /**
   * 获取分类显示名称
   */
  getCategoryName(category: ComponentCategory): string {
    const categoryNames: Record<ComponentCategory, string> = {
      hero: 'Hero',
      features: 'Features',
      stats: 'Statistics',
      testimonials: 'Testimonials',
      'social-proof': 'Social Proof',
      cta: 'Call to Action',
      pricing: 'Pricing',
      faq: 'FAQ',
      layout: 'Layout',
      'site-control': 'Site Controls'
    };
    
    return categoryNames[category] || category;
  }

  /**
   * 验证组件配置
   */
  private validateSchema(schema: ComponentSchema): void {
    if (!schema.type) {
      throw new Error('Component type cannot be empty');
    }
    
    if (!schema.name) {
      throw new Error('Component name cannot be empty');
    }
    
    if (!schema.category) {
      throw new Error('Component category cannot be empty');
    }
    
    if (!schema.propSchema) {
      throw new Error('Component property schema cannot be empty');
    }
    
    if (!schema.defaultProps) {
      throw new Error('Component default props cannot be empty');
    }
  }

  /**
   * 清空注册表
   */
  clear(): void {
    this.components.clear();
    this.categories.clear();
  }

  /**
   * 获取组件统计信息
   */
  getStats() {
    const stats = {
      total: this.components.size,
      byCategory: {} as Record<ComponentCategory, number>
    };
    
    for (const [category, components] of this.categories) {
      stats.byCategory[category] = components.length;
    }
    
    return stats;
  }
}

// 创建全局组件注册表实例
export const componentRegistry = new ComponentRegistry();

// 导出类型供其他地方使用
export type { ComponentRegistry };