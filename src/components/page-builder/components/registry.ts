/**
 * 组件注册表 - 页面构建器组件市场
 */

import { ComponentCategory, ComponentDefinition } from './types';

// 导入现有组件
import { HeaderBasic } from './headers/HeaderBasic';
import { HeaderAdvanced } from './headers/HeaderAdvanced';
import { FooterBasic } from './footers/FooterBasic';
import { FooterAdvanced } from './footers/FooterAdvanced';
import { HeroSimple } from './heroes/HeroSimple';
import { HeroCentered } from './heroes/HeroCentered';
import { FeaturesGrid } from './features/FeaturesGrid';
import { FeaturesList } from './features/FeaturesList';
import { PricingCardsBuilder } from './pricing/PricingCardsBuilder';
import { CtaSimple } from './cta/CtaSimple';
import { CtaSplit } from './cta/CtaSplit';
import { StatsBasic } from './stats/StatsBasic';
import { StatsMinimal } from './stats/StatsMinimal';
import { TestimonialsGrid } from './testimonials/TestimonialsGrid';
import { TestimonialsSimple } from './testimonials/TestimonialsSimple';
import { SocialProofAvatars } from './social-proof/SocialProofAvatars';
import { SocialProofLogos } from './social-proof/SocialProofLogos';
import { ContactFormBuilder } from './contact/ContactFormBuilder';
import { FAQAccordion } from './faq/FAQAccordion';
import { SiteControls } from './site/SiteControls';
import { SiteControlsPopover } from './site/SiteControlsPopover';
import { SiteControlsInlineBar } from './site/SiteControlsInlineBar';

/**
 * 头部组件定义
 */
const HEADER_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'header-basic',
    name: '基础头部',
    category: 'headers',
    description: '简洁的导航头部，支持自定义配置',
    thumbnail: '/imgs/components/header-basic.png',
    component: HeaderBasic,
    defaultProps: {},
    editableProps: [
      {
        key: 'logo',
        type: 'string',
        label: '网站Logo',
        description: '自定义网站标识文本',
      },
      {
        key: 'ctaText',
        type: 'string',
        label: 'CTA按钮文本',
        description: '行动召唤按钮文字',
      },
      {
        key: 'showCTA',
        type: 'boolean',
        label: '显示CTA按钮',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'header-basic',
    tags: ['导航', '头部', '简洁', '可配置'],
    previewSize: 'large',
  },
  {
    id: 'header-advanced',
    name: '高级头部',
    category: 'headers',
    description: '功能完整的响应式头部，包含移动端菜单、语言切换和主题切换',
    thumbnail: '/imgs/components/header-advanced.png',
    component: HeaderAdvanced,
    defaultProps: {
      showLanguageSwitcher: true,
      showThemeToggle: true,
    },
    editableProps: [
      {
        key: 'showLanguageSwitcher',
        type: 'boolean',
        label: '显示语言切换器',
        defaultValue: true,
      },
      {
        key: 'showThemeToggle',
        type: 'boolean',
        label: '显示主题切换',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'header-basic',
    tags: ['导航', '头部', '响应式', '完整功能'],
    previewSize: 'large',
  },
];

/**
 * 英雄区域组件定义
 */
const HERO_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'hero-simple',
    name: '简单英雄区',
    category: 'heroes',
    description: '简洁的英雄区域，包含标题、描述和行动按钮',
    thumbnail: '/imgs/components/hero-simple.png',
    component: HeroSimple,
    defaultProps: {},
    editableProps: [],
    i18nNamespace: 'hero',
    tags: ['英雄区', '首屏', '转化'],
    previewSize: 'large',
  },
  {
    id: 'hero-centered',
    name: '居中英雄区',
    category: 'heroes', 
    description: '居中布局的英雄区域，适合产品展示',
    thumbnail: '/imgs/components/hero-centered.png',
    component: HeroCentered,
    defaultProps: {},
    editableProps: [],
    i18nNamespace: 'hero-centered',
    tags: ['英雄区', '居中', '产品'],
    previewSize: 'large',
  },
];

/**
 * 功能特性组件定义
 */
