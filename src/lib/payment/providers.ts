/**
 * 支付服务 - 统一支付接口
 */

import { PaymentPlan, PaymentConfig, CheckoutSession } from '@/types/payment';

export abstract class PaymentProvider {
  protected config: PaymentConfig;

  constructor(config: PaymentConfig) {
    this.config = config;
  }

  abstract createCheckoutSession(
    plan: PaymentPlan,
    isAnnual: boolean,
    pageSlug: string,
    metadata?: Record<string, any>
  ): Promise<{ url: string; sessionId: string }>;

  abstract verifyPayment(sessionId: string): Promise<boolean>;
  abstract cancelSubscription(subscriptionId: string): Promise<boolean>;
}

/**
 * Stripe 支付提供商
 */
export class StripeProvider extends PaymentProvider {
  private stripe: any;

  constructor(config: PaymentConfig, stripeSecretKey: string) {
    super(config);
    // 这里需要安装并导入 stripe
    // import Stripe from 'stripe';
    // this.stripe = new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' });
  }

  async createCheckoutSession(
    plan: PaymentPlan,
    isAnnual: boolean,
    pageSlug: string,
    metadata = {}
  ): Promise<{ url: string; sessionId: string }> {
    const priceId = isAnnual ? plan.stripePriceAnnualId : plan.stripePriceMonthlyId;
    
    if (!priceId) {
      throw new Error(`Stripe price ID not configured for plan ${plan.id}`);
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: this.config.mode,
        success_url: this.config.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: this.config.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/landing/${pageSlug}`,
        allow_promotion_codes: this.config.allowPromotionCodes,
        automatic_tax: { enabled: true },
        metadata: {
          planId: plan.id,
          pageSlug,
          isAnnual: isAnnual.toString(),
          ...metadata,
        },
      });

      return {
        url: session.url!,
        sessionId: session.id,
      };
    } catch (error) {
      console.error('Stripe checkout session creation failed:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  async verifyPayment(sessionId: string): Promise<boolean> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return session.payment_status === 'paid';
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      await this.stripe.subscriptions.cancel(subscriptionId);
      return true;
    } catch (error) {
      console.error('Subscription cancellation failed:', error);
      return false;
    }
  }
}

/**
 * Paddle 支付提供商
 */
export class PaddleProvider extends PaymentProvider {
  private apiKey: string;

  constructor(config: PaymentConfig, apiKey: string) {
    super(config);
    this.apiKey = apiKey;
  }

  async createCheckoutSession(
    plan: PaymentPlan,
    isAnnual: boolean,
    pageSlug: string,
    metadata = {}
  ): Promise<{ url: string; sessionId: string }> {
    const planId = isAnnual ? plan.paddlePlanAnnualId : plan.paddlePlanMonthlyId;
    
    if (!planId) {
      throw new Error(`Paddle plan ID not configured for plan ${plan.id}`);
    }

    // Paddle 集成逻辑
    // 这里需要根据 Paddle API 实现
    throw new Error('Paddle integration not implemented yet');
  }

  async verifyPayment(sessionId: string): Promise<boolean> {
    // Paddle 验证逻辑
    throw new Error('Paddle verification not implemented yet');
  }

  async cancelSubscription(subscriptionId: string): Promise<boolean> {
    // Paddle 取消订阅逻辑
    throw new Error('Paddle cancellation not implemented yet');
  }
}

/**
 * 支付服务工厂
 */
export class PaymentService {
  private static providers: Map<string, PaymentProvider> = new Map();

  static registerProvider(name: string, provider: PaymentProvider) {
    this.providers.set(name, provider);
  }

  static getProvider(config: PaymentConfig): PaymentProvider {
    const provider = this.providers.get(config.provider);
    
    if (!provider) {
      throw new Error(`Payment provider ${config.provider} not registered`);
    }

    return provider;
  }

  static async createCheckoutUrl(
    config: PaymentConfig,
    plan: PaymentPlan,
    isAnnual: boolean,
    pageSlug: string,
    metadata?: Record<string, any>
  ): Promise<{ url: string; sessionId: string }> {
    const provider = this.getProvider(config);
    return provider.createCheckoutSession(plan, isAnnual, pageSlug, metadata);
  }

  static async verifyPayment(
    config: PaymentConfig,
    sessionId: string
  ): Promise<boolean> {
    const provider = this.getProvider(config);
    return provider.verifyPayment(sessionId);
  }

  static async cancelSubscription(
    config: PaymentConfig,
    subscriptionId: string
  ): Promise<boolean> {
    const provider = this.getProvider(config);
    return provider.cancelSubscription(subscriptionId);
  }
}

/**
 * 初始化支付提供商
 */
export function initializePaymentProviders() {
  // 注册 Stripe 提供商
  if (process.env.STRIPE_SECRET_KEY) {
    const stripeConfig: PaymentConfig = {
      provider: 'stripe',
      currency: 'USD',
      locale: 'en',
      mode: 'subscription',
    };
    PaymentService.registerProvider(
      'stripe',
      new StripeProvider(stripeConfig, process.env.STRIPE_SECRET_KEY)
    );
  }

  // 注册 Paddle 提供商
  if (process.env.PADDLE_API_KEY) {
    const paddleConfig: PaymentConfig = {
      provider: 'paddle',
      currency: 'USD',
      locale: 'en',
      mode: 'subscription',
    };
    PaymentService.registerProvider(
      'paddle',
      new PaddleProvider(paddleConfig, process.env.PADDLE_API_KEY)
    );
  }
}
