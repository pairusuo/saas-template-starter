import { LucideIcon } from 'lucide-react';
import { 
  Layout, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Users, 
  Navigation,
  Layers,
  CreditCard,
  ArrowRight,
  Mail,
  HelpCircle,
  Sparkles
} from 'lucide-react';

// 组件类别定义
export interface ComponentCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
}

// 组件定义
export interface ComponentInfo {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  componentPath: string;
  previewImage?: string;
  props?: Record<string, any>;
  tags: string[];
  version: string;
  author: string;
  isNew?: boolean;
  isPopular?: boolean;
}

// 组件类别配置
export const componentCategories: ComponentCategory[] = [
  {
    id: 'headers',
    name: '头部组件',
    nameEn: 'Headers',
    description: '网站头部导航组件，包含导航、语言切换和主题切换',
    descriptionEn: 'Website header navigation components with navigation, language switcher and theme toggle',
    icon: Navigation,
  },
  {
    id: 'heroes',
    name: '英雄区域',
    nameEn: 'Hero Sections',
    description: '页面顶部的主要展示区域，包含标题、副标题和行动按钮',
    descriptionEn: 'Main display area at the top of the page with titles, subtitles and action buttons',
    icon: Sparkles,
  },
  {
    id: 'features',
    name: '功能特性',
    nameEn: 'Features',
    description: '展示产品核心功能和特性的组件',
    descriptionEn: 'Components showcasing core product features and capabilities',
    icon: Zap,
  },
  {
    id: 'pricing',
    name: '定价方案',
    nameEn: 'Pricing',
    description: '产品定价和套餐展示组件',
    descriptionEn: 'Product pricing and package display components',
    icon: CreditCard,
  },
  {
    id: 'cta',
    name: '行动召唤',
    nameEn: 'Call to Action',
    description: '转化导向的行动召唤组件',
    descriptionEn: 'Conversion-oriented call-to-action components',
    icon: ArrowRight,
  },
  {
    id: 'stats',
    name: '数据统计',
    nameEn: 'Statistics',
    description: '展示关键数据和统计信息的组件',
    descriptionEn: 'Components displaying key data and statistical information',
    icon: BarChart3,
  },
  {
    id: 'testimonials',
    name: '用户评价',
    nameEn: 'Testimonials',
    description: '展示用户反馈和评价的组件',
    descriptionEn: 'Components showing user feedback and reviews',
    icon: MessageSquare,
  },
  {
    id: 'social-proof',
    name: '社会证明',
    nameEn: 'Social Proof',
    description: '展示用户头像、公司Logo等社会证明的组件',
    descriptionEn: 'Components showing user avatars, company logos and other social proof',
    icon: Users,
  },
  {
    id: 'contact',
    name: '联系表单',
    nameEn: 'Contact Forms',
    description: '联系方式和表单组件',
    descriptionEn: 'Contact information and form components',
    icon: Mail,
  },
  {
    id: 'faq',
    name: '常见问题',
    nameEn: 'FAQ',
    description: '问答和帮助文档组件',
    descriptionEn: 'Q&A and help documentation components',
    icon: HelpCircle,
  },
  {
    id: 'footers',
    name: '页脚组件',
    nameEn: 'Footers',
    description: '网站页脚和底部信息组件',
    descriptionEn: 'Website footer and bottom information components',
    icon: Layout,
  },
];

