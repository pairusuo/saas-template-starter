/**
 * 订阅管理系统
 * 处理用户订阅的创建、更新、取消等操作
 */

import { PaymentService } from '@/lib/payment/providers';
import { PaymentConfig } from '@/types/payment';

export interface Subscription {
  id: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  userId?: string;
  pageSlug: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';
  isAnnual: boolean;
  amount: number;
  currency: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  stripeCustomerId: string;
  email: string;
  name: string;
  userId?: string;
  pageSlug: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 订阅管理服务
 */
export class SubscriptionManager {
  /**
   * 创建订阅
   */
  static async createSubscription(data: {
    stripeSubscriptionId: string;
    stripeCustomerId: string;
    pageSlug: string;
    planId: string;
    isAnnual: boolean;
    status: string;
    amount: number;
    currency: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
  }): Promise<Subscription> {
    const subscription: Subscription = {
      id: generateId(),
      stripeSubscriptionId: data.stripeSubscriptionId,
      stripeCustomerId: data.stripeCustomerId,
      pageSlug: data.pageSlug,
      planId: data.planId,
      status: data.status as Subscription['status'],
      isAnnual: data.isAnnual,
      amount: data.amount,
      currency: data.currency,
      currentPeriodStart: data.currentPeriodStart || new Date(),
      currentPeriodEnd: data.currentPeriodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.saveSubscription(subscription);
    return subscription;
  }

  /**
   * 获取订阅详情
   */
  static async getSubscription(id: string): Promise<Subscription | null> {
    // 从数据库获取订阅信息
    return this.loadSubscription(id);
  }

  /**
   * 根据 Stripe 订阅 ID 获取订阅
   */
  static async getSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
    // 从数据库查询
    return this.loadSubscriptionByStripeId(stripeSubscriptionId);
  }

  /**
   * 获取用户的所有订阅
   */
  static async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    // 从数据库查询用户的所有订阅
    return this.loadUserSubscriptions(userId);
  }

  /**
   * 获取页面的所有订阅（用于分析）
   */
  static async getPageSubscriptions(pageSlug: string): Promise<Subscription[]> {
    // 从数据库查询页面的所有订阅
    return this.loadPageSubscriptions(pageSlug);
  }

  /**
   * 更新订阅状态
   */
  static async updateSubscriptionStatus(
    stripeSubscriptionId: string, 
    status: Subscription['status']
  ): Promise<void> {
    const subscription = await this.getSubscriptionByStripeId(stripeSubscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = status;
    subscription.updatedAt = new Date();

    await this.saveSubscription(subscription);
  }

  /**
   * 更新订阅详情
   */
  static async updateSubscriptionDetails(data: {
    stripeSubscriptionId: string;
    status?: Subscription['status'];
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
  }): Promise<void> {
    const subscription = await this.getSubscriptionByStripeId(data.stripeSubscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (data.status) subscription.status = data.status;
    if (data.currentPeriodStart) subscription.currentPeriodStart = data.currentPeriodStart;
    if (data.currentPeriodEnd) subscription.currentPeriodEnd = data.currentPeriodEnd;
    if (data.cancelAtPeriodEnd !== undefined) subscription.cancelAtPeriodEnd = data.cancelAtPeriodEnd;
    
    subscription.updatedAt = new Date();

    await this.saveSubscription(subscription);
  }

  /**
   * 取消订阅
   */
  static async cancelSubscription(
    subscriptionId: string, 
    paymentConfig: PaymentConfig
  ): Promise<void> {
    const subscription = await this.getSubscription(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // 通过支付提供商取消订阅
    const success = await PaymentService.cancelSubscription(
      paymentConfig,
      subscription.stripeSubscriptionId
    );

    if (!success) {
      throw new Error('Failed to cancel subscription with payment provider');
    }

    // 更新本地状态
    subscription.status = 'canceled';
    subscription.updatedAt = new Date();

    await this.saveSubscription(subscription);
  }

  /**
   * 检查订阅是否有效
   */
  static isSubscriptionActive(subscription: Subscription): boolean {
    const now = new Date();
    return (
      subscription.status === 'active' &&
      subscription.currentPeriodEnd > now
    );
  }

  /**
   * 获取订阅的剩余天数
   */
  static getSubscriptionDaysLeft(subscription: Subscription): number {
    const now = new Date();
    const diffTime = subscription.currentPeriodEnd.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * 计算订阅的总收入
   */
  static async calculatePageRevenue(pageSlug: string): Promise<{
    totalRevenue: number;
    monthlyRevenue: number;
    activeSubscriptions: number;
  }> {
    const subscriptions = await this.getPageSubscriptions(pageSlug);
    
    let totalRevenue = 0;
    let monthlyRevenue = 0;
    let activeSubscriptions = 0;

    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const subscription of subscriptions) {
      // 计算总收入
      if (subscription.status === 'active' || subscription.status === 'canceled') {
        totalRevenue += subscription.amount;
      }

      // 计算本月收入
      if (subscription.createdAt >= monthAgo) {
        monthlyRevenue += subscription.amount;
      }

      // 统计活跃订阅
      if (this.isSubscriptionActive(subscription)) {
        activeSubscriptions++;
      }
    }

    return {
      totalRevenue: totalRevenue / 100, // 转换为美元
      monthlyRevenue: monthlyRevenue / 100,
      activeSubscriptions,
    };
  }

  // ===== 私有方法 =====

  private static async saveSubscription(subscription: Subscription): Promise<void> {
    // 实际实现中应该保存到数据库
    // 这里使用文件系统作为示例
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const subscriptionsDir = path.join(process.cwd(), 'data/subscriptions');
      await fs.mkdir(subscriptionsDir, { recursive: true });
      
      const subscriptionFile = path.join(subscriptionsDir, `${subscription.id}.json`);
      await fs.writeFile(subscriptionFile, JSON.stringify(subscription, null, 2));
      
      console.log('Subscription saved:', subscription.id);
    } catch (error) {
      console.error('Failed to save subscription:', error);
      throw error;
    }
  }

  private static async loadSubscription(id: string): Promise<Subscription | null> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const subscriptionFile = path.join(process.cwd(), 'data/subscriptions', `${id}.json`);
      const data = await fs.readFile(subscriptionFile, 'utf-8');
      
      const subscription = JSON.parse(data);
      // 转换日期字符串为 Date 对象
      subscription.currentPeriodStart = new Date(subscription.currentPeriodStart);
      subscription.currentPeriodEnd = new Date(subscription.currentPeriodEnd);
      subscription.createdAt = new Date(subscription.createdAt);
      subscription.updatedAt = new Date(subscription.updatedAt);
      
      return subscription;
    } catch (error) {
      console.error('Failed to load subscription:', error);
      return null;
    }
  }

