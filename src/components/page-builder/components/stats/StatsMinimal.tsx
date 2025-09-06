'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

interface StatsMinimalProps {
  showIcons?: boolean;
  className?: string;
}

export function StatsMinimal({ showIcons = true, className }: StatsMinimalProps) {
  const t = useTranslations('stats');

  const stats = [
    {
      icon: TrendingUp,
      value: '99.9%',
      label: t('uptime.label'),
      description: t('uptime.description'),
    },
    {
      icon: Users,
      value: '10K+',
      label: t('users.label'),
      description: t('users.description'),
    },
    {
      icon: Globe,
      value: '50+',
      label: t('countries.label'),
      description: t('countries.description'),
    },
    {
      icon: Zap,
      value: '<100ms',
      label: t('response.label'),
      description: t('response.description'),
    },
  ];

  return (
    <section className={cn('py-12 sm:py-16 bg-muted/30', className)}>
      <div className="container mx-auto px-4">
        {/* 标题部分 - 移动端优化 */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('title')}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t('subtitle')}
          </p>
        </div>

        {/* 统计网格 - 移动端优化 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div key={index} className="text-center group">
                {showIcons && (
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div className="mb-2">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}