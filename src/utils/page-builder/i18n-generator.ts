import { PageLayout, PageComponent } from '@/types/page-builder';

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
 * 生成国际化的页面代码和翻译文件
 */
export class I18nPageGenerator {
  private translationKeys: TranslationKey[] = [];
  private keyCounter = 0;

  /**
   * 生成翻译键
   */
  private generateTranslationKey(prefix: string, description?: string): string {
    this.keyCounter++;
    return `${prefix}.item${this.keyCounter}`;
  }

  /**
   * 添加翻译键
   */
  private addTranslationKey(key: string, zhValue: string, enValue?: string, description?: string) {
    // 自动翻译中文到英文（简单映射，实际项目中可以集成翻译API）
    const autoEnValue = enValue || this.autoTranslate(zhValue);
    
    this.translationKeys.push({
      key,
      zhValue,
      enValue: autoEnValue,
      description
    });
  }

  /**
   * 简单的中英文映射（实际项目中可以集成翻译API）
   */
  private autoTranslate(zhText: string): string {
    const translations: Record<string, string> = {
      // 常用词汇映射
      '构建现代化 SaaS 应用': 'Build Modern SaaS Applications',
      '基于 Next.js 14 的完整 SaaS 模板': 'Complete SaaS template based on Next.js 14',
      '立即开始': 'Get Started',
      '查看演示': 'View Demo',
      '了解更多': 'Learn More',
      '功能特性': 'Features',
      '快速开始': 'Quick Start',
      '联系我们': 'Contact Us',
      '关于我们': 'About Us',
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
      '隐私政策': 'Privacy Policy',
      '服务条款': 'Terms of Service',
      '使用条款': 'Terms of Use'
    };

    // 如果有直接映射，使用映射
    if (translations[zhText]) {
      return translations[zhText];
    }

    // 简单的处理逻辑
    if (zhText.includes('SaaS')) {
      return zhText; // SaaS相关保持原样
    }

    // 默认返回原文（实际项目中应该集成翻译API）
    return zhText;
  }

  /**
   * 处理组件属性，提取需要国际化的文本
   */
  private processComponentProps(component: PageComponent, componentIndex: number): string {
    const componentPrefix = `component${componentIndex}`;
    let propsCode = '';

    Object.entries(component.props).forEach(([propKey, propValue]) => {
      if (typeof propValue === 'string' && this.isChineseText(propValue)) {
        // 生成翻译键
        const translationKey = `${componentPrefix}.${propKey}`;
        this.addTranslationKey(translationKey, propValue);
        
        propsCode += `\n        ${propKey}={t('${translationKey}')}`;
      } else if (typeof propValue === 'boolean') {
        propsCode += propValue ? `\n        ${propKey}` : `\n        ${propKey}={false}`;
      } else if (Array.isArray(propValue)) {
        // 处理数组类型（如导航菜单）
        const processedArray = this.processArrayProp(propValue, `${componentPrefix}.${propKey}`);
        propsCode += `\n        ${propKey}={${processedArray}}`;
      } else if (typeof propValue === 'object' && propValue !== null) {
        // 处理对象类型
        const processedObject = this.processObjectProp(propValue, `${componentPrefix}.${propKey}`);
        propsCode += `\n        ${propKey}={${processedObject}}`;
      } else {
        propsCode += `\n        ${propKey}={${JSON.stringify(propValue)}}`;
      }
    });

    return propsCode;
  }

  /**
   * 处理数组属性
   */
  private processArrayProp(array: any[], keyPrefix: string): string {
    const processedItems = array.map((item, index) => {
      if (typeof item === 'string' && this.isChineseText(item)) {
        const translationKey = `${keyPrefix}.${index}`;
        this.addTranslationKey(translationKey, item);
        return `t('${translationKey}')`;
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
      if (typeof value === 'string' && this.isChineseText(value)) {
        const translationKey = `${keyPrefix}.${key}`;
        this.addTranslationKey(translationKey, value);
        return `${key}: t('${translationKey}')`;
      }
      return `${key}: ${JSON.stringify(value)}`;
    });

    return `{${processedEntries.join(', ')}}`;
  }

  /**
   * 判断是否包含中文文本
   */
  private isChineseText(text: string): boolean {
    return /[\u4e00-\u9fa5]/.test(text);
  }

  /**
   * 获取组件的导入路径和名称
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

    // 收集所有需要的导入
    const imports = new Set<string>();
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

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations('homepage');

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

    // 生成翻译文件信息
    const translationFiles = {
      zhFilePath: 'messages/zh/homepage.json',
      enFilePath: 'messages/en/homepage.json',
      zhContent: JSON.stringify(zhTranslations, null, 2),
      enContent: JSON.stringify(enTranslations, null, 2)
    };

    return {
      tsxCode,
      zhTranslations,
      enTranslations,
      translationKeys: this.translationKeys,
      translationFiles
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
}

/**
 * 导出生成器实例
 */
export const i18nPageGenerator = new I18nPageGenerator();