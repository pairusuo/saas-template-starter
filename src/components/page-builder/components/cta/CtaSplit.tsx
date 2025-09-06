'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, Rocket, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n-config';

interface CtaSplitProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  features?: string[];
  className?: string;
}

export function CtaSplit({
  title,
  subtitle,
  badge,
  primaryButtonText,
  secondaryButtonText,
  features,
  className
}: CtaSplitProps) {
  const t = useTranslations('cta');
  const params = useParams();
  const locale = params.locale as string || defaultLocale;

  // Use translation defaults if no props provided
  const displayTitle = title || t('split.title');
  const displaySubtitle = subtitle || t('split.subtitle');
  const displayBadge = badge || t('split.badge');
  const displayPrimaryButton = primaryButtonText || t('split.primaryButton');
  const displaySecondaryButton = secondaryButtonText || t('split.secondaryButton');
  
  // Ensure displayFeatures is always an array
  const translatedFeatures = t('split.features');
  const displayFeatures = features || (Array.isArray(translatedFeatures) ? translatedFeatures : []);

  const createLocalizedPath = (path: string) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  return (
    <section className={cn('py-24 bg-gradient-to-br from-background to-muted/30', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <Badge variant="outline" className="px-4 py-2 mb-4">
                {displayBadge}
              </Badge>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              {displayTitle}
            </h2>

            <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
              {displaySubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="text-base px-6 py-3 h-auto group">
                <Link href={createLocalizedPath('/contact')}>
                  <Rocket className="w-5 h-5 mr-2" />
                  {displayPrimaryButton}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-base px-6 py-3 h-auto">
                <Link href={createLocalizedPath('/contact')}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {displaySecondaryButton}
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              {t('split.noCardRequired')}
            </p>
          </div>

          <div>
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t('split.whyChooseUs')}
              </h3>
              
              <div className="space-y-4">
                {displayFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {t('split.testimonial.quote')}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  {t('split.testimonial.author')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