const FEATURES_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'features-grid',
    name: '功能网格',
    category: 'features',
    description: '网格布局的功能特性展示，支持多列和多种样式',
    thumbnail: '/imgs/components/features-grid.png',
    component: FeaturesGrid,
    defaultProps: {
      columns: 3,
      showIcons: true,
      layout: 'card',
    },
    editableProps: [
      {
        key: 'columns',
        type: 'select',
        label: '列数',
        defaultValue: 3,
        options: [
          { label: '2列', value: 2 },
          { label: '3列', value: 3 },
          { label: '4列', value: 4 },
        ],
      },
      {
        key: 'layout',
        type: 'select',
        label: '显示样式',
        defaultValue: 'card',
        options: [
          { label: '卡片', value: 'card' },
          { label: '简约', value: 'minimal' },
        ],
      },
      {
        key: 'showIcons',
        type: 'boolean',
        label: '显示图标',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'features',
    tags: ['功能', '特性', '网格', '卡片'],
    previewSize: 'large',
  },
  {
    id: 'features-list',
    name: '功能列表',
    category: 'features',
    description: '列表布局的功能特性展示，适合详细说明',
    thumbnail: '/imgs/components/features-list.png',
    component: FeaturesList,
    defaultProps: {
      showIcons: true,
    },
    editableProps: [
      {
        key: 'showIcons',
        type: 'boolean',
        label: '显示图标',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'features',
    tags: ['功能', '特性', '列表', '详细'],
    previewSize: 'large',
  },
];

/**
 * 定价组件定义
 */
const PRICING_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'pricing-cards-builder',
    name: '定价卡片',
    category: 'pricing',
    description: '卡片式定价方案展示，支持月付/年付切换',
    thumbnail: '/imgs/components/pricing-cards.png',
    component: PricingCardsBuilder,
    defaultProps: {
      showAnnualToggle: true,
      highlightPopular: true,
    },
    editableProps: [
      {
        key: 'showAnnualToggle',
        type: 'boolean',
        label: '显示年付切换',
        defaultValue: true,
      },
      {
        key: 'highlightPopular',
        type: 'boolean', 
        label: '突出显示热门方案',
        defaultValue: true,
      },
      {
        key: 'title',
        type: 'string',
        label: '标题',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'subtitle',
        type: 'string',
        label: '副标题',
        description: '覆盖默认翻译文本',
      },
    ],
    i18nNamespace: 'pricing',
    tags: ['定价', '价格', '套餐', '订阅'],
    previewSize: 'large',
  },
];

/**
 * CTA组件定义
 */
const CTA_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'cta-simple',
    name: '简单CTA',
    category: 'cta',
    description: '简洁的行动召唤区域，包含标题、描述和按钮',
    thumbnail: '/imgs/components/cta-simple.png',
    component: CtaSimple,
    defaultProps: {
      showSecondaryButton: true,
    },
    editableProps: [
      {
        key: 'title',
        type: 'string',
        label: '标题',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'subtitle',
        type: 'string',
        label: '副标题',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'showSecondaryButton',
        type: 'boolean',
        label: '显示次要按钮',
        defaultValue: true,
      },
      {
        key: 'primaryButtonText',
        type: 'string',
        label: '主按钮文本',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'secondaryButtonText',
        type: 'string',
        label: '次要按钮文本',
        description: '覆盖默认翻译文本',
      },
    ],
    i18nNamespace: 'cta',
    tags: ['CTA', '行动召唤', '简洁', '转化'],
    previewSize: 'large',
  },
  {
    id: 'cta-split',
    name: '分栏CTA',
    category: 'cta',
    description: '分栏布局的行动召唤，包含功能列表和卡片',
    thumbnail: '/imgs/components/cta-split.png',
    component: CtaSplit,
    defaultProps: {},
    editableProps: [
      {
        key: 'title',
        type: 'string',
        label: '标题',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'subtitle',
        type: 'string',
        label: '副标题',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'primaryButtonText',
        type: 'string',
        label: '主按钮文本',
        description: '覆盖默认翻译文本',
      },
      {
        key: 'secondaryButtonText',
        type: 'string',
        label: '次要按钮文本',
        description: '覆盖默认翻译文本',
      },
    ],
    i18nNamespace: 'cta',
    tags: ['CTA', '分栏', '功能列表', '转化'],
    previewSize: 'large',
  },
];

/**
 * 统计数据组件定义
 */
