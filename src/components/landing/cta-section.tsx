'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles, Rocket, Phone, MessageCircle } from 'lucide-react';
import { CTAConfig } from '@/config/landing';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface CTASectionProps {
  config?: CTAConfig;
}

export function CTASection({ config }: CTASectionProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('cta');

  const {
    variant = 'simple',
    showSecondaryAction = true,
    backgroundVariant = 'gradient',
    position = 'section',
  } = config || {};

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  const renderBackground = () => {
    switch (backgroundVariant) {
      case 'image':
        return (
          <>
            <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
          </>
        );
      case 'gradient':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-muted/30" />
        );
      default:
        return null;
    }
  };

  const renderSimpleVariant = () => (
    <div className="text-center max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <Badge variant="secondary" className="px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          {t('badge')}
        </Badge>
      </div>

      <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground leading-tight">
        {t('title')}
      </h2>

      <p className="text-xl lg:text-2xl mb-12 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        {t('subtitle')}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button
          asChild
          size="lg"
          className="text-lg px-8 py-4 h-auto group shadow-lg hover:shadow-xl transition-all"
        >
          <Link href={createLocalizedPath('/contact')}>
            <Rocket className="w-5 h-5 mr-2" />
            {t('getStarted')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {showSecondaryAction && (
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-2">
            <Link href={createLocalizedPath('/contact')}>
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('contactUs')}
            </Link>
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{t('features')}</p>
    </div>
  );

  const renderSplitVariant = () => (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="mb-6">
          <Badge
            variant="secondary"
            className="px-4 py-2 bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('badge')}
          </Badge>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">{t('title')}</h2>

        <p className="text-lg mb-8 leading-relaxed text-muted-foreground">{t('subtitle')}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="text-base px-6 py-3 h-auto">
            <Link href={createLocalizedPath('/contact')}>
              {t('getStarted')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          {showSecondaryAction && (
            <Button asChild variant="outline" size="lg" className="text-base px-6 py-3 h-auto">
              <Link href={createLocalizedPath('/contact')}>{t('contactUs')}</Link>
            </Button>
          )}
        </div>
      </div>

      <div>
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">{t('newsletter.title')}</h3>
          <p className="text-muted-foreground mb-4">{t('newsletter.subtitle')}</p>
          <div className="text-center">
            <Button asChild className="w-full">
              <Link href={createLocalizedPath('/contact')}>
                <MessageCircle className="w-4 h-4 mr-2" />
                联系我们
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderBannerVariant = () => (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4 text-foreground">{t('banner.title')}</h3>
      <p className="mb-6 text-muted-foreground">{t('banner.subtitle')}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button asChild className="group">
          <Link href={createLocalizedPath('/contact')}>
            {t('getStarted')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            <span className="text-muted-foreground">{t('contact.phone')}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="text-muted-foreground">{t('contact.email')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'split':
        return renderSplitVariant();
      case 'banner':
        return renderBannerVariant();
      default:
        return renderSimpleVariant();
    }
  };

  const sectionClasses = cn(
    'relative overflow-hidden',
    position === 'section' && 'py-32',
    position === 'floating' && 'fixed bottom-0 left-0 right-0 z-50 p-4',
    position === 'sticky' && 'sticky bottom-0 z-40 py-4'
  );

  const containerClasses = cn(
    'relative z-10',
    position === 'floating' && 'container mx-auto',
    position !== 'floating' && 'container mx-auto px-4'
  );

  if (position === 'floating') {
    return (
      <div className={sectionClasses}>
        {renderBackground()}
        <div className={containerClasses}>
          <Card className="p-6 shadow-2xl">{renderContent()}</Card>
        </div>
      </div>
    );
  }

  return (
    <section id="cta" className={sectionClasses}>
      {renderBackground()}
      <div className={containerClasses}>{renderContent()}</div>
    </section>
  );
}