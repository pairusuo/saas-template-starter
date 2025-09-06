/**
 * Landing Page 发布和管理系统
 */

import { LandingPageConfig, PaymentPlan, PaymentConfig } from '@/types/payment';

export interface LandingPageData {
  id: string;
  slug: string;
  title: string;
  description?: string;
  isPublished: boolean;
  config: LandingPageConfig;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // 统计数据
  views: number;
  conversions: number;
  revenue: number;
}

export interface ComponentConfig {
  id: string;
  type: string;
  props: Record<string, any>;
  order: number;
}

/**
 * Landing Page 发布服务
 */
export class LandingPagePublisher {
  /**
   * 创建新的 Landing Page
   */
  static async createLandingPage(data: {
    title: string;
    slug: string;
    userId: string;
    description?: string;
    components: ComponentConfig[];
    paymentConfig?: PaymentConfig;
    plans?: PaymentPlan[];
  }): Promise<LandingPageData> {
    const landingPage: LandingPageData = {
      id: generateId(),
      slug: data.slug,
      title: data.title,
      isPublished: false,
      config: {
        id: generateId(),
        slug: data.slug,
        title: data.title,
        description: data.description || '',
        components: data.components,
        paymentConfig: data.paymentConfig,
        plans: data.plans || [],
        isPublished: false,
      },
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      conversions: 0,
      revenue: 0
    };

    // 保存到数据库
    await this.saveLandingPage(landingPage);
    
    return landingPage;
  }

  /**
   * 更新 Landing Page 配置
   */
  static async updateLandingPage(
    slug: string,
    updates: Partial<LandingPageData>
  ): Promise<LandingPageData> {
    const existing = await this.getLandingPage(slug);
    if (!existing) {
      throw new Error('Landing page not found');
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };

    await this.saveLandingPage(updated);
    return updated;
  }

  /**
   * 发布 Landing Page
   */
  static async publishLandingPage(slug: string): Promise<void> {
    const landingPage = await this.getLandingPage(slug);
    if (!landingPage) {
      throw new Error('Landing page not found');
    }

    // 验证必要配置
    this.validateLandingPageForPublish(landingPage);

    // 如果有 pricing 组件，验证支付配置
    const hasPricingComponent = landingPage.config.components.some(
      c => c.type === 'PricingCardsBuilder'
    );

    if (hasPricingComponent) {
      this.validatePaymentConfiguration(landingPage);
    }

    // 发布
    await this.updateLandingPage(slug, { 
      isPublished: true,
      updatedAt: new Date()
    });

    // 生成静态页面（可选）
    await this.generateStaticPage(landingPage);
  }

  /**
   * 取消发布
   */
  static async unpublishLandingPage(slug: string): Promise<void> {
    await this.updateLandingPage(slug, { 
      isPublished: false,
      updatedAt: new Date()
    });
  }

  /**
   * 验证支付配置
   */
  private static validatePaymentConfiguration(landingPage: LandingPageData): void {
    const { paymentConfig, plans } = landingPage.config;

    if (!paymentConfig) {
      throw new Error('Payment configuration is required for pricing components');
    }

    if (!plans || plans.length === 0) {
      throw new Error('At least one pricing plan is required');
    }

    // 验证每个计划都有必要的价格ID
    for (const plan of plans) {
      if (paymentConfig.provider === 'stripe') {
        if (!plan.stripePriceMonthlyId && !plan.stripePriceAnnualId) {
          throw new Error(`Plan ${plan.id} is missing Stripe price IDs`);
        }
      } else if (paymentConfig.provider === 'paddle') {
        if (!plan.paddlePlanMonthlyId && !plan.paddlePlanAnnualId) {
          throw new Error(`Plan ${plan.id} is missing Paddle plan IDs`);
        }
      }
    }

    // 验证环境变量
    this.validatePaymentEnvironment(paymentConfig.provider);
  }

