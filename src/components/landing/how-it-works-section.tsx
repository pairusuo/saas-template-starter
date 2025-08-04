'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { ArrowRight, Download, Settings, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n-config';

interface HowItWorksSectionProps {
  variant?: 'steps' | 'timeline' | 'cards';
  showCTA?: boolean;
  className?: string;
}

export function HowItWorksSection({ 
  variant = 'steps', 
  showCTA = true,
  className 
}: HowItWorksSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('how-it-works');

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  const steps = [
    {
      icon: Download,
      title: t('steps.download.title'),
      description: t('steps.download.description'),
      details: t('steps.download.details'),
    },
    {
      icon: Settings,
      title: t('steps.customize.title'),
      description: t('steps.customize.description'),
      details: t('steps.customize.details'),
    },
    {
      icon: Rocket,
      title: t('steps.deploy.title'),
      description: t('steps.deploy.description'),
      details: t('steps.deploy.details'),
    },
  ];

  const renderStepIndicator = (index: number, isLast: boolean) => {
    if (variant === 'timeline') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-2">
            {index + 1}
          </div>
          {!isLast && (
            <div className="w-px h-16 bg-gradient-to-b from-primary to-muted-foreground/30" />
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
        {index + 1}
      </div>
    );
  };

  const renderStep = (step: any, index: number) => {
    const Icon = step.icon;
    const isLast = index === steps.length - 1;

    if (variant === 'cards') {
      return (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mb-2 text-sm font-semibold text-primary">
              第 {index + 1} 步
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground mb-4">{step.description}</p>
            <p className="text-sm text-muted-foreground">{step.details}</p>
          </CardContent>
        </Card>
      );
    }

    if (variant === 'timeline') {
      return (
        <div key={index} className="flex gap-6">
          {renderStepIndicator(index, isLast)}
          <div className="flex-1 pb-16">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">第 {index + 1} 步</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground mb-3">{step.description}</p>
            <p className="text-sm text-muted-foreground">{step.details}</p>
          </div>
        </div>
      );
    }

    // Default steps variant
    return (
      <div key={index} className="text-center group">
        <div className="relative mb-6">
          {renderStepIndicator(index, isLast)}
          <div className="absolute top-6 left-12 w-full h-px bg-gradient-to-r from-primary to-muted-foreground/30 hidden lg:block" 
               style={{ display: isLast ? 'none' : 'block' }} />
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
        <p className="text-muted-foreground mb-3">{step.description}</p>
        <p className="text-sm text-muted-foreground">{step.details}</p>
      </div>
    );
  };

  return (
    <section className={cn('py-24 bg-gradient-to-b from-muted/30 to-background', className)}>
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

        <div className={cn(
          variant === 'cards' ? 'grid gap-8 md:grid-cols-3' :
          variant === 'timeline' ? 'max-w-2xl mx-auto' :
          'grid gap-12 lg:grid-cols-3 relative'
        )}>
          {steps.map(renderStep)}
        </div>

        {showCTA && (
          <div className="text-center mt-16">
            <Button asChild size="lg" className="group">
              <Link href={createLocalizedPath('/contact')}>
                {t('getStarted')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}