import { ComponentSchema } from '@/types/page-builder';

/**
 * Hero 组件配置
 */
export const heroConfigs: ComponentSchema[] = [
  {
    type: 'hero-simple',
    name: 'hero-simple',
    displayName: '',
    description: '',
    category: 'hero',
    icon: '🏠',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzM3NDE1MSIvPgo8cmVjdCB4PSIyMCIgeT0iMTAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjIwIiB5PSIxNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzM3MzNGRiIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzM3NDE1MSIvPgo8cmVjdCB4PSIyMCIgeT0iMTAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjIwIiB5PSIxNDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzM3MzNGRiIvPgo8L3N2Zz4K',
    tags: ['hero', 'landing', 'simple'],
    version: '1.0.0',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
    },
    propSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '主标题',
          description: '英雄区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: '英雄区域的副标题文本',
        },
        primaryButtonText: {
          type: 'string',
          title: '主按钮文本',
          description: '主要行动按钮的文本',
        },
        secondaryButtonText: {
          type: 'string',
          title: '次按钮文本',
          description: '次要行动按钮的文本',
        },
        showSecondaryButton: {
          type: 'boolean',
          title: '显示次按钮',
          description: '是否显示次要行动按钮',
        },
      },
      required: ['title', 'subtitle', 'primaryButtonText'],
    },
  },
  {
    type: 'hero-centered',
    name: 'hero-centered',
    displayName: '',
    description: '',
    category: 'hero',
    icon: '🎯',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRUY5QzMiLz4KPHJlY3QgeD0iNTAiIHk9IjYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjUwIiB5PSIxMTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMTEwIiB5PSIxNTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzM3MzNGRiIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRUY5QzMiLz4KPHJlY3QgeD0iNTAiIHk9IjYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjUwIiB5PSIxMTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMTEwIiB5PSIxNTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzM3MzNGRiIvPgo8L3N2Zz4K',
    tags: ['hero', 'landing', 'centered'],
    version: '1.0.0',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
    },
    propSchema: {
      type: 'object',
      properties: {
        badge: {
          type: 'string',
          title: '徽章文本',
          description: '顶部徽章的文本内容',
        },
        title: {
          type: 'string',
          title: '主标题',
          description: '英雄区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: '英雄区域的副标题文本',
        },
        primaryButtonText: {
          type: 'string',
          title: '主按钮文本',
          description: '主要行动按钮的文本',
        },
        secondaryButtonText: {
          type: 'string',
          title: '次按钮文本',
          description: '次要行动按钮的文本',
        },
      },
      required: ['title', 'subtitle', 'primaryButtonText'],
    },
  },
];

/**
 * Site Controls 组件配置
 */
export const siteControlConfigs: ComponentSchema[] = [
  {
    type: 'site-control-pill-dock',
    name: 'site-control-pill-dock',
    displayName: '',
    description: '右上/右下浮动胶囊，包含语言与主题切换',
    category: 'site-control',
    icon: '⚙️',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjYwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNFMkU4RjAiIG9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iMzAiIHI9IjgiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjMwIiByPSI4IiBmaWxsPSIjRkZGIi8+PC9zdmc+',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjYwIiB5PSIxMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNFMkU4RjAiIG9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iMzAiIHI9IjgiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjMwIiByPSI4IiBmaWxsPSIjRkZGIi8+PC9zdmc+',
    tags: ['SiteControl','pill','dock','locale','theme'],
    version: '1.0.0',
    defaultProps: {
      position: 'top-right',
      variant: 'pill',
    },
    propSchema: {
      type: 'object',
      properties: {
        position: {
          type: 'string',
          title: '位置',
          description: '控件在页面中的停靠位置',
          enum: ['top-right','bottom-right'],
        },
        variant: {
          type: 'string',
          title: '样式',
          description: '控件的展示样式',
          enum: ['pill'],
        },
      },
      required: ['position','variant'],
    },
  },
  {
    type: 'site-control-gear-popover',
    name: 'site-control-gear-popover',
    displayName: '',
    description: '齿轮按钮，点击弹出设置卡片（语言与主题）',
    category: 'site-control',
    icon: '⚙️',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIgZmlsbD0iI0UyRThGMCIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iOCIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIgZmlsbD0iI0UyRThGMCIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iOCIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==',
    tags: ['SiteControl','gear','popover','locale','theme'],
    version: '1.0.0',
    defaultProps: {
      align: 'right',
    },
    propSchema: {
      type: 'object',
      properties: {
        align: {
          type: 'string',
          title: '对齐',
          description: '弹出内容对齐方向',
          enum: ['left','right'],
        },
      },
      required: ['align'],
    },
  },
  {
    type: 'site-control-inline-bar',
    name: 'site-control-inline-bar',
    displayName: '',
    description: '内联条形控件，适合头部或内容区',
    category: 'site-control',
    icon: '🧭',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTgwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjIwIiB5PSIxMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0UyRThGMCIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNDAiIGN5PSIyMCIgcj0iNyIgZmlsbD0iI0ZGRiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMjAiIHI9IjciIGZpbGw9IiNGRkYiLz48L3N2Zz4=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTgwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjIwIiB5PSIxMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0UyRThGMCIgb3BhY2l0eT0iMC41Ii8+PGNpcmNsZSBjeD0iNDAiIGN5PSIyMCIgcj0iNyIgZmlsbD0iI0ZGRiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMjAiIHI9IjciIGZpbGw9IiNGRkYiLz48L3N2Zz4=',
    tags: ['SiteControl','inline','bar','locale','theme'],
    version: '1.0.0',
    defaultProps: {
      size: 'sm',
      showLocale: true,
      showTheme: true,
    },
    propSchema: {
      type: 'object',
      properties: {
        size: {
          type: 'string',
          title: '尺寸',
          description: '控件尺寸',
          enum: ['sm','md'],
        },
        showLocale: {
          type: 'boolean',
          title: '显示语言切换',
          description: '是否显示语言切换',
        },
        showTheme: {
          type: 'boolean',
          title: '显示主题切换',
          description: '是否显示主题切换',
        },
      },
      required: ['size'],
    },
  },
];

