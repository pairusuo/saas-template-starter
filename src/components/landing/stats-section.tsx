'use client';

import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import { TrendingUp, Users, Zap, Shield, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsSectionProps {
  variant?: 'default' | 'compact' | 'detailed';
  showBadge?: boolean;
  className?: string;
}

export function StatsSection({ 
  variant = 'default', 
  showBadge = true,
  className 
}: StatsSectionProps) {
  const t = useTranslations('stats');

  const stats = [
    {
      icon: TrendingUp,
      value: '99.9%',
      label: t('uptime'),
      description: t('uptimeDesc'),
    },
    {
      icon: Users,
      value: '50K+',
      label: t('activeUsers'),
      description: t('activeUsersDesc'),
    },
    {
      icon: Zap,
      value: '<100ms',
      label: t('responseTime'),
      description: t('responseTimeDesc'),
    },
    {
      icon: Star,
      value: '4.9/5',
      label: t('satisfaction'),
      description: t('satisfactionDesc'),
    },
  ];

  return (
    <section className={cn('py-16 bg-gradient-to-b from-background to-muted/30', className)}>
      <div className="container mx-auto px-4">
        {showBadge && (
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 mb-4">
              {t('badge')}
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        )}

        <div className={cn(
          'grid gap-8',
          variant === 'compact' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        )}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                {variant === 'detailed' && (
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}