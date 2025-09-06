/**
 * 统一组件注册表
 * 用于项目Landing Page和可视化构建器
 */

import React from 'react';
import { SiteControls } from '@/components/page-builder/components/site/SiteControls';
import { SiteControlsPopover } from '@/components/page-builder/components/site/SiteControlsPopover';
import { SiteControlsInlineBar } from '@/components/page-builder/components/site/SiteControlsInlineBar';
import { ComponentRegistry } from '@/types/unified-components';
// import { HeroSection } from './components/hero-section';
// import { FeaturesSection } from './components/features-section';
// import { StatsSection } from './components/stats-section';
// import { TestimonialsSection } from './components/testimonials-section';
// import { PricingSection } from './components/pricing-section';
// import { CtaSection } from './components/cta-section';
// import { FooterSection } from './components/footer-section';

// 临时组件实现
const HeroSection: React.FC = () => React.createElement('div', null, 'Hero Section Component');
const FeaturesSection: React.FC = () => React.createElement('div', null, 'Features Section Component');
const StatsSection: React.FC = () => React.createElement('div', null, 'Stats Section Component');
const TestimonialsSection: React.FC = () => React.createElement('div', null, 'Testimonials Section Component');
const PricingSection: React.FC = () => React.createElement('div', null, 'Pricing Section Component');
const CtaSection: React.FC = () => React.createElement('div', null, 'CTA Section Component');
const FooterSection: React.FC = () => React.createElement('div', null, 'Footer Section Component');

