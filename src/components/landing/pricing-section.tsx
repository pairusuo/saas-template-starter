'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, X, Star, Crown, Zap } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PricingConfig } from '@/config/landing';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface PricingSectionProps {
  config?: PricingConfig;
}

export function PricingSection({ config }: PricingSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('pricing');
  const [isAnnual, setIsAnnual] = useState(false);

  const {
    variant = 'cards',
    showFeatureComparison = true,
    highlightPopular = true,
    showAnnualDiscount = true,
    layout = 'horizontal',
  } = config || {};

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  const plans = [
    {
      key: 'starter',
      popular: false,
      icon: Star,
      color: 'from-gray-500 to-gray-600',
    },
    {
      key: 'professional',
      popular: true,
      icon: Crown,
      color: 'from-primary to-secondary',
    },
    {
      key: 'enterprise',
      popular: false,
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const getPrice = (planKey: string) => {
    const plan = t.raw(`plans.${planKey}`);
    if (!plan) return '0';

    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    return `${plan.currency}${price}`;
  };

  const getPeriod = (planKey: string) => {
    const plan = t.raw(`plans.${planKey}`);
    if (!plan) return '';

    return isAnnual ? plan.period.annual : plan.period.monthly;
  };

  const renderPricingToggle = () => {
    if (!showAnnualDiscount) return null;

    return (
      <div className="flex items-center justify-center space-x-4 mb-12">
        <span
          className={cn(
            'text-sm font-medium transition-colors',
            !isAnnual ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {t('billingToggle.monthly')}
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-primary"
        />
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              isAnnual ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {t('billingToggle.annual')}
          </span>
          <Badge variant="secondary" className="text-xs">
            {t('billingToggle.saveText')}
          </Badge>
        </div>
      </div>
    );
  };

  const renderPlanCard = (planConfig: any, index: number) => {
    const plan = t.raw(`plans.${planConfig.key}`);
    const Icon = planConfig.icon;

    // Safety check for plan data
    if (!plan || !plan.features || !Array.isArray(plan.features)) {
      return null;
    }

    const isPopular = highlightPopular && plan.popular;
    const currentPrice = getPrice(planConfig.key);
    const period = getPeriod(planConfig.key);
    const hasDiscount = showAnnualDiscount && isAnnual && planConfig.key !== 'starter';

    return (
      <Card
        key={index}
        className={cn(
          'relative transition-all duration-300 hover:shadow-xl',
          isPopular ? 'border-primary shadow-lg scale-105 z-10' : 'hover:scale-102',
          layout === 'vertical' && 'w-full'
        )}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
            <Badge
              className={cn(
                'px-4 py-2 text-sm font-medium bg-gradient-to-r text-white',
                planConfig.color
              )}
            >
              <Crown className="w-4 h-4 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader
          className={cn(
            'text-center relative',
            isPopular && 'bg-gradient-to-br from-primary/5 to-secondary/5'
          )}
        >
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                'p-3 rounded-xl bg-gradient-to-br',
                planConfig.color,
                'text-white shadow-lg'
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <CardDescription className="text-base">{plan.description}</CardDescription>

          <div className="mt-6">
            <div className="flex items-baseline justify-center space-x-2">
              <span className="text-4xl font-bold">{currentPrice}</span>
              <span className="text-muted-foreground">{period}</span>
            </div>
            {hasDiscount && (
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm text-muted-foreground line-through mr-2">
                  {`${plan.currency}${plan.price.monthly}${plan.period.monthly}`}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {t('billingToggle.saveText')}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <ul className="space-y-3">
              {plan.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            asChild
            className={cn(
              'w-full text-base h-12',
              isPopular &&
                'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
            )}
            variant={isPopular ? 'default' : 'outline'}
            size="lg"
          >
            <Link
              href={
                planConfig.key === 'enterprise'
                  ? createLocalizedPath('/contact')
                  : createLocalizedPath('/auth/signin')
              }
            >
              {plan.buttonText}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderFeatureComparison = () => {
    if (!showFeatureComparison) return null;

    const comparisonFeatures = [
      {
        name: t('comparison.apiCalls'),
        free: t('comparison.values.apiCalls.starter'),
        pro: t('comparison.values.apiCalls.professional'),
        enterprise: t('comparison.values.apiCalls.enterprise'),
      },
      {
        name: t('comparison.projects'),
        free: t('comparison.values.projects.starter'),
        pro: t('comparison.values.projects.professional'),
        enterprise: t('comparison.values.projects.enterprise'),
      },
      {
        name: t('comparison.support'),
        free: t('comparison.values.support.starter'),
        pro: t('comparison.values.support.professional'),
        enterprise: t('comparison.values.support.enterprise'),
      },
      { name: t('comparison.analytics'), free: false, pro: true, enterprise: true },
      { name: t('comparison.customDomain'), free: false, pro: true, enterprise: true },
      { name: t('comparison.sla'), free: false, pro: false, enterprise: true },
    ];

    return (
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">{t('comparison.title')}</h3>
          <p className="text-muted-foreground">{t('comparison.subtitle')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="text-left p-4 font-semibold">{t('comparison.feature')}</th>
                <th className="text-center p-4 font-semibold">{t('plans.starter.name')}</th>
                <th className="text-center p-4 font-semibold">{t('plans.professional.name')}</th>
                <th className="text-center p-4 font-semibold">{t('plans.enterprise.name')}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <tr key={index} className="border-b hover:bg-muted/10">
                  <td className="p-4 font-medium">{feature.name}</td>
                  <td className="text-center p-4">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      feature.free
                    )}
                  </td>
                  <td className="text-center p-4">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      feature.pro
                    )}
                  </td>
                  <td className="text-center p-4">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      feature.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        {renderPricingToggle()}

        <div
          className={cn(
            'grid gap-8 max-w-7xl mx-auto',
            layout === 'vertical' ? 'grid-cols-1 space-y-8' : 'lg:grid-cols-3',
            plans.length === 2 && 'lg:grid-cols-2'
          )}
        >
          {plans.map(renderPlanCard)}
        </div>

        {renderFeatureComparison()}
      </div>
    </section>
  );
}
