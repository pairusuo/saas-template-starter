import { PageLayout } from '@/types/page-builder';
import { translationManager } from './translation-manager';

/**
 * 智能页面生成器 - 生成符合现有国际化系统的page.tsx
 */
export class SmartPageGenerator {
  
  /**
   * 生成组件的翻译键路径
   */
  private generateTranslationKey(componentType: string, componentId: string, propKey: string): string {
    const componentFile = this.getComponentTranslationFile(componentType);
    return `${componentFile}.${componentType}_${componentId}.${propKey}`;
  }

  /**
   * 根据组件类型获取对应的翻译文件名
   */
  private getComponentTranslationFile(componentType: string): string {
    const typeMapping: Record<string, string> = {
      'hero-simple': 'hero',
      'hero-centered': 'hero',
      'header-basic': 'header',
      'footer-basic': 'footer',
      'features-grid': 'features',
      'features-list': 'features',
      'stats-minimal': 'stats',
      'stats-basic': 'stats',
      'testimonials-simple': 'testimonials',
      'testimonials-grid': 'testimonials',
      'social-proof-avatars': 'social-proof',
      'social-proof-logos': 'social-proof',
    };
    
    return typeMapping[componentType] || componentType.split('-')[0];
  }

  /**
   * 生成组件的JSX代码
   */
  private generateComponentJSX(component: any, locale: string): string {
    const { type, id, props } = component;
    const componentFile = this.getComponentTranslationFile(type);
    
    // 根据组件类型生成对应的JSX
    switch (type) {
      case 'hero-simple':
        return this.generateHeroSimpleJSX(component, componentFile, locale);
      case 'hero-centered':
        return this.generateHeroCenteredJSX(component, componentFile, locale);
      case 'header-basic':
        return this.generateHeaderBasicJSX(component, componentFile, locale);
      case 'footer-basic':
        return this.generateFooterBasicJSX(component, componentFile, locale);
      case 'features-grid':
        return this.generateFeaturesGridJSX(component, componentFile, locale);
      case 'stats-basic':
        return this.generateStatsBasicJSX(component, componentFile, locale);
      case 'testimonials-simple':
        return this.generateTestimonialsSimpleJSX(component, componentFile, locale);
      case 'social-proof-avatars':
        return this.generateSocialProofAvatarsJSX(component, componentFile, locale);
      default:
        return `{/* 未知组件类型: ${type} */}`;
    }
  }

  /**
   * 生成Hero Simple组件的JSX
   */
  private generateHeroSimpleJSX(component: any, componentFile: string, locale: string): string {
    const { id, props } = component;
    const translationPrefix = `${componentFile}.hero-simple_${id}`;
    
    return `
        {/* Hero Simple 组件 */}
        <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('${translationPrefix}.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('${translationPrefix}.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {t('${translationPrefix}.primaryButtonText')}
                </a>
                ${props.showSecondaryButton ? `
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium"
                >
                  {t('${translationPrefix}.secondaryButtonText')}
                </a>
                ` : ''}
              </div>
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成Hero Centered组件的JSX
   */
  private generateHeroCenteredJSX(component: any, componentFile: string, locale: string): string {
    const { id, props } = component;
    const translationPrefix = `${componentFile}.hero-centered_${id}`;
    
    return `
        {/* Hero Centered 组件 */}
        <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            ${props.badge ? `
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground mb-6">
              {t('${translationPrefix}.badge')}
            </div>
            ` : ''}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('${translationPrefix}.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('${translationPrefix}.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                {t('${translationPrefix}.primaryButtonText')}
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors font-medium"
              >
                {t('${translationPrefix}.secondaryButtonText')}
              </a>
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成Header Basic组件的JSX
   */
  private generateHeaderBasicJSX(component: any, componentFile: string, locale: string): string {
    const { id, props } = component;
    const translationPrefix = `${componentFile}.header-basic_${id}`;
    
    return `
        {/* Header Basic 组件 */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">
                  {t('${translationPrefix}.logo')}
                </a>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                ${Array.isArray(props.navigation) ? props.navigation.map((item: any, index: number) => `
                <a 
                  href="${item.href || '#'}" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('${translationPrefix}.navigation.${index}.label')}
                </a>
                `).join('') : ''}
              </nav>

              ${props.showCTA ? `
              <div className="flex items-center">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  {t('${translationPrefix}.ctaText')}
                </a>
              </div>
              ` : ''}
            </div>
          </div>
        </header>`;
  }

  /**
   * 生成Footer Basic组件的JSX
   */
  private generateFooterBasicJSX(component: any, componentFile: string, locale: string): string {
    const { id, props } = component;
    const translationPrefix = `${componentFile}.footer-basic_${id}`;
    
    return `
        {/* Footer Basic 组件 */}
        <footer className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  {t('${translationPrefix}.companyName')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('${translationPrefix}.description')}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">链接</h4>
                <ul className="space-y-2">
                  ${Array.isArray(props.links) ? props.links.map((link: any, index: number) => `
                  <li>
                    <a 
                      href="${link.href || '#'}" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t('${translationPrefix}.links.${index}.label')}
                    </a>
                  </li>
                  `).join('') : ''}
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {t('${translationPrefix}.copyright')}
              </p>
            </div>
          </div>
        </footer>`;
  }

