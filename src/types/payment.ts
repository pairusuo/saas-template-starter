/**
 * 支付系统配置和类型定义
 */

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  stripePriceMonthlyId?: string;  // Stripe 价格 ID (月付)
  stripePriceAnnualId?: string;   // Stripe 价格 ID (年付)
  paddlePlanMonthlyId?: string;   // Paddle 计划 ID (月付)
  paddlePlanAnnualId?: string;    // Paddle 计划 ID (年付)
  features: PaymentFeature[];
  popular?: boolean;
  maxUsers?: number;
  storage?: string;
  support?: string;
  metadata?: Record<string, any>;
}

export interface PaymentFeature {
  name: string;
  included: boolean;
  description?: string;
  limit?: number | string;
}

export interface PaymentConfig {
  provider: 'stripe' | 'paddle' | 'lemonsqueezy' | 'custom';
  currency: string;
  locale: string;
  mode: 'subscription' | 'payment';
  successUrl?: string;
  cancelUrl?: string;
  allowPromotionCodes?: boolean;
  collectTaxId?: boolean;
  customFields?: PaymentCustomField[];
}

export interface PaymentCustomField {
  key: string;
  label: string;
  type: 'text' | 'dropdown' | 'optional';
  options?: { label: string; value: string }[];
}

export interface LandingPageConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  components: any[];
  paymentConfig?: PaymentConfig;
  plans?: PaymentPlan[];
  isPublished: boolean;
  customDomain?: string;
  seoConfig?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  analyticsConfig?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    hotjarId?: string;
  };
  integrations?: {
    webhook?: string;
    zapier?: string;
    mailchimp?: string;
    hubspot?: string;
  };
}

export interface CheckoutSession {
  sessionId: string;
  planId: string;
  isAnnual: boolean;
  amount: number;
  currency: string;
  customerEmail?: string;
  customerName?: string;
  pageSlug: string;
  metadata?: Record<string, any>;
}

export interface PaymentWebhookEvent {
  type: 'payment.succeeded' | 'payment.failed' | 'subscription.created' | 'subscription.updated' | 'subscription.cancelled';
  data: {
    sessionId: string;
    planId: string;
    customerEmail: string;
    amount: number;
    currency: string;
    pageSlug: string;
    metadata?: Record<string, any>;
  };
}