  private static async loadSubscriptionByStripeId(stripeSubscriptionId: string): Promise<Subscription | null> {
    // 实际实现中应该通过数据库索引查询
    // 这里遍历所有文件作为示例
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const subscriptionsDir = path.join(process.cwd(), 'data/subscriptions');
      const files = await fs.readdir(subscriptionsDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const subscription = await this.loadSubscription(file.replace('.json', ''));
          if (subscription && subscription.stripeSubscriptionId === stripeSubscriptionId) {
            return subscription;
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to load subscription by Stripe ID:', error);
      return null;
    }
  }

  private static async loadUserSubscriptions(userId: string): Promise<Subscription[]> {
    // 实际实现中应该通过数据库查询
    const subscriptions: Subscription[] = [];
    // 这里应该实现数据库查询逻辑
    return subscriptions;
  }

  private static async loadPageSubscriptions(pageSlug: string): Promise<Subscription[]> {
    // 实际实现中应该通过数据库查询
    const subscriptions: Subscription[] = [];
    // 这里应该实现数据库查询逻辑
    return subscriptions;
  }
}

/**
 * 客户管理服务
 */
export class CustomerManager {
  /**
   * 创建或更新客户
   */
  static async createOrUpdateCustomer(data: {
    stripeCustomerId: string;
    email: string;
    name: string;
    pageSlug: string;
    userId?: string;
  }): Promise<Customer> {
    // 先尝试查找现有客户
    let customer = await this.getCustomerByStripeId(data.stripeCustomerId);
    
    if (customer) {
      // 更新现有客户
      customer.email = data.email;
      customer.name = data.name;
      customer.updatedAt = new Date();
    } else {
      // 创建新客户
      customer = {
        id: generateId(),
        stripeCustomerId: data.stripeCustomerId,
        email: data.email,
        name: data.name,
        userId: data.userId,
        pageSlug: data.pageSlug,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    await this.saveCustomer(customer);
    return customer;
  }

  /**
   * 根据 Stripe 客户 ID 获取客户
   */
  static async getCustomerByStripeId(stripeCustomerId: string): Promise<Customer | null> {
    // 实际实现中应该从数据库查询
    return null;
  }

  /**
   * 获取页面的所有客户
   */
  static async getPageCustomers(pageSlug: string): Promise<Customer[]> {
    // 从数据库查询页面的所有客户
    return [];
  }

  private static async saveCustomer(customer: Customer): Promise<void> {
    // 实际实现中应该保存到数据库
    console.log('Saving customer:', customer.stripeCustomerId);
  }
}

// 工具函数
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