export const UNIFIED_COMPONENTS: ComponentRegistry[] = [
  // Hero 组件
  {
    id: 'hero-section',
    name: 'Hero区域',
    category: 'layout',
    description: '页面顶部的主要展示区域',
    builderConfig: {
      icon: '🏠',
      thumbnail: '/imgs/components/hero-section.jpg',
      editableProps: [
        {
          key: 'variant',
          type: 'select',
          label: '布局样式',
          options: [
            { label: '居中', value: 'centered' },
            { label: '左对齐', value: 'left' },
            { label: '分栏', value: 'split' }
          ],
          defaultValue: 'centered'
        },
        {
          key: 'showCTA',
          type: 'boolean',
          label: '显示行动按钮',
          defaultValue: true
        },
        {
          key: 'customTitle',
          type: 'text',
          label: '自定义标题',
          description: '留空使用默认翻译'
        },
        {
          key: 'customSubtitle',
          type: 'textarea',
          label: '自定义副标题',
          description: '留空使用默认翻译'
        }
      ],
      defaultProps: {
        variant: 'centered',
        showCTA: true
      }
    },
    i18nConfig: {
      namespace: 'hero',
      defaultKeys: ['title', 'subtitle', 'ctaText', 'secondaryCTA']
    },
    component: HeroSection
  },

  // Features 组件
  {
    id: 'features-section',
    name: '功能特性',
    category: 'content',
    description: '展示产品核心功能和特性',
    builderConfig: {
      icon: '⭐',
      thumbnail: '/imgs/components/features-section.jpg',
      editableProps: [
        {
          key: 'layout',
          type: 'select',
          label: '布局方式',
          options: [
            { label: '网格', value: 'grid' },
            { label: '列表', value: 'list' },
            { label: '卡片', value: 'cards' }
          ],
          defaultValue: 'grid'
        },
        {
          key: 'columns',
          type: 'select',
          label: '列数',
          options: [
            { label: '2列', value: 2 },
            { label: '3列', value: 3 },
            { label: '4列', value: 4 }
          ],
          defaultValue: 3
        },
        {
          key: 'showIcons',
          type: 'boolean',
          label: '显示图标',
          defaultValue: true
        }
      ],
      defaultProps: {
        layout: 'grid',
        columns: 3,
        showIcons: true
      }
    },
    i18nConfig: {
      namespace: 'features',
      defaultKeys: ['title', 'subtitle', 'features']
    },
    component: FeaturesSection
  },

  // Stats 组件
  {
    id: 'stats-section',
    name: '数据统计',
    category: 'content',
    description: '展示关键数据和统计信息',
    builderConfig: {
      icon: '📊',
      thumbnail: '/imgs/components/stats-section.jpg',
      editableProps: [
        {
          key: 'variant',
          type: 'select',
          label: '显示样式',
          options: [
            { label: '简洁', value: 'simple' },
            { label: '卡片', value: 'cards' },
            { label: '彩色', value: 'colored' }
          ],
          defaultValue: 'simple'
        },
        {
          key: 'showIcons',
          type: 'boolean',
          label: '显示图标',
          defaultValue: true
        }
      ],
      defaultProps: {
        variant: 'simple',
        showIcons: true
      }
    },
    i18nConfig: {
      namespace: 'stats',
      defaultKeys: ['title', 'subtitle', 'stats']
    },
    component: StatsSection
  },

  // Testimonials 组件  
  {
    id: 'testimonials-section',
    name: '用户评价',
    category: 'social',
    description: '展示用户反馈和评价',
    builderConfig: {
      icon: '💬',
      thumbnail: '/imgs/components/testimonials-section.jpg',
      editableProps: [
        {
          key: 'layout',
          type: 'select',
          label: '布局方式',
          options: [
            { label: '网格', value: 'grid' },
            { label: '轮播', value: 'carousel' },
            { label: '马赛克', value: 'masonry' }
          ],
          defaultValue: 'grid'
        },
        {
          key: 'showAvatars',
          type: 'boolean',
          label: '显示头像',
          defaultValue: true
        },
        {
          key: 'showRating',
          type: 'boolean',
          label: '显示评分',
          defaultValue: true
        }
      ],
      defaultProps: {
        layout: 'grid',
        showAvatars: true,
        showRating: true
      }
    },
    i18nConfig: {
      namespace: 'testimonials',
      defaultKeys: ['title', 'subtitle', 'testimonials']
    },
    component: TestimonialsSection
  },

  // Pricing 组件
  {
    id: 'pricing-section',
    name: '定价方案',
    category: 'conversion',
    description: '展示产品定价和套餐',
    builderConfig: {
      icon: '💰',
      thumbnail: '/imgs/components/pricing-section.jpg',
      editableProps: [
        {
          key: 'variant',
          type: 'select',
          label: '显示方式',
          options: [
            { label: '卡片', value: 'cards' },
            { label: '表格', value: 'table' },
            { label: '对比', value: 'comparison' }
          ],
          defaultValue: 'cards'
        },
        {
          key: 'showAnnualToggle',
          type: 'boolean',
          label: '年付切换',
          defaultValue: true
        },
        {
          key: 'highlightPopular',
          type: 'boolean',
          label: '突出热门',
          defaultValue: true
        }
      ],
      defaultProps: {
        variant: 'cards',
        showAnnualToggle: true,
        highlightPopular: true
      }
    },
    i18nConfig: {
      namespace: 'pricing',
      defaultKeys: ['title', 'subtitle', 'plans', 'billing']
    },
    component: PricingSection
  },

  // CTA 组件
  {
    id: 'cta-section',
    name: '行动召唤',
    category: 'conversion',
    description: '引导用户采取行动的区域',
    builderConfig: {
      icon: '🎯',
      thumbnail: '/imgs/components/cta-section.jpg',
      editableProps: [
        {
          key: 'variant',
          type: 'select',
          label: '布局样式',
          options: [
            { label: '简洁', value: 'simple' },
            { label: '分栏', value: 'split' },
            { label: '全宽', value: 'fullwidth' }
          ],
          defaultValue: 'simple'
        },
        {
          key: 'showSecondaryAction',
          type: 'boolean',
          label: '显示次要按钮',
          defaultValue: true
        },
        {
          key: 'backgroundVariant',
          type: 'select',
          label: '背景样式',
          options: [
            { label: '渐变', value: 'gradient' },
            { label: '纯色', value: 'solid' },
            { label: '图片', value: 'image' }
          ],
          defaultValue: 'gradient'
        }
      ],
      defaultProps: {
        variant: 'simple',
        showSecondaryAction: true,
        backgroundVariant: 'gradient'
      }
    },
    i18nConfig: {
      namespace: 'cta',
      defaultKeys: ['title', 'subtitle', 'primaryButton', 'secondaryButton']
    },
    component: CtaSection
  },

  // Footer 组件
  {
    id: 'footer-section',
    name: '页脚',
    category: 'layout',
    description: '页面底部信息区域',
    builderConfig: {
      icon: '🔻',
      thumbnail: '/imgs/components/footer-section.jpg',
      editableProps: [
        {
          key: 'variant',
          type: 'select',
          label: '布局样式',
          options: [
            { label: '简洁', value: 'simple' },
            { label: '丰富', value: 'rich' },
            { label: '极简', value: 'minimal' }
          ],
          defaultValue: 'rich'
        },
        {
          key: 'showSocial',
          type: 'boolean',
          label: '显示社交媒体',
          defaultValue: true
        },
        {
          key: 'showNewsletter',
          type: 'boolean',
          label: '显示邮件订阅',
          defaultValue: false
        }
      ],
      defaultProps: {
        variant: 'rich',
        showSocial: true,
        showNewsletter: false
      }
    },
    i18nConfig: {
      namespace: 'footer',
      defaultKeys: ['description', 'links', 'copyright', 'social']
    },
    component: FooterSection
  }
  ,
  // SiteControl 组件
  {
    id: 'site-control-pill-dock',
    name: 'SiteControl Pill Dock',
    category: 'site-control',
    description: '右上/右下浮动胶囊，包含语言与主题切换',
    builderConfig: {
      icon: '⚙️',
      thumbnail: '/imgs/components/site-control-pill.png',
      editableProps: [
        {
          key: 'position',
          type: 'select',
          label: '位置',
          options: [
            { label: '右上', value: 'top-right' },
            { label: '右下', value: 'bottom-right' }
          ],
          defaultValue: 'top-right'
        }
      ],
      defaultProps: {
        position: 'top-right',
        variant: 'pill'
      }
    },
    i18nConfig: {
      namespace: 'site-controls',
      defaultKeys: []
    },
    component: SiteControls
  },
  {
    id: 'site-control-gear-popover',
    name: 'SiteControl Gear Popover',
    category: 'site-control',
    description: '齿轮按钮，点击弹出设置卡片（语言与主题）',
    builderConfig: {
      icon: '⚙️',
      thumbnail: '/imgs/components/site-control-gear.png',
      editableProps: [
        {
          key: 'align',
          type: 'select',
          label: '对齐',
          options: [
            { label: '右对齐', value: 'right' },
            { label: '左对齐', value: 'left' }
          ],
          defaultValue: 'right'
        }
      ],
      defaultProps: { align: 'right' }
    },
    i18nConfig: {
      namespace: 'site-controls',
      defaultKeys: []
    },
    component: SiteControlsPopover
  },
  {
    id: 'site-control-inline-bar',
    name: 'SiteControl Inline Bar',
    category: 'site-control',
    description: '内联条形控件，适合头部或内容区',
    builderConfig: {
      icon: '⚙️',
      thumbnail: '/imgs/components/site-control-inline.png',
      editableProps: [
        {
          key: 'size',
          type: 'select',
          label: '尺寸',
          options: [
            { label: '小', value: 'sm' },
            { label: '中', value: 'md' }
          ],
          defaultValue: 'sm'
        },
        { key: 'showLocale', type: 'boolean', label: '语言切换', defaultValue: true },
        { key: 'showTheme', type: 'boolean', label: '主题切换', defaultValue: true }
      ],
      defaultProps: { size: 'sm', showLocale: true, showTheme: true }
    },
    i18nConfig: {
      namespace: 'site-controls',
      defaultKeys: []
    },
    component: SiteControlsInlineBar
  }
];

/**
 * 获取组件注册表
 */
export function getUnifiedComponentRegistry() {
  return UNIFIED_COMPONENTS;
}

/**
 * 根据ID获取组件
 */
export function getUnifiedComponent(id: string) {
  return UNIFIED_COMPONENTS.find(comp => comp.id === id);
}

/**
 * 根据分类获取组件
 */
export function getUnifiedComponentsByCategory(category: string) {
  return UNIFIED_COMPONENTS.filter(comp => comp.category === category);
}

/**
 * 获取所有分类
 */
export function getUnifiedCategories() {
  const categories = [...new Set(UNIFIED_COMPONENTS.map(comp => comp.category))];
  return categories;
}