const STATS_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'stats-basic',
    name: '基础统计',
    category: 'stats',
    description: '展示关键业务数据和统计信息，支持多种展示样式',
    thumbnail: '/imgs/components/stats-basic.png',
    component: StatsBasic,
    defaultProps: {
      variant: 'default',
      showBadge: true,
    },
    editableProps: [
      {
        key: 'variant',
        type: 'select',
        label: '显示样式',
        defaultValue: 'default',
        options: [
          { label: '默认', value: 'default' },
          { label: '紧凑', value: 'compact' },
          { label: '详细', value: 'detailed' },
        ],
      },
      {
        key: 'showBadge',
        type: 'boolean',
        label: '显示标题区域',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'stats',
    tags: ['统计', '数据', '业务指标'],
    previewSize: 'large',
  },
  {
    id: 'stats-minimal',
    name: '简约统计',
    category: 'stats',
    description: '简约风格的数据统计展示，适合紧凑布局',
    thumbnail: '/imgs/components/stats-minimal.png',
    component: StatsMinimal,
    defaultProps: {
      showIcons: true,
    },
    editableProps: [
      {
        key: 'showIcons',
        type: 'boolean',
        label: '显示图标',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'stats',
    tags: ['统计', '简约', '数据'],
    previewSize: 'medium',
  },
];

/**
 * 用户评价组件定义
 */
const TESTIMONIALS_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'testimonials-grid',
    name: '评价网格',
    category: 'testimonials',
    description: '网格布局的用户评价展示，支持头像、公司和评分配置',
    thumbnail: '/imgs/components/testimonials-grid.png',
    component: TestimonialsGrid,
    defaultProps: {
      showAvatars: true,
      showCompany: true,
      showRating: true,
    },
    editableProps: [
      {
        key: 'showAvatars',
        type: 'boolean',
        label: '显示头像',
        defaultValue: true,
      },
      {
        key: 'showCompany',
        type: 'boolean',
        label: '显示公司信息',
        defaultValue: true,
      },
      {
        key: 'showRating',
        type: 'boolean',
        label: '显示评分',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'testimonials',
    tags: ['评价', '用户反馈', '网格', '社会证明'],
    previewSize: 'large',
  },
  {
    id: 'testimonials-simple',
    name: '简约评价',
    category: 'testimonials',
    description: '简约风格的用户评价展示，适合紧凑布局',
    thumbnail: '/imgs/components/testimonials-simple.png',
    component: TestimonialsSimple,
    defaultProps: {},
    editableProps: [],
    i18nNamespace: 'testimonials',
    tags: ['评价', '用户反馈', '简约', '紧凑'],
    previewSize: 'medium',
  },
];

/**
 * 社会证明组件定义
 */
const SOCIAL_PROOF_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'social-proof-avatars',
    name: '用户头像',
    category: 'social-proof',
    description: '显示用户头像、评分和用户数量的社会证明',
    thumbnail: '/imgs/components/social-proof-avatars.png',
    component: SocialProofAvatars,
    defaultProps: {
      showRating: true,
      showUserCount: true,
    },
    editableProps: [
      {
        key: 'showRating',
        type: 'boolean',
        label: '显示评分',
        defaultValue: true,
      },
      {
        key: 'showUserCount',
        type: 'boolean',
        label: '显示用户计数',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'social-proof',
    tags: ['社会证明', '用户头像', '评分', '信任度'],
    previewSize: 'medium',
  },
  {
    id: 'social-proof-logos',
    name: '公司Logo',
    category: 'social-proof',
    description: '展示信任的公司和品牌Logo，建立权威背书',
    thumbnail: '/imgs/components/social-proof-logos.png',
    component: SocialProofLogos,
    defaultProps: {},
    editableProps: [],
    i18nNamespace: 'social-proof',
    tags: ['社会证明', '公司Logo', '品牌背书', '信任度'],
    previewSize: 'medium',
  },
];

/**
 * 联系表单组件定义
 */
const CONTACT_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'contact-form-builder',
    name: '联系表单',
    category: 'contact',
    description: '联系表单和信息展示',
    thumbnail: '/imgs/components/contact-form.png',
    component: ContactFormBuilder,
    defaultProps: {
      variant: 'split',
      showContactInfo: true,
    },
    editableProps: [
      {
        key: 'variant',
        type: 'select',
        label: '布局样式',
        defaultValue: 'split',
        options: [
          { label: '分栏', value: 'split' },
          { label: '居中', value: 'centered' },
          { label: '简单', value: 'simple' },
        ],
      },
      {
        key: 'showContactInfo',
        type: 'boolean',
        label: '显示联系信息',
        defaultValue: true,
      },
      {
        key: 'title',
        type: 'string',
        label: '标题',
      },
      {
        key: 'subtitle',
        type: 'string',
        label: '副标题',
      },
    ],
    i18nNamespace: 'contact',
    tags: ['联系', '表单', '沟通'],
    previewSize: 'large',
  },
];

