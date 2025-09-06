'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Users, Smartphone, Globe, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturesGridProps {
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  layout?: 'card' | 'minimal';
  className?: string;
}

export function FeaturesGrid({
  columns = 3,
  showIcons = true,
  layout = 'card',
  className
}: FeaturesGridProps) {
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

  // 移动端优化的网格列数
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className="container mx-auto px-4">
        {/* 标题部分 - 移动端优化 */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="outline" className="mb-3 sm:mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('title')}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t('subtitle')}
          </p>
        </div>

        {/* 功能网格 - 移动端优化间距 */}
        <div className={cn('grid gap-4 sm:gap-6', gridCols[columns])}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            if (layout === 'minimal') {
              return (
                <div key={index} className="text-center group p-4 sm:p-6">
                  {showIcons && (
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            }

            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-4 sm:p-6">
                  {showIcons && (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}