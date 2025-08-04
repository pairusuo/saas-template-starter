'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SocialProofConfig } from '@/config/landing';
import { Star, Users, Building2, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface SocialProofSectionClientProps {
  config: SocialProofConfig & { enabled: boolean };
  userImages: string[];
}

export default function SocialProofSectionClient({
  config,
  userImages,
}: SocialProofSectionClientProps) {
  const t = useTranslations('social-proof');

  // Prepare data
  const stats = [
    { icon: Users, value: '10,000+', label: t('stats.developers') },
    { icon: TrendingUp, value: '1M+', label: t('stats.requests') },
    { icon: Building2, value: '99.9%', label: t('stats.uptime') },
    { icon: Star, value: '4.9/5', label: t('stats.rating') },
  ];
  const companies = [
    { name: 'TechCorp', logo: '/imgs/companies/logo.svg' },
    { name: 'StartupXYZ', logo: '/imgs/companies/logo.svg' },
    { name: 'InnovateAI', logo: '/imgs/companies/logo.svg' },
    { name: 'CloudFirst', logo: '/imgs/companies/logo.svg' },
  ];
  const testimonials = [
    { text: t('testimonials.sarah'), author: 'Sarah Chen, TechStart' },
    { text: t('testimonials.david'), author: 'David Rodriguez, InnovateAI' },
    { text: t('testimonials.emily'), author: 'Emily Johnson, Solo Dev' },
  ];

  return (
    <section id="social-proof" className="py-16">
      <div className="container mx-auto px-4">
        {/* Global title and subtitle */}
        <div className="text-center mb-12">
          {config.showTitle !== false && <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>}
          {config.showSubtitle !== false && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
          )}
        </div>

        {/* Statistics module */}
        {config.showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Company Logo module */}
        {config.showCompanyLogos && (
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-8">
              {t('trustedByCompanies')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {companies.map((company, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={128}
                    height={48}
                    className="object-contain"
                  />
                  <p className="text-sm text-muted-foreground mt-2">{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User evaluation module */}
        {config.showTestimonials && (
          <div className="mb-12 bg-muted/50 py-12 rounded-lg">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {testimonials.map((item, idx) => (
                <div key={idx} className="bg-background p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">"{item.text}"</p>
                  <div className="text-sm font-medium">{item.author}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avatar + rating module */}
        {config.showAvatars && (
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="flex -space-x-2 flex-nowrap">
                {userImages.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`User ${idx + 1}`}
                    width={40}
                    height={40}
                    unoptimized
                    className="flex-shrink-0 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              {config.showRating && (
                <div className="ml-4 flex text-yellow-400">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              )}
            </div>
            {config.showUserCount && (
              <p className="text-sm text-muted-foreground">
                {t('joinedDevelopers')} • {t('reviewCount')}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
