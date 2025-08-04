'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Zap,
  Globe,
  Cog,
  Database,
  CreditCard,
  Users,
  Lock,
  BarChart3,
  Smartphone,
  Cloud,
  Code2,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FeaturesConfig, FeatureItem } from '@/config/landing';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config';

interface FeaturesSectionProps {
  config?: FeaturesConfig;
}

export function FeaturesSection({ config }: FeaturesSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('features');

  const {
    variant = 'grid',
    columns = 4,
    showIcons = true,
    iconStyle = 'outline',
    layout = 'card',
  } = config || {};

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  // Extended feature set with more options
  const features: FeatureItem[] = [
    {
      icon: Shield,
      titleKey: 'items.security.title',
      descriptionKey: 'items.security.description',
      badge: 'Security',
    },
    {
      icon: Zap,
      titleKey: 'items.performance.title',
      descriptionKey: 'items.performance.description',
      badge: 'Performance',
    },
    {
      icon: Database,
      titleKey: 'items.database.title',
      descriptionKey: 'items.database.description',
      badge: 'Data',
    },
    {
      icon: CreditCard,
      titleKey: 'items.payments.title',
      descriptionKey: 'items.payments.description',
      badge: 'Payments',
    },
    {
      icon: Users,
      titleKey: 'items.auth.title',
      descriptionKey: 'items.auth.description',
      badge: 'Auth',
    },
    {
      icon: BarChart3,
      titleKey: 'items.analytics.title',
      descriptionKey: 'items.analytics.description',
      badge: 'Analytics',
    },
    {
      icon: Smartphone,
      titleKey: 'items.mobile.title',
      descriptionKey: 'items.mobile.description',
      badge: 'Mobile',
    },
    {
      icon: Globe,
      titleKey: 'items.deployment.title',
      descriptionKey: 'items.deployment.description',
      badge: 'Deploy',
    },
  ];

  const renderFeatureIcon = (IconComponent: any, index: number) => {
    if (!showIcons) return null;

    const iconClasses = cn(
      'transition-all duration-300',
      iconStyle === 'filled' ? 'text-white' : 'text-primary',
      'w-6 h-6'
    );

    const containerClasses = cn(
      'flex items-center justify-center transition-all duration-300 group-hover:scale-110',
      iconStyle === 'filled'
        ? 'w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary'
        : 'w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20',
      iconStyle === 'duotone' && 'bg-gradient-to-br from-primary/20 to-secondary/20'
    );

    return (
      <div className={containerClasses}>
        <IconComponent className={iconClasses} />
      </div>
    );
  };

  const renderFeatureCard = (feature: FeatureItem, index: number) => {
    const IconComponent = feature.icon as any;

    return (
      <Card
        key={index}
        className={cn(
          'group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20',
          layout === 'minimal' && 'border-none shadow-none bg-transparent',
          'hover:scale-105 cursor-pointer'
        )}
      >
        <CardHeader className={cn(layout === 'minimal' ? 'text-center pb-4' : 'text-center')}>
          {feature.badge && layout !== 'minimal' && (
            <Badge variant="secondary" className="w-fit mx-auto mb-3 text-xs">
              {feature.badge}
            </Badge>
          )}
          <div className="mx-auto mb-4">{renderFeatureIcon(IconComponent, index)}</div>
          <CardTitle
            className={cn(
              'group-hover:text-primary transition-colors',
              layout === 'minimal' ? 'text-lg' : 'text-xl'
            )}
          >
            {t(feature.titleKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className={cn(layout === 'minimal' ? 'pt-0' : '')}>
          <CardDescription
            className={cn('text-center leading-relaxed', layout === 'detailed' && 'text-base')}
          >
            {t(feature.descriptionKey)}
          </CardDescription>
          {layout === 'detailed' && feature.href && (
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" asChild>
                <Link href={createLocalizedPath(feature.href)}>
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderFeatureList = (feature: FeatureItem, index: number) => {
    const IconComponent = feature.icon as any;

    return (
      <div
        key={index}
        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
      >
        <div className="flex-shrink-0 mt-1">{renderFeatureIcon(IconComponent, index)}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {t(feature.titleKey)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{t(feature.descriptionKey)}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2">
              {t('badge')}
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {variant === 'grid' && (
          <div
            className={cn(
              'grid gap-6',
              columns === 2 && 'md:grid-cols-2',
              columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
              columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
            )}
          >
            {features.slice(0, columns * 2).map(renderFeatureCard)}
          </div>
        )}

        {variant === 'list' && (
          <div className="max-w-4xl mx-auto space-y-2">
            {features.slice(0, 6).map(renderFeatureList)}
          </div>
        )}

        {variant === 'tabs' && (
          <div className="max-w-6xl mx-auto">
            {/* Tabs implementation would go here */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.slice(0, 6).map(renderFeatureCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
