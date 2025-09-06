import fs from 'fs';
import path from 'path';
import { TranslationService, createTranslationService, TranslationConfig } from '@/lib/translation-service';

/**
 * 翻译管理器 - 负责组件属性的实时翻译和翻译文件更新
 */
export class TranslationManager {
  private messagesDir: string;
  private translationService: TranslationService | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.messagesDir = path.join(process.cwd(), 'messages');
    this.initializeTranslationService();
  }

  /**
   * 初始化翻译服务
   */
  private initializeTranslationService(): void {
    try {
      // 从环境变量读取翻译服务配置
      const provider = (process.env.TRANSLATION_PROVIDER as any) || 'google';
      const apiKey = this.getApiKeyForProvider(provider);
      
      if (!apiKey) {
        console.warn('Translation API key not found. Translation features will be limited.');
        return;
      }

      const config: TranslationConfig = {
        provider,
        apiKey,
        region: process.env.AZURE_TRANSLATOR_REGION,
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo'
      };

      this.translationService = createTranslationService(config);
      this.isConfigured = true;
      
      console.log(`Translation service initialized with ${this.translationService.getProviderInfo()}`);
    } catch (error) {
      console.error('Failed to initialize translation service:', error);
      this.isConfigured = false;
    }
  }

  /**
   * 根据提供商获取API密钥
   */
  private getApiKeyForProvider(provider: string): string | undefined {
    switch (provider) {
      case 'google':
        return process.env.GOOGLE_TRANSLATE_API_KEY;
      case 'deepl':
        return process.env.DEEPL_API_KEY;
      case 'azure':
        return process.env.AZURE_TRANSLATOR_KEY;
      case 'openai':
        return process.env.OPENAI_API_KEY;
      default:
        return undefined;
    }
  }

  /**
   * 检测文本是否包含中文
   */
  private containsChinese(text: string): boolean {
    return /[\u4e00-\u9fff]/.test(text);
  }

  /**
   * 使用专业API翻译文本
   */
  private async translateWithAPI(text: string, targetLang: 'en' | 'zh', sourceLang?: string): Promise<string> {
    if (!this.isConfigured || !this.translationService) {
      console.warn('Translation service not configured, returning original text');
      return text;
    }

    try {
      const result = await this.translationService.translate(text, targetLang, sourceLang);
      return result;
    } catch (error) {
      console.error('Translation API failed:', error);
      return text; // 失败时返回原文
    }
  }

  /**
   * 读取翻译文件
   */
  private readTranslationFile(locale: string, component: string): Record<string, any> {
    // List of page-builder namespaces that are in the page-builder subdirectory
    const pageBuilderNamespaces = [
      'header-basic', 'footer-basic', 'hero-simple', 'hero-centered', 'components-showcase', 
      'basic-components', 'advanced-components', 'custom-components', 'page-builder', 'pricing-cards',
      'cta', 'features', 'testimonials', 'faq', 'stats', 'social-proof', 'contact'
    ];

    const isPageBuilder = pageBuilderNamespaces.includes(component);
    const filePath = isPageBuilder 
      ? path.join(this.messagesDir, 'page-builder', locale, `${component}.json`)
      : path.join(this.messagesDir, locale, `${component}.json`);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn(`Failed to read translation file: ${filePath}`, error);
    }
    
    return {};
  }

  /**
   * 写入翻译文件
   */
  private writeTranslationFile(locale: string, component: string, data: Record<string, any>): void {
    // List of page-builder namespaces that are in the page-builder subdirectory
    const pageBuilderNamespaces = [
      'header-basic', 'footer-basic', 'hero-simple', 'hero-centered', 'components-showcase', 
      'basic-components', 'advanced-components', 'custom-components', 'page-builder', 'pricing-cards',
      'cta', 'features', 'testimonials', 'faq', 'stats', 'social-proof', 'contact'
    ];

    const isPageBuilder = pageBuilderNamespaces.includes(component);
    const dirPath = isPageBuilder
      ? path.join(this.messagesDir, 'page-builder', locale)
      : path.join(this.messagesDir, locale);
    const filePath = path.join(dirPath, `${component}.json`);
    
    try {
      // 确保目录存在
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Failed to write translation file: ${filePath}`, error);
      throw error;
    }
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
   * 递归翻译对象中的文本内容
   */
  private async translateObject(obj: any, targetLang: 'en' | 'zh', sourceLang?: string): Promise<any> {
    if (!this.isConfigured || !this.translationService) {
      console.warn('Translation service not configured');
      return obj;
    }

    try {
      return await this.translationService.translateObject(obj, targetLang, sourceLang);
    } catch (error) {
      console.error('Object translation failed:', error);
      return obj; // 失败时返回原对象
    }
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
   * 更新组件翻译
   * @param componentType 组件类型
   * @param componentId 组件ID
   * @param props 组件属性
   * @param currentLocale 当前语言环境
   */
  public async updateComponentTranslation(
    componentType: string,
    componentId: string,
    props: Record<string, any>,
    currentLocale: string = 'zh'
  ): Promise<{
    success: boolean;
    updatedFiles: string[];
    translationKeys: Record<string, any>;
  }> {
    try {
      const componentFile = this.getComponentTranslationFile(componentType);
      const updatedFiles: string[] = [];
      const translationKeys: Record<string, any> = {};

      // 为每种语言更新翻译文件
      const locales = ['zh', 'en'];
      
      for (const locale of locales) {
        // 读取现有翻译文件
        const existingTranslations = this.readTranslationFile(locale, componentFile);
        
        // 生成翻译内容
        let translatedProps: Record<string, any>;
        
        if (locale === currentLocale) {
          // 当前语言直接使用原始属性
          translatedProps = props;
        } else {
          // 其他语言进行翻译
          const targetLang = locale as 'en' | 'zh';
          const sourceLang = currentLocale;
          translatedProps = await this.translateObject(props, targetLang, sourceLang);
        }

        // 创建组件特定的翻译键
        const componentKey = `${componentType}_${componentId}`;
        const newTranslations = {
          ...existingTranslations,
          [componentKey]: translatedProps
        };

        // 写入翻译文件
        this.writeTranslationFile(locale, componentFile, newTranslations);
        
        // List of page-builder namespaces to determine correct file path
        const pageBuilderNamespaces = [
          'header-basic', 'footer-basic', 'hero-simple', 'hero-centered', 'components-showcase', 
          'basic-components', 'advanced-components', 'custom-components', 'page-builder'
        ];
        
        const isPageBuilder = pageBuilderNamespaces.includes(componentFile);
        const filePath = isPageBuilder 
          ? `messages/page-builder/${locale}/${componentFile}.json`
          : `messages/${locale}/${componentFile}.json`;
        
        updatedFiles.push(filePath);
        
        if (locale === 'zh') {
          translationKeys[componentKey] = translatedProps;
        }
      }

      return {
        success: true,
        updatedFiles,
        translationKeys
      };
    } catch (error) {
      console.error('Failed to update component translation:', error);
      return {
        success: false,
        updatedFiles: [],
        translationKeys: {}
      };
    }
  }

  /**
   * 批量更新多个组件的翻译
   */
  public async updateMultipleComponentTranslations(
    components: Array<{
      type: string;
      id: string;
      props: Record<string, any>;
    }>,
    currentLocale: string = 'zh'
  ): Promise<{
    success: boolean;
    updatedFiles: string[];
    translationKeys: Record<string, any>;
  }> {
    const allUpdatedFiles: string[] = [];
    const allTranslationKeys: Record<string, any> = {};

    try {
      for (const component of components) {
        const result = await this.updateComponentTranslation(
          component.type,
          component.id,
          component.props,
          currentLocale
        );

        if (result.success) {
          allUpdatedFiles.push(...result.updatedFiles);
          Object.assign(allTranslationKeys, result.translationKeys);
        }
      }

      // 去重文件列表
      const uniqueFiles = [...new Set(allUpdatedFiles)];

      return {
        success: true,
        updatedFiles: uniqueFiles,
        translationKeys: allTranslationKeys
      };
    } catch (error) {
      console.error('Failed to update multiple component translations:', error);
      return {
        success: false,
        updatedFiles: [],
        translationKeys: {}
      };
    }
  }

  /**
   * 清理未使用的翻译键
   */
  public async cleanupUnusedTranslations(
    activeComponents: Array<{ type: string; id: string }>,
    currentLocale: string = 'zh'
  ): Promise<void> {
    const locales = ['zh', 'en'];
    const componentFiles = new Set(
      activeComponents.map(comp => this.getComponentTranslationFile(comp.type))
    );

    for (const locale of locales) {
      for (const componentFile of componentFiles) {
        const existingTranslations = this.readTranslationFile(locale, componentFile);
        const activeKeys = new Set(
          activeComponents
            .filter(comp => this.getComponentTranslationFile(comp.type) === componentFile)
            .map(comp => `${comp.type}_${comp.id}`)
        );

        // 过滤出仍在使用的翻译键
        const cleanedTranslations: Record<string, any> = {};
        for (const [key, value] of Object.entries(existingTranslations)) {
          if (activeKeys.has(key) || !key.includes('_')) {
            // 保留活跃的组件翻译和非组件特定的翻译
            cleanedTranslations[key] = value;
          }
        }

        // 如果有变化，写回文件
        if (Object.keys(cleanedTranslations).length !== Object.keys(existingTranslations).length) {
          this.writeTranslationFile(locale, componentFile, cleanedTranslations);
        }
      }
    }
  }

  /**
   * 获取翻译服务状态
   */
  public getServiceStatus(): {
    isConfigured: boolean;
    provider?: string;
    supportedLanguages?: string[];
  } {
    return {
      isConfigured: this.isConfigured,
      provider: this.translationService?.getProviderInfo(),
      supportedLanguages: this.translationService?.getSupportedLanguages()
    };
  }

  /**
   * 手动翻译文本
   */
  public async translateText(
    text: string, 
    targetLang: 'en' | 'zh', 
    sourceLang?: string
  ): Promise<string> {
    return await this.translateWithAPI(text, targetLang, sourceLang);
  }

  /**
   * 批量翻译整个页面布局
   */
  public async translatePageLayout(
    components: Array<{
      type: string;
      id: string;
      props: Record<string, any>;
    }>,
    targetLang: 'en' | 'zh',
    sourceLang: string = 'zh'
  ): Promise<Array<{
    type: string;
    id: string;
    props: Record<string, any>;
  }>> {
    if (!this.isConfigured || !this.translationService) {
      console.warn('Translation service not configured');
      return components;
    }

    const translatedComponents = [];

    for (const component of components) {
      try {
        const translatedProps = await this.translateObject(component.props, targetLang, sourceLang);
        translatedComponents.push({
          ...component,
          props: translatedProps
        });
      } catch (error) {
        console.error(`Failed to translate component ${component.id}:`, error);
        translatedComponents.push(component); // 失败时使用原组件
      }
    }

    return translatedComponents;
  }
}

// 导出单例实例
export const translationManager = new TranslationManager();