  /**
   * 生成Features Grid组件的JSX
   */
  private generateFeaturesGridJSX(component: any, componentFile: string, locale: string): string {
    return `
        {/* Features Grid 组件 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('features.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 功能特性项目会在这里渲染 */}
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成Stats Basic组件的JSX
   */
  private generateStatsBasicJSX(component: any, componentFile: string, locale: string): string {
    return `
        {/* Stats Basic 组件 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {/* 统计数据项目会在这里渲染 */}
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成Testimonials Simple组件的JSX
   */
  private generateTestimonialsSimpleJSX(component: any, componentFile: string, locale: string): string {
    return `
        {/* Testimonials Simple 组件 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('testimonials.title')}</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {/* 用户评价内容会在这里渲染 */}
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成Social Proof Avatars组件的JSX
   */
  private generateSocialProofAvatarsJSX(component: any, componentFile: string, locale: string): string {
    return `
        {/* Social Proof Avatars 组件 */}
        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              {/* 用户头像会在这里渲染 */}
            </div>
          </div>
        </section>`;
  }

  /**
   * 生成完整的page.tsx文件
   */
  public async generatePageFile(
    layout: PageLayout,
    currentLocale: string = 'zh'
  ): Promise<{
    success: boolean;
    pageContent: string;
    translationFiles: string[];
    error?: string;
  }> {
    try {
      // 首先更新所有组件的翻译
      const components = layout.components.map(comp => ({
        type: comp.type,
        id: comp.id,
        props: comp.props
      }));

      const translationResult = await translationManager.updateMultipleComponentTranslations(
        components,
        currentLocale
      );

      if (!translationResult.success) {
        return {
          success: false,
          pageContent: '',
          translationFiles: [],
          error: '翻译文件更新失败'
        };
      }

      // 生成需要导入的翻译文件列表
      const translationFiles = new Set<string>();
      layout.components.forEach(comp => {
        const file = this.getComponentTranslationFile(comp.type);
        translationFiles.add(file);
      });

      // 生成页面内容
      const pageContent = this.generatePageContent(layout, currentLocale, Array.from(translationFiles));

      return {
        success: true,
        pageContent,
        translationFiles: translationResult.updatedFiles,
      };
    } catch (error) {
      console.error('Page generation failed:', error);
      return {
        success: false,
        pageContent: '',
        translationFiles: [],
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  }

  /**
   * 生成页面内容
   */
  private generatePageContent(layout: PageLayout, locale: string, translationFiles: string[]): string {
    // 生成导入语句
    const imports = [
      `import { getTranslations } from 'next-intl/server';`,
      ...translationFiles.map(file => `// 使用 ${file} 翻译文件`)
    ].join('\n');

    // 生成组件JSX
    const componentsJSX = layout.components
      .map(comp => this.generateComponentJSX(comp, locale))
      .join('\n');

    // 生成完整页面
    return `${imports}

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // 获取翻译函数
${translationFiles.map(file => `  const t${file.charAt(0).toUpperCase() + file.slice(1)} = await getTranslations('${file}');`).join('\n')}
  const t = await getTranslations('homepage');

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
${componentsJSX}
      </main>
    </div>
  );
}`;
  }
}

// 导出单例实例
export const smartPageGenerator = new SmartPageGenerator();