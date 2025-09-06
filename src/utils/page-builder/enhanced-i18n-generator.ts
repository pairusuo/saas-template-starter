import { PageLayout, PageComponent } from '@/types/page-builder';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface TranslationKey {
  key: string;
  zhValue: string;
  enValue: string;
  description?: string;
  componentType?: string;
  propName?: string;
}

interface I18nGenerationResult {
  tsxCode: string;
  zhTranslations: Record<string, any>;
  enTranslations: Record<string, any>;
  translationKeys: TranslationKey[];
  translationFiles: {
    zhFilePath: string;
    enFilePath: string;
    zhContent: string;
    enContent: string;
  };
}

/**
 * 增强版国际化页面生成器
 * 支持自动翻译、翻译文件管理、代码生成等功能
 */
export class EnhancedI18nPageGenerator {
  private translationKeys: TranslationKey[] = [];
  private keyCounter = 0;
  private pageNamespace = '';

  /**
   * 高级中英文翻译映射
   */
  private translationMap: Record<string, string> = {
    // 常用词汇
    '构建现代化 SaaS 应用': 'Build Modern SaaS Applications',
    '基于 Next.js 14 的完整 SaaS 模板': 'Complete SaaS template based on Next.js 14',
    '立即开始': 'Get Started',
    '查看演示': 'View Demo',
    '了解更多': 'Learn More',
    '功能特性': 'Features',
    '功能': 'Features',
    '快速开始': 'Quick Start',
    '联系我们': 'Contact Us',
    '关于我们': 'About Us',
    '关于': 'About',
    '联系': 'Contact',
    '产品': 'Products',
    '服务': 'Services',
    '解决方案': 'Solutions',
    '定价': 'Pricing',
    '博客': 'Blog',
    '文档': 'Documentation',
    '支持': 'Support',
    '登录': 'Sign In',
    '注册': 'Sign Up',
    '免费试用': 'Free Trial',
    '立即体验': 'Try Now',
    '专业版': 'Professional',
    '企业版': 'Enterprise',
    '个人版': 'Personal',
    '月付': 'Monthly',
    '年付': 'Yearly',
    '免费': 'Free',
    '热门': 'Popular',
    '推荐': 'Recommended',
    '新功能': 'New Feature',
    '即将推出': 'Coming Soon',
    '版权所有': 'All rights reserved',
    '保留所有权利': 'All rights reserved',
    '隐私政策': 'Privacy Policy',
    '服务条款': 'Terms of Service',
    '使用条款': 'Terms of Use',
    
    // 业务相关
    '提升效率': 'Boost Efficiency',
    '节省时间': 'Save Time',
    '降低成本': 'Reduce Costs',
    '增加收入': 'Increase Revenue',
    '用户体验': 'User Experience',
    '数据分析': 'Data Analytics',
    '安全保障': 'Security Assurance',
    '技术支持': 'Technical Support',
    '客户服务': 'Customer Service',
    '团队协作': 'Team Collaboration',
    
    // 技术相关
    '响应式设计': 'Responsive Design',
    '移动端优化': 'Mobile Optimized',
    '性能优化': 'Performance Optimized',
    '搜索引擎优化': 'SEO Optimized',
    '云端部署': 'Cloud Deployment',
    '数据备份': 'Data Backup',
    '实时同步': 'Real-time Sync',
    '自动更新': 'Auto Update',
    
    // 行动词汇
    '开始使用': 'Get Started',
    '免费注册': 'Sign Up Free',
    '立即购买': 'Buy Now',
    '申请试用': 'Request Trial',
    '下载应用': 'Download App',
    '查看详情': 'View Details',
    '联系销售': 'Contact Sales',
    '获取报价': 'Get Quote',
    
    // 描述性文本
    '几天内构建现代化 SaaS 应用': 'Build Modern SaaS Applications in Days',
    '包含身份验证、支付、数据库和部署': 'Including authentication, payments, database and deployment',
    '专注于您的核心产品功能，而非基础设施': 'Focus on your core product features, not infrastructure',
    '的完整解决方案': ' Complete Solution',
    '增强的UI组件': 'Enhanced UI Components',
    
    // 常见组合词
    '构建现代化': 'Build Modern',
    'SaaS 应用': 'SaaS Applications',
    '完整 SaaS 模板': 'Complete SaaS Template',
    '核心产品功能': 'Core Product Features',
    '基础设施': 'Infrastructure',
    '身份验证': 'Authentication',
    '支付': 'Payments',
    '数据库': 'Database',
    '部署': 'Deployment',
    '完整解决方案': 'Complete Solution',
    'UI组件': 'UI Components',
    '增强的': 'Enhanced',
  };

