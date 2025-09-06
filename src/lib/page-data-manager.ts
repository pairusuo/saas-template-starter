/**
 * 页面构建器数据管理和一键应用功能
 */

import { PageData, ComponentInstance } from '@/types/unified-components';

// 页面数据存储接口
export interface PageStorage {
  // 保存页面数据
  savePage(pageData: PageData): Promise<void>;
  
  // 获取页面数据
  getPage(pageId: string): Promise<PageData | null>;
  
  // 获取项目主页数据
  getProjectHomePage(locale: string): Promise<PageData | null>;
  
  // 应用构建结果到项目主页
  applyToProjectHome(pageData: PageData): Promise<void>;
  
  // 列出所有页面
  listPages(): Promise<PageData[]>;
}

// 本地存储实现
export class LocalPageStorage implements PageStorage {
  private storageKey = 'saas-template-page-builder';
  
  async savePage(pageData: PageData): Promise<void> {
    const existingData = this.getStorageData();
    existingData.pages[pageData.id] = pageData;
    existingData.lastModified = new Date().toISOString();
    
    localStorage.setItem(this.storageKey, JSON.stringify(existingData));
  }
  
  async getPage(pageId: string): Promise<PageData | null> {
    const data = this.getStorageData();
    return data.pages[pageId] || null;
  }
  
  async getProjectHomePage(locale: string): Promise<PageData | null> {
    const data = this.getStorageData();
    const homePageId = `project-home-${locale}`;
    
    // 如果没有自定义主页数据，返回默认配置
    if (!data.pages[homePageId]) {
      return this.getDefaultProjectHomePage(locale);
    }
    
    return data.pages[homePageId];
  }
  
  async applyToProjectHome(pageData: PageData): Promise<void> {
    const homePageId = `project-home-${pageData.locale}`;
    const homePageData: PageData = {
      ...pageData,
      id: homePageId,
      name: `项目主页 (${pageData.locale.toUpperCase()})`
    };
    
    await this.savePage(homePageData);
    
    // 触发主页重新渲染
    this.notifyHomePageUpdate(pageData.locale);
  }
  
  async listPages(): Promise<PageData[]> {
    const data = this.getStorageData();
    return Object.values(data.pages);
  }
  
  private getStorageData() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return { pages: {}, lastModified: new Date().toISOString() };
    }
    return JSON.parse(stored);
  }
  
  private getDefaultProjectHomePage(locale: string): PageData {
    return {
      id: `project-home-${locale}`,
      name: `项目主页 (${locale.toUpperCase()})`,
      locale,
      components: [
        {
          id: 'hero-1',
          type: 'hero-section',
          position: 0,
          props: {
            variant: 'centered',
            showCTA: true
          }
        },
        {
          id: 'features-1',
          type: 'features-section',
          position: 1,
          props: {
            layout: 'grid',
            columns: 3,
            showIcons: true
          }
        },
        {
          id: 'stats-1',
          type: 'stats-section',
          position: 2,
          props: {
            variant: 'simple',
            showIcons: true
          }
        },
        {
          id: 'cta-1',
          type: 'cta-section',
          position: 3,
          props: {
            variant: 'simple',
            showSecondaryAction: true,
            backgroundVariant: 'gradient'
          }
        }
      ],
      settings: {
        seo: {
          title: locale === 'zh' ? 'SaaS Landing Page 模板' : 'SaaS Landing Page Templates',
          description: locale === 'zh' 
            ? '基于 Next.js 14 的现代化 SaaS Landing Page 模板集合' 
            : 'Modern SaaS Landing Page templates built with Next.js 14'
        }
      }
    };
  }
  
  private notifyHomePageUpdate(locale: string) {
    // 发送自定义事件，通知主页组件重新渲染
    window.dispatchEvent(new CustomEvent('homepage-updated', { 
      detail: { locale } 
    }));
  }
}

// 页面数据管理器
export class PageDataManager {
  private storage: PageStorage;
  
  constructor(storage: PageStorage = new LocalPageStorage()) {
    this.storage = storage;
  }
  
  /**
   * 将构建器数据转换为页面数据
   */
  builderToPageData(
    builderComponents: any[], 
    locale: string, 
    name: string = '自定义页面'
  ): PageData {
    const components: ComponentInstance[] = builderComponents.map((comp, index) => ({
      id: comp.id || `comp-${index}`,
      type: comp.type,
      position: index,
      props: comp.props || {},
      customContent: comp.customContent
    }));
    
    return {
      id: `custom-${Date.now()}`,
      name,
      locale,
      components,
      settings: {
        seo: {
          title: name,
          description: `使用页面构建器创建的${name}`
        }
      }
    };
  }
  
  /**
   * 应用构建结果到项目主页
   */
  async applyToProjectHome(builderComponents: any[], locale: string): Promise<void> {
    const pageData = this.builderToPageData(builderComponents, locale, '项目主页');
    await this.storage.applyToProjectHome(pageData);
  }
  
  /**
   * 获取项目主页数据用于渲染
   */
  async getProjectHomePageData(locale: string): Promise<PageData> {
    const pageData = await this.storage.getProjectHomePage(locale);
    if (!pageData) {
      throw new Error(`未找到 ${locale} 语言的项目主页数据`);
    }
    return pageData;
  }
  
  /**
   * 保存构建器页面
   */
  async saveBuilderPage(builderComponents: any[], locale: string, name: string): Promise<string> {
    const pageData = this.builderToPageData(builderComponents, locale, name);
    await this.storage.savePage(pageData);
    return pageData.id;
  }
  
  /**
   * 获取所有保存的页面
   */
  async getSavedPages(): Promise<PageData[]> {
    return this.storage.listPages();
  }
}

// 全局实例
export const pageDataManager = new PageDataManager();