// 组件市场配置
export const componentMarket: ComponentInfo[] = [
  // Headers 组件
  {
    id: 'header-basic',
    name: '基础页头',
    nameEn: 'Basic Header',
    description: '基础的页面头部组件，包含导航、语言切换和主题切换',
    descriptionEn: 'Basic page header with navigation, language switcher and theme toggle',
    category: 'headers',
    componentPath: 'headers/header-basic',
    tags: ['导航', '语言', '主题'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      showLanguageSwitcher: true,
      showThemeToggle: true,
    },
  },
  {
    id: 'header-advanced',
    name: '高级页头',
    nameEn: 'Advanced Header',
    description: '功能完整的响应式头部，包含移动端菜单、语言切换和主题切换',
    descriptionEn: 'Full-featured responsive header with mobile menu, language switcher and theme toggle',
    category: 'headers',
    componentPath: 'headers/header-advanced',
    tags: ['响应式', '移动端', '完整功能'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
    props: {
      showLanguageSwitcher: true,
      showThemeToggle: true,
    },
  },

  // Hero 组件
  {
    id: 'hero-simple',
    name: '简洁英雄区域',
    nameEn: 'Simple Hero',
    description: '简洁的英雄区域，只包含基本的标题和按钮',
    descriptionEn: 'Simple hero section with basic title and buttons only',
    category: 'heroes',
    componentPath: 'heroes/hero-simple',
    tags: ['简洁', '基础'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
  },
  {
    id: 'hero-centered',
    name: '居中英雄区域',
    nameEn: 'Centered Hero',
    description: '居中布局的英雄区域，支持统计数据和社会证明',
    descriptionEn: 'Centered hero section with stats and social proof support',
    category: 'heroes',
    componentPath: 'heroes/hero-centered',
    tags: ['居中', '统计', '社会证明'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
    props: {
      showStats: true,
      showSocialProof: true,
      backgroundVariant: 'gradient',
    },
  },

  // Features 组件
  {
    id: 'features-grid',
    name: '网格功能展示',
    nameEn: 'Features Grid',
    description: '网格布局的功能特性展示，支持多种列数和样式',
    descriptionEn: 'Grid layout features display with multiple columns and styles',
    category: 'features',
    componentPath: 'features/features-grid',
    tags: ['网格', '卡片', '图标'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      columns: 3,
      showIcons: true,
      layout: 'card',
    },
  },
  {
    id: 'features-list',
    name: '列表功能展示',
    nameEn: 'Features List',
    description: '列表布局的功能特性展示，适合详细描述',
    descriptionEn: 'List layout features display, suitable for detailed descriptions',
    category: 'features',
    componentPath: 'features/features-list',
    tags: ['列表', '详细'],
    version: '1.0.0',
    author: 'SaaS Template Team',
  },

  // Pricing 组件
  {
    id: 'pricing-cards-builder',
    name: '定价卡片',
    nameEn: 'Pricing Cards',
    description: '卡片式定价方案展示，支持月付/年付切换',
    descriptionEn: 'Card-style pricing plan display with monthly/annual payment toggle',
    category: 'pricing',
    componentPath: 'pricing/pricing-cards-builder',
    tags: ['定价', '价格', '套餐', '订阅'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      showAnnualToggle: true,
      highlightPopular: true,
    },
  },

  // CTA 组件
  {
    id: 'cta-simple',
    name: '简洁CTA',
    nameEn: 'Simple CTA',
    description: '简洁的行动召唤区域，包含标题、描述和按钮',
    descriptionEn: 'Simple call-to-action area with title, description and buttons',
    category: 'cta',
    componentPath: 'cta/cta-simple',
    tags: ['CTA', '行动召唤', '简洁', '转化'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      showSecondaryButton: true,
    },
  },
  {
    id: 'cta-split',
    name: '分栏CTA',
    nameEn: 'Split CTA',
    description: '分栏布局的行动召唤，包含功能列表和卡片',
    descriptionEn: 'Split layout call-to-action with feature list and cards',
    category: 'cta',
    componentPath: 'cta/cta-split',
    tags: ['CTA', '分栏', '功能列表', '转化'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
  },

  // Stats 组件
  {
    id: 'stats-basic',
    name: '基础数据统计',
    nameEn: 'Basic Stats',
    description: '基础的数据统计展示，支持多种变体和样式',
    descriptionEn: 'Basic statistics display with multiple variants and styles',
    category: 'stats',
    componentPath: 'stats/stats-basic',
    tags: ['统计', '数据', '图标'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      variant: 'default',
      showBadge: true,
    },
  },
  {
    id: 'stats-minimal',
    name: '简洁数据统计',
    nameEn: 'Minimal Stats',
    description: '简洁的数据统计展示，适合嵌入其他组件',
    descriptionEn: 'Minimal statistics display, suitable for embedding in other components',
    category: 'stats',
    componentPath: 'stats/stats-minimal',
    tags: ['简洁', '嵌入'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    props: {
      showIcons: true,
    },
  },

  // Testimonials 组件
  {
    id: 'testimonials-grid',
    name: '网格用户评价',
    nameEn: 'Testimonials Grid',
    description: '网格布局的用户评价展示，支持头像、公司和评分',
    descriptionEn: 'Grid layout testimonials with avatars, companies and ratings',
    category: 'testimonials',
    componentPath: 'testimonials/testimonials-grid',
    tags: ['网格', '头像', '评分'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
    props: {
      showAvatars: true,
      showCompany: true,
      showRating: true,
    },
  },
  {
    id: 'testimonials-simple',
    name: '简洁用户评价',
    nameEn: 'Simple Testimonials',
    description: '简洁的用户评价展示，适合嵌入其他组件',
    descriptionEn: 'Simple testimonials display, suitable for embedding',
    category: 'testimonials',
    componentPath: 'testimonials/testimonials-simple',
    tags: ['简洁', '嵌入'],
    version: '1.0.0',
    author: 'SaaS Template Team',
  },

  // Social Proof 组件
  {
    id: 'social-proof-avatars',
    name: '用户头像展示',
    nameEn: 'User Avatars',
    description: '展示用户头像和评分的社会证明组件',
    descriptionEn: 'Social proof component showing user avatars and ratings',
    category: 'social-proof',
    componentPath: 'social-proof/social-proof-avatars',
    tags: ['头像', '评分', '用户'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
    props: {
      showRating: true,
      showUserCount: true,
    },
  },
  {
    id: 'social-proof-logos',
    name: '公司Logo展示',
    nameEn: 'Company Logos',
    description: '展示合作公司Logo的社会证明组件',
    descriptionEn: 'Social proof component showing partner company logos',
    category: 'social-proof',
    componentPath: 'social-proof/social-proof-logos',
    tags: ['Logo', '公司', '合作伙伴'],
    version: '1.0.0',
    author: 'SaaS Template Team',
  },

  // Contact 组件
  {
    id: 'contact-form-builder',
    name: '联系表单',
    nameEn: 'Contact Form',
    description: '联系表单和信息展示，支持多种布局样式',
    descriptionEn: 'Contact form and information display with multiple layout styles',
    category: 'contact',
    componentPath: 'contact/contact-form-builder',
    tags: ['联系', '表单', '沟通'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
    props: {
      variant: 'split',
      showContactInfo: true,
    },
  },

  // FAQ 组件
  {
    id: 'faq-accordion',
    name: '常见问题',
    nameEn: 'FAQ Accordion',
    description: '折叠式常见问题展示，支持问答交互',
    descriptionEn: 'Collapsible FAQ display with Q&A interaction',
    category: 'faq',
    componentPath: 'faq/faq-accordion',
    tags: ['FAQ', '问答', '帮助', '折叠'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isPopular: true,
  },

  // Footer 组件
  {
    id: 'footer-basic',
    name: '基础页脚',
    nameEn: 'Basic Footer',
    description: '基础的页面底部组件，包含链接和社交媒体',
    descriptionEn: 'Basic page footer with links and social media',
    category: 'footers',
    componentPath: 'footers/footer-basic',
    tags: ['链接', '社交媒体', '版权'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    props: {
      showSocialLinks: true,
    },
  },
  {
    id: 'footer-advanced',
    name: '高级页脚',
    nameEn: 'Advanced Footer',
    description: '功能完整的页脚，包含完整链接结构、社交媒体和版权信息',
    descriptionEn: 'Full-featured footer with complete link structure, social media and copyright information',
    category: 'footers',
    componentPath: 'footers/footer-advanced',
    tags: ['完整功能', '链接结构', '社交媒体'],
    version: '1.0.0',
    author: 'SaaS Template Team',
    isNew: true,
    props: {
      showSocialLinks: true,
    },
  },
];

// 获取指定类别的组件
export function getComponentsByCategory(categoryId: string): ComponentInfo[] {
  return componentMarket.filter(component => component.category === categoryId);
}

// 获取热门组件
export function getPopularComponents(): ComponentInfo[] {
  return componentMarket.filter(component => component.isPopular);
}

// 获取新组件
export function getNewComponents(): ComponentInfo[] {
  return componentMarket.filter(component => component.isNew);
}

// 根据标签搜索组件
export function searchComponentsByTag(tag: string): ComponentInfo[] {
  return componentMarket.filter(component => 
    component.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

// 根据关键词搜索组件
export function searchComponents(query: string): ComponentInfo[] {
  const lowercaseQuery = query.toLowerCase();
  return componentMarket.filter(component => 
    component.name.toLowerCase().includes(lowercaseQuery) ||
    component.nameEn.toLowerCase().includes(lowercaseQuery) ||
    component.description.toLowerCase().includes(lowercaseQuery) ||
    component.descriptionEn.toLowerCase().includes(lowercaseQuery) ||
    component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}