  // 定义翻译规则，使其更易于维护
  private readonly zhToEnRules: [RegExp, string][] = [
    [/我们的(.+)/, 'Our $1'],
    [/(.+)解决方案/, '$1 Solution'],
    [/(.+)服务/, '$1 Service'],
    [/(.+)平台/, '$1 Platform'],
    [/(.+)系统/, '$1 System'],
    [/(.+)工具/, '$1 Tool'],
    [/(.+)应用/, '$1 App'],
    [/(.+)软件/, '$1 Software'],
    [/专业的(.+)/, 'Professional $1'],
    [/高效的(.+)/, 'Efficient $1'],
    [/安全的(.+)/, 'Secure $1'],
    [/智能(.+)/, 'Smart $1'],
    [/自动(.+)/, 'Auto $1'],
    [/几天内(.+)/, '$1 in Days'],
    [/(.+)，包含(.+)/, '$1, including $2'],
    [/专注于(.+)，而非(.+)/, 'Focus on $1, not $2'],
    [/您的(.+)/, 'your $1'],
    [/而非(.+)/, 'not $1'],
  ];

  /**
   * 智能翻译中文文本
   */
  private smartTranslate(zhText: string): string {
    // 如果输入的是英文，直接返回
    if (!/[\u4e00-\u9fa5]/.test(zhText)) {
      return zhText;
    }

    // 直接映射
    if (this.translationMap[zhText]) {
      return this.translationMap[zhText];
    }

    let translated = zhText;

    // 多次替换，处理复杂的中英文混合文本
    for (const [zh, en] of Object.entries(this.translationMap)) {
      if (translated.includes(zh)) {
        translated = translated.replace(new RegExp(zh, 'g'), en);
      }
    }

    // 应用翻译规则
    for (const [rule, replacement] of this.zhToEnRules) {
      translated = translated.replace(rule, replacement);
    }

    // 处理剩余的常见中文词汇
    const commonWords: Record<string, string> = {
      '几天内': 'in Days',
      '现代化': 'Modern',
      '应用': 'Applications',
      '模板': 'Template',
      '完整': 'Complete',
      '包含': 'including',
      '身份验证': 'authentication',
      '支付': 'payments',
      '数据库': 'database',
      '部署': 'deployment',
      '专注于': 'Focus on',
      '您的': 'your',
      '核心': 'core',
      '功能': 'features',
      '而非': 'not',
      '基础设施': 'infrastructure',
      '增强的': 'Enhanced',
      '组件': 'Components',
      '保留': 'reserved',
      '所有': 'all',
      '权利': 'rights',
      '年': '',
      '月': '',
      '日': '',
    };

    for (const [zh, en] of Object.entries(commonWords)) {
      translated = translated.replace(new RegExp(zh, 'g'), en);
    }

    // 清理多余的空格和标点
    translated = translated
      .replace(/\s+/g, ' ')
      .replace(/\s+,/g, ',')
      .replace(/,\s*,/g, ',')
      .replace(/^\s+|\s+$/g, '')
      .replace(/^,|,$/, '')
      .replace(/：/g, ': ')
      .replace(/。$/, '.')
      .replace(/，/g, ', ')
      .replace(/、/g, ', ');

    // 如果翻译后仍然包含中文，尝试保持原文但给出警告
    if (/[\u4e00-\u9fa5]/.test(translated)) {
      console.warn(`翻译不完整: "${zhText}" -> "${translated}"`);
      // 对于无法翻译的部分，可以考虑保持原文或使用占位符
      return translated;
    }

    return translated;
  }

  /**
   * 生成翻译键
   */
  private generateTranslationKey(componentType: string, propName: string, index?: number): string {
    const suffix = index !== undefined ? `.${index}` : '';
    return `${componentType}.${propName}${suffix}`;
  }

