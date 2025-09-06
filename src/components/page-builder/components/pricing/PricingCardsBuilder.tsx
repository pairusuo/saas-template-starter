'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface PricingCardsBuilderProps {
  title?: string;
  subtitle?: string;
  showAnnualToggle?: boolean;
  highlightPopular?: boolean;
  className?: string;
  // Payment integration configuration
  pageSlug?: string;
  paymentEnabled?: boolean;
  onPlanSelect?: (plan: any) => void;
}

export function PricingCardsBuilder({
  title,
  subtitle,
  showAnnualToggle = true,
  highlightPopular = true,
  className,
  pageSlug,
  paymentEnabled = false,
  onPlanSelect
}: PricingCardsBuilderProps) {
  const t = useTranslations('pricing-cards');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  console.log('PricingCardsBuilder - Current locale:', locale);

  // Handle plan selection
  const handlePlanSelect = async (plan: any) => {
    if (onPlanSelect) {
      onPlanSelect(plan);
      return;
    }

    if (!paymentEnabled || !pageSlug) {
      // If payment is not enabled or in builder, show hint
      alert('This is a preview. Payment will be enabled after publishing.');
      return;
    }

    setLoading(plan.id);
    
    try {
      const response = await fetch(`/api/checkout/${pageSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          interval: isAnnual ? 'year' : 'month',
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      description: t('plans.starter.description'),
      monthlyPrice: 9,
      annualPrice: 90,
      popular: false,
      features: (
        (() => {
          const raw = t.raw('plans.starter.features');
          if (Array.isArray(raw)) return raw as string[];
          // Fallback to locale-appropriate defaults
          return locale === 'zh'
            ? ['5个项目', '10GB 存储空间', '基础技术支持', '社区访问权限', '基础分析功能']
            : ['5 projects', '10GB storage', 'Basic support', 'Community access', 'Basic analytics'];
        })()
      ).map((feature: string) => ({
        name: feature,
        included: true
      })),
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      description: t('plans.pro.description'),
      monthlyPrice: 29,
      annualPrice: 290,
      popular: true,
      features: (
        (() => {
          const raw = t.raw('plans.pro.features');
          if (Array.isArray(raw)) return raw as string[];
          return locale === 'zh'
            ? ['无限项目', '100GB 存储空间', '优先技术支持', '高级分析功能', '团队协作工具', 'API 访问权限', '自定义集成']
            : ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'Team collaboration', 'API access', 'Custom integrations'];
        })()
      ).map((feature: string) => ({
        name: feature,
        included: true
      })),
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      description: t('plans.enterprise.description'),
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      features: (
        (() => {
          const raw = t.raw('plans.enterprise.features');
          if (Array.isArray(raw)) return raw as string[];
          return locale === 'zh'
            ? ['无限项目和存储', '24/7 专属支持', '高级安全功能', '定制开发服务', '专属客户经理', 'SLA 保障', '私有部署选项']
            : ['Unlimited projects and storage', '24/7 dedicated support', 'Advanced security features', 'Custom development', 'Dedicated account manager', 'SLA guarantee', 'Private deployment options'];
        })()
      ).map((feature: string) => ({
        name: feature,
        included: true
      })),
    },
  ];

  const renderPlan = (plan: any) => {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const isPopular = highlightPopular && plan.popular;

    return (
      <Card 
        key={plan.id}
        className={cn(
          'relative transition-all duration-300 hover:scale-105',
          isPopular && 'border-primary shadow-lg'
        )}
      >
        {isPopular && (
          <Badge 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
          >
            {t('mostPopular')}
          </Badge>
        )}
        
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <p className="text-muted-foreground">{plan.description}</p>
          <div className="mt-4">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-muted-foreground">
              /{isAnnual ? t('year') : t('month')}
            </span>
          </div>
          {isAnnual && (
            <Badge variant="secondary" className="mt-2">
              {t('save')} ${(plan.monthlyPrice * 12) - plan.annualPrice}
            </Badge>
          )}
        </CardHeader>

        <CardContent>
          <Button 
            className={cn(
              'w-full mb-6',
              isPopular && 'bg-primary hover:bg-primary/90'
            )}
            variant={isPopular ? 'default' : 'outline'}
            onClick={() => handlePlanSelect(plan)}
          >
            {t('getStarted')}
          </Button>

          <ul className="space-y-3">
            {plan.features.map((feature: any, index: number) => (
              <li key={index} className="flex items-center gap-3">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={cn(
                  'text-sm',
                  feature.included ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className={cn('py-24 bg-gradient-to-b from-muted/30 to-background', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {title || t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {subtitle || t('subtitle')}
          </p>

          {showAnnualToggle && (
            <div className="flex items-center justify-center gap-4">
              <span className={cn('text-sm', !isAnnual && 'font-medium')}>
                {t('monthly')}
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={cn('text-sm', isAnnual && 'font-medium')}>
                {t('annual')}
              </span>
              <Badge variant="secondary" className="ml-2">
                {t('save')} 20%
              </Badge>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map(renderPlan)}
        </div>
      </div>
    </section>
  );
}

// Component metadata
PricingCardsBuilder.displayName = 'PricingCardsBuilder';
PricingCardsBuilder.category = 'pricing';
PricingCardsBuilder.description = 'Card-style pricing plans display component';
PricingCardsBuilder.defaultProps = {
  showAnnualToggle: true,
  highlightPopular: true,
};