/**
 * FAQ组件定义
 */
const FAQ_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'faq-accordion',
    name: '常见问题',
    category: 'faq',
    description: '折叠式常见问题展示，支持问答交互',
    thumbnail: '/imgs/components/faq-accordion.png',
    component: FAQAccordion,
    defaultProps: {},
    editableProps: [],
    i18nNamespace: 'faq',
    tags: ['FAQ', '问答', '帮助', '折叠'],
    previewSize: 'large',
  },
];

/**
 * 页脚组件定义
 */
const FOOTER_COMPONENTS: ComponentDefinition[] = [
  {
    id: 'footer-basic',
    name: '基础页脚',
    category: 'footers',
    description: '简洁的页脚组件，支持自定义配置',
    thumbnail: '/imgs/components/footer-basic.png', 
    component: FooterBasic,
    defaultProps: {},
    editableProps: [
      {
        key: 'companyName',
        type: 'string',
        label: '公司名称',
        description: '自定义公司标识',
      },
      {
        key: 'description',
        type: 'string',
        label: '公司描述',
        description: '公司简短介绍',
      },
      {
        key: 'copyright',
        type: 'string',
        label: '版权信息',
        description: '自定义版权文字',
      },
    ],
    i18nNamespace: 'footer-basic',
    tags: ['页脚', '简洁', '可配置'],
    previewSize: 'medium',
  },
  {
    id: 'footer-advanced',
    name: '高级页脚',
    category: 'footers',
    description: '功能完整的页脚，包含完整链接结构、社交媒体和版权信息',
    thumbnail: '/imgs/components/footer-advanced.png', 
    component: FooterAdvanced,
    defaultProps: {
      showSocialLinks: true,
    },
    editableProps: [
      {
        key: 'showSocialLinks',
        type: 'boolean',
        label: '显示社交媒体链接',
        defaultValue: true,
      },
    ],
    i18nNamespace: 'footer',
    tags: ['页脚', '完整功能', '社交媒体', '链接结构'],
    previewSize: 'large',
  },
];

/**
 * 组件分类定义
 */