  /**
   * 添加翻译键
   */
  private addTranslationKey(
    key: string, 
    originalValue: string, 
    translatedValue?: string, 
    description?: string,
    componentType?: string,
    propName?: string
  ) {
    let zhValue: string;
    let enValue: string;
    
    // 判断原始文本的语言
    if (this.isChineseText(originalValue)) {
      // 原始文本是中文，翻译成英文
      zhValue = originalValue;
      enValue = translatedValue || this.smartTranslate(originalValue);
    } else {
      // 原始文本是英文，翻译成中文
      enValue = originalValue;
      zhValue = translatedValue || this.smartTranslateEnToCn(originalValue);
    }
    
    this.translationKeys.push({
      key,
      zhValue,
      enValue,
      description,
      componentType,
      propName
    });
  }

  /**
   * 判断是否包含中文文本
   */
  private isChineseText(text: string): boolean {
    return /[\u4e00-\u9fa5]/.test(text);
  }

  /**
   * 反向翻译映射（英文到中文）
   */
  private getReverseTranslationMap(): Record<string, string> {
    const reverseMap: Record<string, string> = {};
    
    // 创建反向映射
    for (const [zh, en] of Object.entries(this.translationMap)) {
      reverseMap[en] = zh;
    }
    
    // 添加额外的英文到中文映射
    const additionalEnToCn: Record<string, string> = {
      'Get Started': '立即开始',
      'View Demo': '查看演示',
      'Learn More': '了解更多',
      'Features': '功能',
      'Pricing': '定价',
      'About': '关于',
      'Contact': '联系',
      'Products': '产品',
      'Services': '服务',
      'Solutions': '解决方案',
      'Blog': '博客',
      'Documentation': '文档',
      'Support': '支持',
      'Sign In': '登录',
      'Sign Up': '注册',
      'Free Trial': '免费试用',
      'Try Now': '立即体验',
      'Professional': '专业版',
      'Enterprise': '企业版',
      'Personal': '个人版',
      'Monthly': '月付',
      'Yearly': '年付',
      'Free': '免费',
      'Popular': '热门',
      'Recommended': '推荐',
      'New Feature': '新功能',
      'Coming Soon': '即将推出',
      'All rights reserved': '版权所有',
      'Privacy Policy': '隐私政策',
      'Terms of Service': '服务条款',
      'Terms of Use': '使用条款',
      'Build Modern SaaS Applications': '构建现代化 SaaS 应用',
      'Complete SaaS template based on Next.js 14': '基于 Next.js 14 的完整 SaaS 模板',
      'Enhanced UI Components': '增强的UI组件',
      'Complete Solution': '完整解决方案',
    };
    
    return { ...reverseMap, ...additionalEnToCn };
  }

  /**
   * 智能翻译英文文本到中文
   */
  private smartTranslateEnToCn(enText: string): string {
    // 如果输入的是中文，直接返回
    if (/[\u4e00-\u9fa5]/.test(enText)) {
      return enText;
    }

    const reverseMap = this.getReverseTranslationMap();
    
    // 直接映射
    if (reverseMap[enText]) {
      return reverseMap[enText];
    }

    let translated = enText;

    // 多次替换，处理复杂的英文文本
    for (const [en, zh] of Object.entries(reverseMap)) {
      if (translated.includes(en)) {
        translated = translated.replace(new RegExp(en, 'g'), zh);
      }
    }

    // 处理常见的英文模式和语法结构
    translated = translated
      .replace(/Our (.+)/, '我们的$1')
      .replace(/(.+) Solution/, '$1解决方案')
      .replace(/(.+) Service/, '$1服务')
      .replace(/(.+) Platform/, '$1平台')
      .replace(/(.+) System/, '$1系统')
      .replace(/(.+) Tool/, '$1工具')
      .replace(/(.+) App/, '$1应用')
      .replace(/(.+) Software/, '$1软件')
      .replace(/Professional (.+)/, '专业的$1')
      .replace(/Efficient (.+)/, '高效的$1')
      .replace(/Secure (.+)/, '安全的$1')
      .replace(/Smart (.+)/, '智能$1')
      .replace(/Auto (.+)/, '自动$1')
      .replace(/(.+) in Days/, '几天内$1')
      .replace(/(.+), including (.+)/, '$1，包含$2')
      .replace(/Focus on (.+), not (.+)/, '专注于$1，而非$2')
      .replace(/your (.+)/, '您的$1')
      .replace(/not (.+)/, '而非$1')
      .replace(/including (.+)/, '包含$1')
      .replace(/based on (.+)/, '基于$1')
      .replace(/Complete (.+)/, '完整的$1')
      .replace(/Modern (.+)/, '现代化$1')
      .replace(/Enhanced (.+)/, '增强的$1')
      .replace(/New (.+)/, '新$1');

    // 处理剩余的常见英文词汇
    const commonEnWords: Record<string, string> = {
      'in Days': '几天内',
      'Modern': '现代化',
      'Applications': '应用',
      'Template': '模板',
      'Complete': '完整',
      'including': '包含',
      'authentication': '身份验证',
      'payments': '支付',
      'database': '数据库',
      'deployment': '部署',
      'Focus on': '专注于',
      'your': '您的',
      'core': '核心',
      'features': '功能',
      'not': '而非',
      'infrastructure': '基础设施',
      'Enhanced': '增强的',
      'Components': '组件',
      'reserved': '保留',
      'all': '所有',
      'rights': '权利',
    };

    for (const [en, zh] of Object.entries(commonEnWords)) {
      translated = translated.replace(new RegExp(en, 'gi'), zh);
    }

    // 清理多余的空格和标点
    translated = translated
      .replace(/\s+/g, ' ')
      .replace(/\s+，/g, '，')
      .replace(/，\s*，/g, '，')
      .replace(/^\s+|\s+$/g, '')
      .replace(/^，|，$/, '');

    return translated;
  }

