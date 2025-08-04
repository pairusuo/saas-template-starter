'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { 
  Shield, 
  Zap, 
  Users, 
  Code2, 
  Headphones, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhyChooseUsSectionProps {
  variant?: 'grid' | 'list' | 'featured';
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  className?: string;
}

export function WhyChooseUsSection({ 
  variant = 'grid',
  columns = 4,
  showIcons = true,
  className 
}: WhyChooseUsSectionProps) {
  const t = useTranslations('why-choose-us');

  const reasons = [
    {
      icon: Shield,
      title: t('items.security.title'),
      description: t('items.security.description'),
      highlight: t('items.security.highlight'),
    },
    {
      icon: Zap,
      title: t('items.performance.title'),
      description: t('items.performance.description'),
      highlight: t('items.performance.highlight'),
    },
    {
      icon: Code2,
      title: t('items.codeQuality.title'),
      description: t('items.codeQuality.description'),
      highlight: t('items.codeQuality.highlight'),
    },
    {
      icon: Headphones,
      title: t('items.support.title'),
      description: t('items.support.description'),
      highlight: t('items.support.highlight'),
    },
  ];

  const renderIcon = (IconComponent: any, index: number) => {
    if (!showIcons) return null;

    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
    );
  };

  const renderReasonCard = (reason: any, index: number) => {
    const IconComponent = reason.icon;

    return (
      <Card
        key={index}
        className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-background to-muted/20"
      >
        <CardHeader className="text-center">
          {renderIcon(IconComponent, index)}
          <CardTitle className="group-hover:text-primary transition-colors">
            {reason.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground leading-relaxed mb-3">
            {reason.description}
          </p>
          <div className="text-sm font-semibold text-primary">
            {reason.highlight}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderReasonList = (reason: any, index: number) => {
    const IconComponent = reason.icon;

    return (
      <div
        key={index}
        className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
      >
        <div className="flex-shrink-0 mt-1">
          {renderIcon(IconComponent, index)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {reason.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-2">
            {reason.description}
          </p>
          <div className="text-sm font-semibold text-primary">
            {reason.highlight}
          </div>
        </div>
      </div>
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
            {reasons.map(renderReasonCard)}
          </div>
        )}

        {variant === 'list' && (
          <div className="max-w-4xl mx-auto space-y-2">
            {reasons.map(renderReasonList)}
          </div>
        )}

        {variant === 'featured' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {reasons.slice(0, 2).map(renderReasonList)}
            </div>
            <div className="space-y-6">
              {reasons.slice(2, 4).map(renderReasonList)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}