export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: 'headers',
    name: '头部组件',
    icon: 'Header',
    description: '网站头部导航组件',
    color: '#3B82F6',
    components: HEADER_COMPONENTS,
  },
  {
    id: 'heroes',
    name: '英雄区域',
    icon: 'Sparkles',
    description: '首屏英雄区域组件',
    color: '#8B5CF6',
    components: HERO_COMPONENTS,
  },
  {
    id: 'features',
    name: '功能特性',
    icon: 'Grid',
    description: '产品功能展示组件',
    color: '#10B981',
    components: FEATURES_COMPONENTS,
  },
  {
    id: 'testimonials',
    name: '用户评价',
    icon: 'MessageSquare',
    description: '客户评价和推荐组件',
    color: '#F59E0B',
    components: TESTIMONIALS_COMPONENTS,
  },
  {
    id: 'pricing',
    name: '定价方案',
    icon: 'CreditCard',
    description: '产品定价和套餐组件',
    color: '#EF4444',
    components: PRICING_COMPONENTS,
  },
  {
    id: 'cta',
    name: '行动召唤',
    icon: 'ArrowRight',
    description: '转化导向的CTA组件',
    color: '#EC4899',
    components: CTA_COMPONENTS,
  },
  {
    id: 'stats',
    name: '数据统计',
    icon: 'BarChart',
    description: '数据展示和统计组件',
    color: '#06B6D4',
    components: STATS_COMPONENTS,
  },
  {
    id: 'contact',
    name: '联系表单',
    icon: 'Mail',
    description: '联系方式和表单组件',
    color: '#84CC16',
    components: CONTACT_COMPONENTS,
  },
  {
    id: 'faq',
    name: '常见问题',
    icon: 'HelpCircle',
    description: '问答和帮助文档组件',
    color: '#A855F7',
    components: FAQ_COMPONENTS,
  },
  {
    id: 'social-proof',
    name: '社会证明',
    icon: 'Users',
    description: '用户头像和社会证明组件',
    color: '#F97316',
    components: SOCIAL_PROOF_COMPONENTS,
  },
  {
    id: 'site-control',
    name: 'SiteControl',
    icon: 'Settings',
    description: '全局站点控件（语言与主题）',
    color: '#0EA5E9',
    components: [
      {
        id: 'site-control-pill-dock',
        name: 'SiteControl Pill Dock',
        category: 'site-control',
        description: '右上/右下浮动胶囊，包含语言与主题切换',
        thumbnail: '/imgs/components/site-control-pill.png',
        component: SiteControls,
        defaultProps: {
          position: 'top-right',
          variant: 'pill',
        },
        editableProps: [
          { key: 'position', type: 'select', label: '位置', defaultValue: 'top-right', options: [
            { label: '右上', value: 'top-right' },
            { label: '右下', value: 'bottom-right' },
          ] },
        ],
        i18nNamespace: 'site-controls',
        tags: ['SiteControl','语言','主题','浮动'],
        previewSize: 'small',
      },
      {
        id: 'site-control-gear-popover',
        name: 'SiteControl Gear Popover',
        category: 'site-control',
        description: '齿轮按钮，点击弹出设置卡片（语言与主题）',
        thumbnail: '/imgs/components/site-control-gear.png',
        component: SiteControlsPopover,
        defaultProps: { align: 'right' },
        editableProps: [
          { key: 'align', type: 'select', label: '对齐', defaultValue: 'right', options: [
            { label: '右对齐', value: 'right' },
            { label: '左对齐', value: 'left' },
          ] },
        ],
        i18nNamespace: 'site-controls',
        tags: ['SiteControl','语言','主题','弹出'],
        previewSize: 'small',
      },
      {
        id: 'site-control-inline-bar',
        name: 'SiteControl Inline Bar',
        category: 'site-control',
        description: '内联条形控件，适合头部或内容区',
        thumbnail: '/imgs/components/site-control-inline.png',
        component: SiteControlsInlineBar,
        defaultProps: { size: 'sm', showLocale: true, showTheme: true },
        editableProps: [
          { key: 'size', type: 'select', label: '尺寸', defaultValue: 'sm', options: [
            { label: '小', value: 'sm' },
            { label: '中', value: 'md' },
          ] },
          { key: 'showLocale', type: 'boolean', label: '语言切换', defaultValue: true },
          { key: 'showTheme', type: 'boolean', label: '主题切换', defaultValue: true },
        ],
        i18nNamespace: 'site-controls',
        tags: ['SiteControl','语言','主题','内联'],
        previewSize: 'small',
      },
    ],
  },
  {
    id: 'footers',
    name: '页脚组件',
    icon: 'Layout',
    description: '网站页脚和底部信息',
    color: '#6366F1',
    components: FOOTER_COMPONENTS,
  },
];

/**
 * 获取所有组件的平铺列表
 */
export const getAllComponents = (): ComponentDefinition[] => {
  return COMPONENT_CATEGORIES.flatMap(category => category.components);
};

/**
 * 根据ID获取组件定义
 */
export const getComponentById = (id: string): ComponentDefinition | undefined => {
  return getAllComponents().find(component => component.id === id);
};

/**
 * 根据分类获取组件
 */
export const getComponentsByCategory = (categoryId: string): ComponentDefinition[] => {
  const category = COMPONENT_CATEGORIES.find(cat => cat.id === categoryId);
  return category?.components || [];
};

/**
 * 搜索组件
 */
export const searchComponents = (query: string): ComponentDefinition[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllComponents().filter(component => 
    component.name.toLowerCase().includes(lowercaseQuery) ||
    component.description.toLowerCase().includes(lowercaseQuery) ||
    component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * 获取组件分类
 */
export const getComponentCategory = (categoryId: string): ComponentCategory | undefined => {
  return COMPONENT_CATEGORIES.find(cat => cat.id === categoryId);
};
