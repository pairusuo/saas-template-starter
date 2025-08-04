'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Star, Users, Zap, Shield } from 'lucide-react';
import { HeroConfig } from '@/config/landing';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface HeroSectionProps {
  config?: HeroConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('hero');

  const {
    variant = 'centered',
    showStats = true,
    backgroundVariant = 'gradient',
    ctaButtons = { primary: true, secondary: true },
  } = config || {};

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  const renderBackground = () => {
    switch (backgroundVariant) {
      case 'gradient':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        );
      case 'pattern':
        return (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(var(--primary),0.1)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(var(--secondary),0.1)_0%,_transparent_50%)]" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderStats = () => {
    if (!showStats) return null;

    const stats = [
      { icon: Shield, value: '99.9%', label: t('stats.uptime') },
      { icon: Users, value: '10k+', label: t('stats.activeUsers') },
      { icon: Zap, value: '<50ms', label: t('stats.responseTime') },
      { icon: Star, value: '24/7', label: t('stats.support') },
    ];

    return (
      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCTAButtons = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {ctaButtons.primary && (
          <Button asChild size="lg" className="text-lg group">
            <Link href={createLocalizedPath('/contact')}>
              {t('getStarted')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
        {ctaButtons.secondary && (
          <Button asChild variant="outline" size="lg" className="text-lg group">
            <Link href={createLocalizedPath('/docs')}>
              <Play className="mr-2 w-4 h-4" />
              {t('viewDemo')}
            </Link>
          </Button>
        )}
        {ctaButtons.tertiary && (
          <Button asChild variant="ghost" size="lg" className="text-lg">
            <Link href="#pricing">{t('viewPricing')}</Link>
          </Button>
        )}
      </div>
    );
  };

  return (
    <section
      id="hero"
      className={cn(
        'relative overflow-hidden',
        variant === 'split' ? 'min-h-screen' : 'py-24 lg:py-32'
      )}
    >
      {renderBackground()}

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={cn(
            'text-center',
            variant === 'split'
              ? 'grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]'
              : 'mx-auto max-w-5xl'
          )}
        >
          <div className={cn(variant === 'split' ? 'text-left' : 'text-center')}>
            {/* Announcement Badge */}
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                {t('announcement')}
              </Badge>
            </div>

            <h1
              className={cn(
                'font-bold tracking-tight mb-6',
                variant === 'split'
                  ? 'text-4xl lg:text-5xl xl:text-6xl'
                  : 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'
              )}
            >
              {(() => {
                const complete = t('title');
                const highlight = t('titleHighlight');
                const parts = complete.split(highlight);
                return (
                  <>
                    {parts[0]}
                    <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                      {highlight}
                    </span>
                    {parts[1] || ''}
                  </>
                );
              })()}
            </h1>

            <p
              className={cn(
                'text-muted-foreground mb-8',
                variant === 'split' ? 'text-lg lg:text-xl' : 'text-xl sm:text-2xl max-w-3xl mx-auto'
              )}
            >
              {t('subtitle')}
            </p>

            {/* Only keep CTA buttons, social proof is independent */}
            {renderCTAButtons()}

            {variant !== 'split' && renderStats()}
          </div>

          {variant === 'split' && (
            <div className="relative">
              {/* Demo/Preview area for split layout */}
              <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm border">
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded-full w-3/4" />
                  <div className="h-4 bg-secondary/20 rounded-full w-1/2" />
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg" />
                </div>
              </div>
              {showStats && <div className="mt-8">{renderStats()}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
