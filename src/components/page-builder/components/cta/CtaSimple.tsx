'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface CtaSimpleProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
  className?: string;
}

export function CtaSimple({
  title,
  subtitle,
  badge,
  primaryButtonText,
  secondaryButtonText,
  showSecondaryButton = true,
  className
}: CtaSimpleProps) {
  const t = useTranslations('cta');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;

  // Use translation defaults if no props provided
  const displayTitle = title || t('simple.title');
  const displaySubtitle = subtitle || t('simple.subtitle');
  const displayBadge = badge || t('simple.badge');
  const displayPrimaryButton = primaryButtonText || t('simple.primaryButton');
  const displaySecondaryButton = secondaryButtonText || t('simple.secondaryButton');

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  return (
    <section className={cn('py-24 bg-gradient-to-r from-primary to-primary/80', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2 bg-background/10 text-background border-background/20">
              <Sparkles className="w-4 h-4 mr-2" />
              {displayBadge}
            </Badge>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-background">
            {displayTitle}
          </h2>

          <p className="text-xl lg:text-2xl mb-12 text-background/90 leading-relaxed max-w-3xl mx-auto">
            {displaySubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4 h-auto group shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={createLocalizedPath('/contact')}>
                {displayPrimaryButton}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {showSecondaryButton && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 h-auto bg-background/10 border-background/20 text-background hover:bg-background/20"
              >
                <Link href={createLocalizedPath('/contact')}>
                  {displaySecondaryButton}
                </Link>
              </Button>
            )}
          </div>

          <p className="text-sm text-background/70 mt-8">
            {t('simple.trustText')}
          </p>
        </div>
      </div>
    </section>
  );
}
