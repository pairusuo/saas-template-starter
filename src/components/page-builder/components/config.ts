/**
 * 组件市场配置
 */

export const MARKETPLACE_CONFIG = {
  // 市场基本信息
  name: 'SaaS Template 组件市场',
  description: '专业的 Landing Page 组件库',
  version: '1.0.0',

  // 组件展示配置
  display: {
    itemsPerPage: 12,
    defaultView: 'grid', // 'grid' | 'list'
    showPreview: true,
    showCode: true,
    showProps: true,
  },

  // 分类配置
  categories: {
    showEmpty: false, // 是否显示空分类
    defaultExpanded: ['headers', 'heroes', 'features'], // 默认展开的分类
  },

  // 搜索配置
  search: {
    placeholder: '搜索组件...',
    minLength: 2,
    debounceMs: 300,
    includeDescription: true,
    includeTags: true,
  },

  // 过滤器配置
  filters: {
    available: [
      {
        key: 'category',
        label: '分类',
        type: 'select',
      },
      {
        key: 'tags',
        label: '标签',
        type: 'multiSelect',
      },
      {
        key: 'responsive',
        label: '响应式',
        type: 'boolean',
      },
      {
        key: 'i18n',
        label: '国际化',
        type: 'boolean',
      },
      {
        key: 'isPro',
        label: 'Pro版本',
        type: 'boolean',
      },
    ],
  },

  // 组件拖拽配置
  dragDrop: {
    dragType: 'component',
    ghostOpacity: 0.5,
    dropZoneHighlight: 'border-primary',
    previewScale: 0.8,
  },

  // 预览配置
  preview: {
    defaultSize: 'medium',
    availableSizes: ['small', 'medium', 'large'],
    showDeviceFrames: true,
    devices: ['desktop', 'tablet', 'mobile'],
  },

  // 代码生成配置
  codeGeneration: {
    indentation: 2,
    includeImports: true,
    includeProps: true,
    includeComments: true,
    exportStyle: 'named', // 'named' | 'default'
  },

  // 文档配置
  docs: {
    showUsageExamples: true,
    showApiReference: true,
    showDesignTokens: true,
    showAccessibility: true,
  },

  // 性能配置
  performance: {
    lazyLoadComponents: true,
    lazyLoadPreviews: true,
    cacheComponents: true,
    maxCacheSize: 50,
  },

  // 开发模式配置
  development: {
    showDebugInfo: false,
    enableHotReload: true,
    showRenderTimes: false,
  },
} as const;

export type MarketplaceConfig = typeof MARKETPLACE_CONFIG;
