'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import { Check, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config';
import { useState } from 'react';

interface PricingSectionProps {
  variant?: 'cards' | 'table' | 'comparison';
  showAnnualToggle?: boolean;
  highlightPopular?: boolean;
  className?: string;
}

export function PricingSection({ 
  variant = 'cards',
  showAnnualToggle = false,
  highlightPopular = true,
  className 
}: PricingSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('pricing');
  const [isAnnual, setIsAnnual] = useState(false);

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  const plans = [
    {
      id: 'starter',
      name: t('plans.starter.name'),
      price: isAnnual ? t('plans.starter.priceAnnual') : t('plans.starter.priceMonthly'),
      period: isAnnual ? t('plans.starter.periodAnnual') : t('plans.starter.periodMonthly'),
      description: t('plans.starter.description'),
      features: t.raw('plans.starter.features') as string[],
      cta: t('plans.starter.cta'),
      href: '/contact',
      popular: false,
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      price: isAnnual ? t('plans.pro.priceAnnual') : t('plans.pro.priceMonthly'),
      period: isAnnual ? t('plans.pro.periodAnnual') : t('plans.pro.periodMonthly'),
      description: t('plans.pro.description'),
      features: t.raw('plans.pro.features') as string[],
      cta: t('plans.pro.cta'),
      href: '/contact',
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      price: t('plans.enterprise.price'),
      period: t('plans.enterprise.period'),
      description: t('plans.enterprise.description'),
      features: t.raw('plans.enterprise.features') as string[],
      cta: t('plans.enterprise.cta'),
      href: '/contact',
      popular: false,
    },
  ];

  const renderFeatureList = (features: string[]) => {
    return (
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPricingCard = (plan: any, index: number) => {
    return (
      <Card
        key={plan.id}
        className={cn(
          'relative group hover:shadow-lg transition-all duration-300',
          plan.popular && highlightPopular && 'border-primary shadow-lg scale-105'
        )}
      >
        {plan.popular && highlightPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="px-4 py-1 bg-primary text-primary-foreground">
              <Star className="w-3 h-3 mr-1" />
              {t('popular')}
            </Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
          <div className="mb-4">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderFeatureList(plan.features)}
          
          <Button 
            asChild 
            className={cn(
              'w-full',
              plan.popular && highlightPopular && 'bg-primary hover:bg-primary/90'
            )}
            variant={plan.popular && highlightPopular ? 'default' : 'outline'}
          >
            <Link href={createLocalizedPath(plan.href)}>
              {plan.cta}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className={cn('py-24 bg-gradient-to-b from-background to-muted/30', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          
          {showAnnualToggle && (
            <div className="flex items-center justify-center space-x-4">
              <span className={cn('text-sm', !isAnnual && 'font-semibold')}>
                {t('billing.monthly')}
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={cn('text-sm', isAnnual && 'font-semibold')}>
                {t('billing.annual')}
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">
                  {t('billing.save20')}
                </Badge>
              )}
            </div>
          )}
        </div>

        {variant === 'cards' && (
          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map(renderPricingCard)}
          </div>
        )}

        {variant === 'table' && (
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">{t('table.features')}</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center p-4">
                        <div className="font-bold">{plan.name}</div>
                        <div className="text-2xl font-bold mt-2">
                          {plan.price}<span className="text-sm font-normal">{plan.period}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Table rows would be implemented here */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}