/**
 * Layout 组件配置 - Header组件
 */
export const headerConfigs: ComponentSchema[] = [
  {
    type: 'header-basic',
    name: 'header-basic',
    displayName: '',
    description: '',
    category: 'layout',
    icon: '🔝',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzczM0ZGIi8+CjxyZWN0IHg9IjE0MCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIyMDAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMjYwIiB5PSMzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjwvc3ZnPgo=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMzAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzczM0ZGIi8+CjxyZWN0IHg9IjE0MCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIyMDAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMjYwIiB5PSMzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjwvc3ZnPgo=',
    tags: ['layout', 'header', 'navigation'],
    version: '1.0.0',
    positionType: 'top',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
    },
    propSchema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          title: 'Logo文本',
          description: '网站Logo文本',
        },
        navigation: {
          type: 'array',
          title: '导航菜单',
          description: '导航菜单项配置',
        },
        showCTA: {
          type: 'boolean',
          title: '显示CTA按钮',
          description: '是否显示行动号召按钮',
        },
        ctaText: {
          type: 'string',
          title: 'CTA按钮文本',
          description: '行动号召按钮的文本',
        },
      },
      required: ['logo'],
    },
  },
];

/**
 * Features 组件配置
 */
export const featuresConfigs: ComponentSchema[] = [
  {
    type: 'features-grid',
    name: 'features-grid',
    displayName: '',
    description: '',
    category: 'features',
    icon: '⭐',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNjAiIHk9IjIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTYwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNjAiIHk9IjIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTYwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    tags: ['features', 'grid', 'showcase'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    type: 'features-list',
    name: 'features-list',
    displayName: '',
    description: '',
    category: 'features',
    icon: '📋',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMCIgeT0iODAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMjAiIHk9IjE0MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMCIgeT0iODAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMjAiIHk9IjE0MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
    tags: ['features', 'list', 'showcase'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Stats 组件配置
 */
export const statsConfigs: ComponentSchema[] = [
  {
    type: 'stats-minimal',
    name: 'stats-minimal',
    displayName: '',
    description: '',
    category: 'stats',
    icon: '📊',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMjYwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMjYwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=',
    tags: ['stats', 'minimal', 'data'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    type: 'stats-basic',
    name: 'stats-basic',
    displayName: '',
    description: '',
    category: 'stats',
    icon: '📈',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    tags: ['stats', 'basic', 'data'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Testimonials 组件配置
 */
export const testimonialsConfigs: ComponentSchema[] = [
  {
    type: 'testimonials-simple',
    name: 'testimonials-simple',
    displayName: '',
    description: '',
    category: 'testimonials',
    icon: '💬',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjgwIiB5PSI3MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxNSIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjgwIiB5PSI3MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxNSIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    tags: ['testimonials', 'simple', 'reviews'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    type: 'testimonials-grid',
    name: 'testimonials-grid',
    displayName: '',
    description: '',
    category: 'testimonials',
    icon: '🗣️',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNjAiIHk9IjIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxNjAiIHk9IjIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==',
    tags: ['testimonials', 'grid', 'reviews'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Social Proof 组件配置
 */
export const socialProofConfigs: ComponentSchema[] = [
  {
    type: 'social-proof-avatars',
    name: 'social-proof-avatars',
    displayName: '',
    description: '',
    category: 'social-proof',
    icon: '👥',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSI1MCIgcj0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSI1MCIgcj0iMjAiIGZpbGw9IiM2QjcyODQiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    tags: ['social-proof', 'avatars', 'users'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    type: 'social-proof-logos',
    name: 'social-proof-logos',
    displayName: '',
    description: '',
    category: 'social-proof',
    icon: '🏢',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjgwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjE0MCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIyMDAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMjYwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjwvc3ZnPgo=',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjgwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjE0MCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIyMDAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2QjcyODQiLz4KPHJlY3QgeD0iMjYwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjwvc3ZnPgo=',
    tags: ['social-proof', 'logos', 'partners'],
    version: '1.0.0',
    defaultProps: {},
    propSchema: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Footer 组件配置
 */
export const footerConfigs: ComponentSchema[] = [
  {
    type: 'footer-basic',
    name: 'footer-basic',
    displayName: '',
    description: '',
    category: 'layout',
    icon: '🔻',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0Q5RDlEOSIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTUiIGZpbGw9IiNEOUQ5RDkiLz4KPHJlY3QgeD0iMjQwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRDlEOUQ5Ii8+CjxyZWN0IHg9IjIwIiB5PSI2MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIxIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjIwIiB5PSI4MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDMwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0Q5RDlEOSIvPgo8cmVjdCB4PSIxODAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTUiIGZpbGw9IiNEOUQ5RDkiLz4KPHJlY3QgeD0iMjQwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRDlEOUQ5Ii8+CjxyZWN0IHg9IjIwIiB5PSI2MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIxIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjIwIiB5PSI4MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K',
    tags: ['layout', 'footer', 'links'],
    version: '1.0.0',
    positionType: 'bottom',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
    },
    propSchema: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string',
          title: '公司名称',
          description: '公司或产品名称',
        },
        description: {
          type: 'string',
          title: '公司描述',
          description: '公司或产品的简短描述',
        },
        links: {
          type: 'array',
          title: '导航链接',
          description: '底部导航链接配置',
        },
        socialLinks: {
          type: 'array',
          title: '社交媒体链接',
          description: '社交媒体链接配置',
        },
        copyright: {
          type: 'string',
          title: '版权信息',
          description: '版权声明文本',
        },
      },
      required: ['companyName', 'copyright'],
    },
  },
];

/**
 * CTA 组件配置
 */
export const ctaConfigs: ComponentSchema[] = [
  {
    type: 'cta-simple',
    name: 'cta-simple',
    displayName: '',
    description: '',
    category: 'cta',
    icon: '🎯',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkYzNzMzIiBvcGFjaXR5PSIwLjEiLz4KPHJlY3QgeD0iNjAiIHk9IjMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNSIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGMzczMyIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkYzNzMzIiBvcGFjaXR5PSIwLjEiLz4KPHJlY3QgeD0iNjAiIHk9IjMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxNSIgZmlsbD0iIzZCNzI4NCIvPgo8cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGMzczMyIvPgo8L3N2Zz4K',
    tags: ['cta', 'simple', 'action'],
    version: '1.0.0',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
      showSecondaryButton: true,
    },
    propSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '主标题',
          description: 'CTA区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: 'CTA区域的副标题文本',
        },
        buttonText: {
          type: 'string',
          title: '主按钮文本',
          description: '主要行动按钮的文本',
        },
        buttonHref: {
          type: 'string',
          title: '主按钮链接',
          description: '主要行动按钮的链接地址',
        },
        secondaryButtonText: {
          type: 'string',
          title: '次按钮文本',
          description: '次要行动按钮的文本',
        },
        secondaryButtonHref: {
          type: 'string',
          title: '次按钮链接',
          description: '次要行动按钮的链接地址',
        },
        showSecondaryButton: {
          type: 'boolean',
          title: '显示次按钮',
          description: '是否显示次要行动按钮',
        },
      },
      required: ['title', 'subtitle', 'buttonText', 'buttonHref'],
    },
  },
  {
    type: 'cta-split',
    name: 'cta-split',
    displayName: '',
    description: '',
    category: 'cta',
    icon: '📋',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTYwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjMwIiB5PSI1NSIgd2lkdGg9IjgwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjE3MCIgeT0iODAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiMzNzMzRkYiLz4KPC9zdmc+Cg==',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTYwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjMwIiB5PSI1NSIgd2lkdGg9IjgwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxyZWN0IHg9IjE3MCIgeT0iODAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIGZpbGw9IiMzNzMzRkYiLz4KPC9zdmc+Cg==',
    tags: ['cta', 'split', 'features'],
    version: '1.0.0',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
      showSecondaryButton: true,
    },
    propSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '主标题',
          description: 'CTA区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: 'CTA区域的副标题文本',
        },
        features: {
          type: 'array',
          title: '特性列表',
          description: '特性列表配置',
          items: {
            type: 'string',
          },
        },
        buttonText: {
          type: 'string',
          title: '主按钮文本',
          description: '主要行动按钮的文本',
        },
        buttonHref: {
          type: 'string',
          title: '主按钮链接',
          description: '主要行动按钮的链接地址',
        },
        secondaryButtonText: {
          type: 'string',
          title: '次按钮文本',
          description: '次要行动按钮的文本',
        },
        secondaryButtonHref: {
          type: 'string',
          title: '次按钮链接',
          description: '次要行动按钮的链接地址',
        },
        showSecondaryButton: {
          type: 'boolean',
          title: '显示次按钮',
          description: '是否显示次要行动按钮',
        },
      },
      required: ['title', 'subtitle', 'features', 'buttonText', 'buttonHref'],
    },
  },
];

/**
 * Pricing 组件配置
 */
export const pricingConfigs: ComponentSchema[] = [
  {
    type: 'pricing-cards',
    name: 'pricing-cards',
    displayName: '',
    description: '',
    category: 'pricing',
    icon: '💰',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iMTYwIiBmaWxsPSIjMzczM0ZGIiBvcGFjaXR5PSIwLjEiLz4KPHJlY3QgeD0iMjAwIiB5PSI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIxMTAiIHk9IjIwIiB3aWR0aD0iODAiIGhlaWdodD0iMTYwIiBmaWxsPSIjMzczM0ZGIiBvcGFjaXR5PSIwLjEiLz4KPHJlY3QgeD0iMjAwIiB5PSI0MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
    tags: ['pricing', 'cards', 'plans'],
    version: '1.0.0',
    defaultProps: {
      // 移除硬编码的默认值，让组件使用国际化翻译
      showAnnualToggle: true,
      annualDiscount: 20,
    },
    propSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '主标题',
          description: '定价区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: '定价区域的副标题文本',
        },
        showAnnualToggle: {
          type: 'boolean',
          title: '显示年付切换',
          description: '是否显示月付/年付切换开关',
        },
        annualDiscount: {
          type: 'number',
          title: '年付折扣',
          description: '年付折扣百分比',
        },
        plans: {
          type: 'array',
          title: '定价计划',
          description: '定价计划配置',
        },
      },
      required: ['title', 'subtitle', 'plans'],
    },
  },
];