  /**
   * 验证支付环境变量
   */
  private static validatePaymentEnvironment(provider: string): void {
    if (provider === 'stripe') {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY environment variable is required');
      }
      if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
      }
    } else if (provider === 'paddle') {
      if (!process.env.PADDLE_API_KEY) {
        throw new Error('PADDLE_API_KEY environment variable is required');
      }
    }
  }

  /**
   * 验证 Landing Page 是否可以发布
   */
  private static validateLandingPageForPublish(landingPage: LandingPageData): void {
    if (!landingPage.title) {
      throw new Error('Landing page title is required');
    }

    if (!landingPage.config.components || landingPage.config.components.length === 0) {
      throw new Error('Landing page must have at least one component');
    }

    // 验证 slug 的唯一性（排除当前页面）
    // 这里应该调用数据库查询验证
  }

  /**
   * 生成静态页面（可选优化）
   */
  private static async generateStaticPage(landingPage: LandingPageData): Promise<void> {
    // 可以预生成静态HTML文件，提高访问速度
    // 或者使用 Next.js 的 ISR (Incremental Static Regeneration)
    
    try {
      // 触发页面预渲染
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            path: `/landing/${landingPage.slug}` 
          })
        }
      );

      if (!response.ok) {
        console.warn('Failed to trigger page revalidation');
      }
    } catch (error) {
      console.warn('Page revalidation error:', error);
    }
  }

  /**
   * 获取 Landing Page
   */
  static async getLandingPage(slug: string): Promise<LandingPageData | null> {
    // 这里应该从数据库查询
    // 暂时返回示例数据
    return null;
  }

  /**
   * 保存 Landing Page 到数据库
   */
  private static async saveLandingPage(landingPage: LandingPageData): Promise<void> {
    // 实际实现应该保存到数据库
    console.log('Saving landing page:', landingPage.slug);
  }

  /**
   * 删除 Landing Page
   */
  static async deleteLandingPage(slug: string): Promise<void> {
    const landingPage = await this.getLandingPage(slug);
    if (!landingPage) {
      throw new Error('Landing page not found');
    }

    // 如果已发布，先取消发布
    if (landingPage.isPublished) {
      await this.unpublishLandingPage(slug);
    }

    // 删除数据库记录
    // await database.delete('landing_pages', { slug });
  }

  /**
   * 获取用户的所有 Landing Pages
   */
  static async getUserLandingPages(userId: string): Promise<LandingPageData[]> {
    // 从数据库查询用户的所有页面
    return [];
  }

  /**
   * 克隆 Landing Page
   */
  static async cloneLandingPage(
    sourceSlug: string, 
    newSlug: string, 
    userId: string
  ): Promise<LandingPageData> {
    const source = await this.getLandingPage(sourceSlug);
    if (!source) {
      throw new Error('Source landing page not found');
    }

    return this.createLandingPage({
      title: `${source.title} (Copy)`,
      slug: newSlug,
      userId,
      components: source.config.components,
      paymentConfig: source.config.paymentConfig,
      plans: source.config.plans
    });
  }
}

/**
 * Landing Page 分析服务
 */
export class LandingPageAnalytics {
  /**
   * 记录页面访问
   */
  static async recordPageView(slug: string, metadata?: Record<string, any>): Promise<void> {
    // 记录访问统计
    await this.incrementCounter(slug, 'views');
    
    // 记录详细访问日志
    await this.logEvent({
      type: 'page_view',
      pageSlug: slug,
      timestamp: new Date(),
      metadata
    });
  }

  /**
   * 记录转化事件（用户选择了套餐）
   */
  static async recordConversion(
    slug: string, 
    planId: string, 
    amount: number
  ): Promise<void> {
    await this.incrementCounter(slug, 'conversions');
    await this.incrementCounter(slug, 'revenue', amount);

    await this.logEvent({
      type: 'conversion',
      pageSlug: slug,
      planId,
      amount,
      timestamp: new Date()
    });
  }

  /**
   * 获取页面统计数据
   */
  static async getPageStats(slug: string): Promise<{
    views: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
  }> {
    const landingPage = await LandingPagePublisher.getLandingPage(slug);
    if (!landingPage) {
      throw new Error('Landing page not found');
    }

    const conversionRate = landingPage.views > 0 
      ? (landingPage.conversions / landingPage.views) * 100 
      : 0;

    return {
      views: landingPage.views,
      conversions: landingPage.conversions,
      revenue: landingPage.revenue,
      conversionRate
    };
  }

  private static async incrementCounter(
    slug: string, 
    field: string, 
    amount: number = 1
  ): Promise<void> {
    // 更新数据库中的计数器
  }

  private static async logEvent(event: Record<string, any>): Promise<void> {
    // 记录事件到分析数据库
  }
}

// 工具函数
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
