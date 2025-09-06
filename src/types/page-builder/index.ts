import { JSONSchema7 } from 'json-schema';

/**
 * 页面组件定义
 */
export interface PageComponent {
  /** 组件唯一标识 */
  id: string;
  /** 组件类型 */
  type: ComponentType;
  /** 组件属性配置 */
  props: Record<string, any>;
  /** 组件在页面中的位置 */
  position: number;
  /** 组件位置类型 */
  positionType?: 'top' | 'bottom' | 'flexible';
  /** 子组件（用于嵌套组件） */
  children?: PageComponent[];
  /** 组件创建时间 */
  createdAt: Date;
  /** 组件更新时间 */
  updatedAt: Date;
}

/**
 * 页面布局定义
 */
export interface PageLayout {
  /** 布局唯一标识 */
  id: string;
  /** 页面名称 */
  name: string;
  /** 页面描述 */
  description: string;
  /** 页面组件列表 */
  components: PageComponent[];
  /** 页面元数据 */
  metadata: PageMetadata;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

/**
 * 页面元数据
 */
export interface PageMetadata {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description: string;
  /** 页面关键词 */
  keywords: string[];
  /** 页面语言 */
  locale: string;
  /** 页面作者 */
  author?: string;
  /** 页面缩略图 */
  thumbnail?: string;
  /** 页面标签 */
  tags: string[];
}

/**
 * 组件配置模式
 */
export interface ComponentSchema {
  /** 组件类型标识 */
  type: string;
  /** 组件显示名称 */
  name: string;
  /** 组件显示名称（别名，用于向后兼容） */
  displayName: string;
  /** 组件描述 */
  description: string;
  /** 组件分类 */
  category: ComponentCategory;
  /** 组件图标 */
  icon: string;
  /** 默认属性配置 */
  defaultProps: Record<string, any>;
  /** 属性配置模式 */
  propSchema: JSONSchema7;
  /** 组件预览图片 */
  preview: string;
  /** 组件缩略图（别名，用于向后兼容） */
  thumbnail?: string;
  /** 组件标签 */
  tags: string[];
  /** 是否为高级组件 */
  isAdvanced?: boolean;
  /** 组件版本 */
  version: string;
  /** 组件固定位置类型 */
  positionType?: 'top' | 'bottom' | 'flexible';
}

/**
 * 构建器状态
 */
export interface BuilderState {
  /** 当前编辑的页面布局 */
  currentLayout: PageLayout | null;
  /** 当前选中的组件ID */
  selectedComponent: string | null;
  /** 当前拖拽的组件 */
  draggedComponent: ComponentSchema | null;
  /** 预览模式 */
  previewMode: PreviewMode;
  /** 是否处于预览状态 */
  isPreviewMode: boolean;
  /** 是否显示组件边框 */
  showComponentBorders: boolean;
  /** 是否自动保存 */
  autoSave: boolean;
  /** 是否显示左侧组件面板 */
  showComponentPanel: boolean;
  /** 是否显示右侧属性面板 */
  showPropertiesPanel: boolean;
}

/**
 * 组件类型枚举
 */
export type ComponentType = 
  // Hero 组件
  | 'hero-simple' 
  | 'hero-centered'
  // Features 组件
  | 'features-grid'
  | 'features-list'
  // Stats 组件
  | 'stats-minimal'
  | 'stats-basic'
  // Testimonials 组件
  | 'testimonials-simple'
  | 'testimonials-grid'
  // Social Proof 组件
  | 'social-proof-avatars'
  | 'social-proof-logos'
  // CTA 组件
  | 'cta-simple'
  | 'cta-split'
  // Pricing 组件
  | 'pricing-cards'
  // FAQ 组件
  | 'faq-accordion'
  // Layout 组件
  | 'header-basic'
  | 'footer-basic'
  // Site Controls 组件
  | 'site-control-pill-dock'
  | 'site-control-gear-popover'
  | 'site-control-inline-bar';

/**
 * 组件分类枚举
 */
export type ComponentCategory = 
  | 'hero'      // 英雄区域
  | 'features'  // 功能特性
  | 'stats'     // 数据统计
  | 'testimonials' // 用户评价
  | 'social-proof' // 社会证明
  | 'cta'       // 行动号召
  | 'pricing'   // 定价
  | 'faq'       // 常见问题
  | 'layout'    // 布局组件
  | 'site-control'; // 全局站点控件

/**
 * 预览模式枚举
 */
export type PreviewMode = 'desktop' | 'tablet' | 'mobile';

/**
 * 拖拽数据类型
 */
export interface DragData {
  /** 拖拽类型 */
  type: 'component' | 'existing';
  /** 组件配置模式（新组件） */
  schema?: ComponentSchema;
  /** 组件ID（现有组件） */
  componentId?: string;
  /** 拖拽源位置 */
  sourceIndex?: number;
}

/**
 * 组件操作类型
 */
export type ComponentAction = 
  | 'add'       // 添加组件
  | 'remove'    // 删除组件
  | 'update'    // 更新组件
  | 'move'      // 移动组件
  | 'copy'      // 复制组件
  | 'paste'     // 粘贴组件
  | 'load'      // 加载布局
  | 'clear';    // 清空画布

/**
 * 模板定义
 */
export interface PageTemplate {
  /** 模板ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板描述 */
  description: string;
  /** 模板分类 */
  category: string;
  /** 模板标签 */
  tags: string[];
  /** 模板布局 */
  layout: PageLayout;
  /** 模板缩略图 */
  thumbnail: string;
  /** 是否为官方模板 */
  isOfficial: boolean;
  /** 模板作者 */
  author: string;
  /** 使用次数 */
  usageCount: number;
  /** 模板评分 */
  rating: number;
  /** 创建时间 */
  createdAt: Date;
  /** 更新时间 */
  updatedAt: Date;
}

/**
 * 代码生成选项
 */
export interface CodeGenerationOptions {
  /** 是否包含TypeScript类型 */
  includeTypes: boolean;
  /** 是否包含样式文件 */
  includeStyles: boolean;
  /** 是否包含翻译文件 */
  includeTranslations: boolean;
  /** 代码格式化选项 */
  formatting: {
    /** 缩进大小 */
    indentSize: number;
    /** 是否使用分号 */
    useSemicolons: boolean;
    /** 引号类型 */
    quoteStyle: 'single' | 'double';
  };
  /** 导出格式 */
  exportFormat: 'zip' | 'files';
}

/**
 * 导出结果
 */
export interface ExportResult {
  /** 生成的文件列表 */
  files: GeneratedFile[];
  /** 生成的代码统计 */
  stats: {
    /** 文件数量 */
    fileCount: number;
    /** 代码行数 */
    lineCount: number;
    /** 组件数量 */
    componentCount: number;
  };
}

/**
 * 生成的文件
 */
export interface GeneratedFile {
  /** 文件路径 */
  path: string;
  /** 文件内容 */
  content: string;
  /** 文件类型 */
  type: 'tsx' | 'ts' | 'json' | 'css' | 'md';
}