  /**
   * 处理组件属性，提取需要国际化的文本
   */
  private processComponentProps(component: PageComponent, componentIndex: number): string {
    const componentType = component.type.replace(/-/g, '_');
    let propsCode = '';

    Object.entries(component.props).forEach(([propKey, propValue]) => {
      if (typeof propValue === 'string' && this.needsTranslation(propValue)) {
        // 生成翻译键
        const translationKey = `${componentType}.${propKey}`;
        this.addTranslationKey(
          translationKey, 
          propValue, 
          undefined, 
          `${component.type}组件的${propKey}属性`,
          componentType,
          propKey
        );
        
        propsCode += `\n        ${propKey}={t('${this.pageNamespace}.${translationKey}')}`;
      } else if (typeof propValue === 'boolean') {
        propsCode += propValue ? `\n        ${propKey}` : `\n        ${propKey}={false}`;
      } else if (Array.isArray(propValue)) {
        // 处理数组类型
        const processedArray = this.processArrayProp(propValue, `${componentType}.${propKey}`);
        propsCode += `\n        ${propKey}={${processedArray}}`;
      } else if (typeof propValue === 'object' && propValue !== null) {
        // 处理对象类型
        const processedObject = this.processObjectProp(propValue, `${componentType}.${propKey}`);
        propsCode += `\n        ${propKey}={${processedObject}}`;
      } else {
        propsCode += `\n        ${propKey}={${JSON.stringify(propValue)}}`;
      }
    });

    return propsCode;
  }

  /**
   * 判断文本是否需要翻译（包含中文或英文文本）
   */
  private needsTranslation(text: string): boolean {
    // 检查是否包含中文字符
    if (/[\u4e00-\u9fa5]/.test(text)) {
      return true;
    }
    
    // 检查是否包含英文字母（排除纯数字、符号等）
    if (/[a-zA-Z]/.test(text) && text.trim().length > 1) {
      // 排除一些不需要翻译的技术词汇和URL
      const excludePatterns = [
        /^https?:\/\//, // URL
        /^[a-z-]+$/, // 纯小写带连字符（如CSS类名）
        /^[A-Z_]+$/, // 纯大写带下划线（如常量）
        /^\d+$/, // 纯数字
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 邮箱
        /^#[0-9a-fA-F]{3,6}$/, // 颜色值
      ];
      
      return !excludePatterns.some(pattern => pattern.test(text));
    }
    
    return false;
  }

  /**
   * 处理数组属性
   */
  private processArrayProp(array: any[], keyPrefix: string): string {
    const processedItems = array.map((item, index) => {
      if (typeof item === 'string' && this.needsTranslation(item)) {
        const translationKey = `${keyPrefix}.${index}`;
        this.addTranslationKey(translationKey, item);
        return `t('${this.pageNamespace}.${translationKey}')`;
      } else if (typeof item === 'object' && item !== null) {
        return this.processObjectProp(item, `${keyPrefix}.${index}`);
      }
      return JSON.stringify(item);
    });

    return `[${processedItems.join(', ')}]`;
  }

