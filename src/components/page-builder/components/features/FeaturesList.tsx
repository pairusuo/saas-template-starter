'use client';

import { useTranslations } from 'next-intl';
import { Check, Zap, Shield, Users, Smartphone, Globe, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesListProps {
  showIcons?: boolean;
  className?: string;
}

export function FeaturesList({
  showIcons = true,
  className
}: FeaturesListProps) {
  const t = useTranslations('features');

  const features = [
    {
      icon: Zap,
      title: t('performance.title'),
      description: t('performance.description'),
    },
    {
      icon: Shield,
      title: t('security.title'),
      description: t('security.description'),
    },
    {
      icon: Users,
      title: t('collaboration.title'),
      description: t('collaboration.description'),
    },
    {
      icon: Smartphone,
      title: t('mobile.title'),
      description: t('mobile.description'),
    },
    {
      icon: Globe,
      title: t('global.title'),
      description: t('global.description'),
    },
    {
      icon: BarChart,
      title: t('analytics.title'),
      description: t('analytics.description'),
    },
  ];

  return (
    <section className={cn('py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {features.map((feature, index) => {
            const Icon = showIcons ? feature.icon : Check;
            
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}