'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface IntegrationsSectionProps {
  variant?: 'grid' | 'carousel' | 'logos';
  showDescriptions?: boolean;
  className?: string;
}

export function IntegrationsSection({ 
  variant = 'logos',
  showDescriptions = false,
  className 
}: IntegrationsSectionProps) {
  const t = useTranslations('integrations');

  const integrations = [
    {
      name: 'Stripe',
      logo: '/imgs/integrations/stripe.svg',
      description: t('items.stripe'),
      category: 'payments',
    },
    {
      name: 'Vercel',
      logo: '/imgs/integrations/vercel.svg',
      description: t('items.vercel'),
      category: 'deployment',
    },
    {
      name: 'Supabase',
      logo: '/imgs/integrations/supabase.svg',
      description: t('items.supabase'),
      category: 'database',
    },
    {
      name: 'Resend',
      logo: '/imgs/integrations/resend.svg',
      description: t('items.resend'),
      category: 'email',
    },
    {
      name: 'Clerk',
      logo: '/imgs/integrations/clerk.svg',
      description: t('items.clerk'),
      category: 'auth',
    },
    {
      name: 'Prisma',
      logo: '/imgs/integrations/prisma.svg',
      description: t('items.prisma'),
      category: 'database',
    },
  ];

  const renderIntegrationLogo = (integration: any, index: number) => {
    return (
      <div
        key={index}
        className="flex items-center justify-center p-6 rounded-lg bg-background border hover:shadow-md transition-all duration-300 group hover:scale-105"
      >
        <div className="relative w-24 h-12 grayscale group-hover:grayscale-0 transition-all duration-300">
          <div className="w-full h-full bg-muted-foreground/20 rounded flex items-center justify-center">
            <span className="text-sm font-semibold text-muted-foreground">
              {integration.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderIntegrationCard = (integration: any, index: number) => {
    return (
      <Card
        key={index}
        className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <CardContent className="p-6 text-center">
          <div className="relative w-16 h-16 mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
            <div className="w-full h-full bg-muted-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">
                {integration.name}
              </span>
            </div>
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
            {integration.name}
          </h3>
          {showDescriptions && (
            <p className="text-sm text-muted-foreground">
              {integration.description}
            </p>
          )}
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {integration.category}
            </Badge>
          </div>
        </CardContent>
      </Card>
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

        {variant === 'logos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map(renderIntegrationLogo)}
          </div>
        )}

        {variant === 'grid' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map(renderIntegrationCard)}
          </div>
        )}

        {variant === 'carousel' && (
          <div className="overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {[...integrations, ...integrations].map((integration, index) => (
                <div key={index} className="flex-shrink-0">
                  {renderIntegrationLogo(integration, index)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {t('moreIntegrations')}
          </p>
        </div>
      </div>
    </section>
  );
}