/**
 * FAQ 组件配置
 */
export const faqConfigs: ComponentSchema[] = [
  {
    type: 'faq-accordion',
    name: 'faq-accordion',
    displayName: '',
    description: '',
    category: 'faq',
    icon: '❓',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0MCIgeT0iODAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNDAiIHk9IjEyMCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0MCIgeT0iMTYwIiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIzMCIgeT0iNTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0MCIgeT0iODAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNDAiIHk9IjEyMCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI0MCIgeT0iMTYwIiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIzMCIgeT0iNTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K',
    tags: ['faq', 'accordion', 'questions'],
    version: '1.0.0',
    defaultProps: {
      showSearch: true,
      faqs: []
    },
    propSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '主标题',
          description: 'FAQ区域的主标题文本',
        },
        subtitle: {
          type: 'string',
          title: '副标题',
          description: 'FAQ区域的副标题文本',
        },
        showSearch: {
          type: 'boolean',
          title: '显示搜索',
          description: '是否显示搜索功能',
        },
        faqs: {
          type: 'array',
          title: '问题列表',
          description: '常见问题配置',
        },
      },
      required: ['title', 'subtitle', 'faqs'],
    },
  },
];

/**
 * 所有组件配置 - 按优先级排序
 */
export const allComponentConfigs: ComponentSchema[] = [
  // Header组件优先展示
  ...headerConfigs,
  // Hero组件
  ...heroConfigs,
  // 功能特性组件
  ...featuresConfigs,
  // 统计数据组件
  ...statsConfigs,
  // 用户评价组件
  ...testimonialsConfigs,
  // 社会证明组件
  ...socialProofConfigs,
  // CTA组件
  ...ctaConfigs,
  // Pricing组件
  ...pricingConfigs,
  // FAQ组件
  ...faqConfigs,
  // Site Controls组件
  ...siteControlConfigs,
  // Footer组件放在最下面
  ...footerConfigs,
];