  /**
   * 处理对象属性
   */
  private processObjectProp(obj: any, keyPrefix: string): string {
    const processedEntries = Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'string' && this.needsTranslation(value)) {
        const translationKey = `${keyPrefix}.${key}`;
        this.addTranslationKey(translationKey, value);
        return `${key}: t('${this.pageNamespace}.${translationKey}')`;
      } else if (typeof value === 'object' && value !== null) {
        // 递归处理嵌套对象
        return `${key}: ${this.processObjectProp(value, `${keyPrefix}.${key}`)}`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    });

    return `{${processedEntries.join(', ')}}`;
  }

  /**
   * 获取组件的导入信息
   */
  private getComponentImport(componentType: string): { name: string; path: string } {
    const importMap: Record<string, { name: string; path: string }> = {
      'hero-simple': { name: 'HeroSimple', path: '@/components/page-builder/components/HeroSimple' },
      'hero-centered': { name: 'HeroCentered', path: '@/components/page-builder/components/HeroCentered' },
      'header-basic': { name: 'HeaderBasic', path: '@/components/page-builder/components/HeaderBasic' },
      'footer-basic': { name: 'FooterBasic', path: '@/components/page-builder/components/FooterBasic' },
      'features-grid': { name: 'FeaturesGrid', path: '@/components/landing/features/features-grid' },
      'features-list': { name: 'FeaturesList', path: '@/components/landing/features/features-list' },
      'stats-minimal': { name: 'StatsMinimal', path: '@/components/landing/stats/stats-minimal' },
      'stats-basic': { name: 'StatsBasic', path: '@/components/landing/stats/stats-basic' },
      'testimonials-simple': { name: 'TestimonialsSimple', path: '@/components/landing/testimonials/testimonials-simple' },
      'testimonials-grid': { name: 'TestimonialsGrid', path: '@/components/landing/testimonials/testimonials-grid' },
      'social-proof-avatars': { name: 'SocialProofAvatars', path: '@/components/landing/social-proof/social-proof-avatars' },
      'social-proof-logos': { name: 'SocialProofLogos', path: '@/components/landing/social-proof/social-proof-logos' },
    };

    return importMap[componentType] || {
      name: componentType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
      path: `@/components/landing/${componentType}`
    };
  }

  /**
   * 生成国际化的页面代码
   */
  public generateI18nPage(layout: PageLayout): I18nGenerationResult {
    // 重置状态
    this.translationKeys = [];
    this.keyCounter = 0;
    // 生成唯一的页面命名空间，包含时间戳避免重复
    const baseName = layout.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').toLowerCase() || 'page';
    const timestamp = Date.now();
    this.pageNamespace = `${baseName}_${timestamp}`;

    // 收集组件导入
    const componentImports = new Set<string>();

    // 生成组件代码
    const componentCode = layout.components.map((component, index) => {
      const { name: componentName, path: importPath } = this.getComponentImport(component.type);
      componentImports.add(`import { ${componentName} } from '${importPath}';`);

      const propsString = this.processComponentProps(component, index);
      
      return `        <${componentName}${propsString}${propsString ? '\n        ' : ' '}/>`;
    }).join('\n\n');

    // 生成TSX代码
    const tsxCode = `import { getTranslations } from 'next-intl/server';
${Array.from(componentImports).join('\n')}

interface ${this.pageNamespace.charAt(0).toUpperCase() + this.pageNamespace.slice(1)}PageProps {
  params: {
    locale: string;
  };
}

/**
 * ${layout.name}
 * ${layout.description}
 * 
 * 由页面构建器生成于: ${new Date().toLocaleString('zh-CN')}
 * 组件数量: ${layout.components.length}
 * 支持多语言: 中文/英文
 */
export default async function ${this.pageNamespace.charAt(0).toUpperCase() + this.pageNamespace.slice(1)}Page({ 
  params: { locale } 
}: ${this.pageNamespace.charAt(0).toUpperCase() + this.pageNamespace.slice(1)}PageProps) {
  const t = await getTranslations('${this.pageNamespace}');

  return (
    <div className="min-h-screen">
${componentCode}
    </div>
  );
}`;

    // 生成翻译对象
    const zhTranslations: Record<string, any> = {};
    const enTranslations: Record<string, any> = {};

    this.translationKeys.forEach(({ key, zhValue, enValue }) => {
      this.setNestedValue(zhTranslations, key, zhValue);
      this.setNestedValue(enTranslations, key, enValue);
    });

    // 生成翻译文件内容
    const zhContent = JSON.stringify(zhTranslations, null, 2);
    const enContent = JSON.stringify(enTranslations, null, 2);

    // 确保文件名有效
    const safeNamespace = this.pageNamespace || `page_${Date.now()}`;

    return {
      tsxCode,
      zhTranslations,
      enTranslations,
      translationKeys: this.translationKeys,
      translationFiles: {
        zhFilePath: `messages/zh/${safeNamespace}.json`,
        enFilePath: `messages/en/${safeNamespace}.json`,
        zhContent,
        enContent
      }
    };
  }

  /**
   * 设置嵌套对象的值
   */
  private setNestedValue(obj: any, path: string, value: any) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  /**
   * 智能合并翻译文件
   */
  private async mergeTranslationFiles(
    filePath: string, 
    newTranslations: Record<string, any>
  ): Promise<Record<string, any>> {
    try {
      if (existsSync(filePath)) {
        const existingContent = await readFile(filePath, 'utf8');
        const existingTranslations = JSON.parse(existingContent);
        
        // 深度合并翻译内容
        return this.deepMerge(existingTranslations, newTranslations);
      }
    } catch (error) {
      console.warn(`读取现有翻译文件失败: ${filePath}`, error);
    }
    
    return newTranslations;
  }

  /**
   * 深度合并对象
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  /**
   * 保存翻译文件到项目中（智能合并模式）
   */
  public async saveTranslationFiles(
    result: I18nGenerationResult,
    options: {
      mergeMode?: 'replace' | 'merge' | 'smart';
      targetNamespace?: string;
    } = {}
  ): Promise<{
    success: boolean;
    savedFiles?: string[];
    mergedKeys?: number;
    newKeys?: number;
    error?: string;
  }> {
    try {
      const { mergeMode = 'smart', targetNamespace } = options;
      const savedFiles: string[] = [];
      let mergedKeys = 0;
      let newKeys = 0;

      // 确保messages目录存在
      const messagesDir = join(process.cwd(), 'messages');
      const zhDir = join(messagesDir, 'zh');
      const enDir = join(messagesDir, 'en');

      if (!existsSync(zhDir)) {
        await mkdir(zhDir, { recursive: true });
      }
      if (!existsSync(enDir)) {
        await mkdir(enDir, { recursive: true });
      }

      // 确定目标文件名
      const targetFile = targetNamespace || 'homepage';
      const zhTargetPath = join(zhDir, `${targetFile}.json`);
      const enTargetPath = join(enDir, `${targetFile}.json`);

      let finalZhTranslations = result.zhTranslations;
      let finalEnTranslations = result.enTranslations;

      // 根据合并模式处理翻译内容
      if (mergeMode === 'merge' || mergeMode === 'smart') {
        const existingZh = await this.mergeTranslationFiles(zhTargetPath, result.zhTranslations);
        const existingEn = await this.mergeTranslationFiles(enTargetPath, result.enTranslations);
        
        // 统计合并信息
        const countKeys = (obj: any): number => {
          let count = 0;
          for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              count += countKeys(obj[key]);
            } else {
              count++;
            }
          }
          return count;
        };
        
        const originalZhCount = countKeys(existingZh);
        const newZhCount = countKeys(result.zhTranslations);
        
        finalZhTranslations = existingZh;
        finalEnTranslations = existingEn;
        
        mergedKeys = originalZhCount;
        newKeys = newZhCount;
      }

      // 保存中文翻译文件
      await writeFile(zhTargetPath, JSON.stringify(finalZhTranslations, null, 2), 'utf8');
      savedFiles.push(`messages/zh/${targetFile}.json`);

      // 保存英文翻译文件
      await writeFile(enTargetPath, JSON.stringify(finalEnTranslations, null, 2), 'utf8');
      savedFiles.push(`messages/en/${targetFile}.json`);

      return {
        success: true,
        savedFiles,
        mergedKeys,
        newKeys
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '保存翻译文件失败'
      };
    }
  }

  /**
   * 智能页面替换 - 备份并替换主页
   */
  public async smartReplaceHomePage(
    tsxCode: string,
    layout: PageLayout
  ): Promise<{
    success: boolean;
    backupPath?: string;
    error?: string;
  }> {
    try {
      const homePagePath = join(process.cwd(), 'src/app/[locale]/page.tsx');
      const backupDir = join(process.cwd(), 'backups/pages');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = join(backupDir, `page-backup-${timestamp}.tsx`);

      // 确保备份目录存在
      if (!existsSync(backupDir)) {
        await mkdir(backupDir, { recursive: true });
      }

      // 备份现有页面
      if (existsSync(homePagePath)) {
        const existingContent = await readFile(homePagePath, 'utf8');
        await writeFile(backupPath, existingContent, 'utf8');
      }

      // 写入新页面
      await writeFile(homePagePath, tsxCode, 'utf8');

      return {
        success: true,
        backupPath: `backups/pages/page-backup-${timestamp}.tsx`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '替换主页失败'
      };
    }
  }

  /**
   * 生成完整的国际化页面（包括保存翻译文件）
   */
  public async generateCompleteI18nPage(
    layout: PageLayout,
    options: {
      replaceHomePage?: boolean;
      mergeTranslations?: boolean;
      targetNamespace?: string;
    } = {}
  ): Promise<{
    result: I18nGenerationResult;
    translationsSaved: boolean;
    savedFiles?: string[];
    backupPath?: string;
    mergedKeys?: number;
    newKeys?: number;
    error?: string;
  }> {
    try {
      const { replaceHomePage = false, mergeTranslations = true, targetNamespace } = options;
      
      // 生成国际化代码
      const result = this.generateI18nPage(layout);

      // 确定翻译文件的命名空间
      const namespace = targetNamespace || (replaceHomePage ? 'homepage' : this.pageNamespace);

      // 保存翻译文件（智能合并模式）
      const saveResult = await this.saveTranslationFiles(result, {
        mergeMode: mergeTranslations ? 'smart' : 'replace',
        targetNamespace: namespace
      });

      let backupPath: string | undefined;

      // 如果需要替换主页
      if (replaceHomePage) {
        // 更新TSX代码中的命名空间
        const updatedTsxCode = result.tsxCode.replace(
          new RegExp(`'${this.pageNamespace}'`, 'g'),
          `'${namespace}'`
        );

        const replaceResult = await this.smartReplaceHomePage(updatedTsxCode, layout);
        if (!replaceResult.success) {
          throw new Error(replaceResult.error);
        }
        backupPath = replaceResult.backupPath;
      }

      return {
        result,
        translationsSaved: saveResult.success,
        savedFiles: saveResult.savedFiles,
        backupPath,
        mergedKeys: saveResult.mergedKeys,
        newKeys: saveResult.newKeys,
        error: saveResult.error
      };
    } catch (error) {
      return {
        result: this.generateI18nPage(layout),
        translationsSaved: false,
        error: error instanceof Error ? error.message : '生成国际化页面失败'
      };
    }
  }

  /**
   * 获取现有翻译文件的统计信息
   */
  public async getTranslationStats(namespace: string = 'homepage'): Promise<{
    zhExists: boolean;
    enExists: boolean;
    zhKeyCount: number;
    enKeyCount: number;
    lastModified?: Date;
  }> {
    const zhPath = join(process.cwd(), `messages/zh/${namespace}.json`);
    const enPath = join(process.cwd(), `messages/en/${namespace}.json`);

    const countKeys = (obj: any): number => {
      let count = 0;
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          count += countKeys(obj[key]);
        } else {
          count++;
        }
      }
      return count;
    };

    let zhKeyCount = 0;
    let enKeyCount = 0;
    let lastModified: Date | undefined;

    try {
      if (existsSync(zhPath)) {
        const zhContent = await readFile(zhPath, 'utf8');
        const zhData = JSON.parse(zhContent);
        zhKeyCount = countKeys(zhData);
        
        const stats = await import('fs').then(fs => fs.promises.stat(zhPath));
        lastModified = stats.mtime;
      }
    } catch (error) {
      console.warn('读取中文翻译文件失败:', error);
    }

    try {
      if (existsSync(enPath)) {
        const enContent = await readFile(enPath, 'utf8');
        const enData = JSON.parse(enContent);
        enKeyCount = countKeys(enData);
      }
    } catch (error) {
      console.warn('读取英文翻译文件失败:', error);
    }

    return {
      zhExists: existsSync(zhPath),
      enExists: existsSync(enPath),
      zhKeyCount,
      enKeyCount,
      lastModified
    };
  }
}

/**
 * 导出增强版生成器实例
 */
export const enhancedI18nPageGenerator = new EnhancedI18nPageGenerator();