'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialsGridProps {
  showAvatars?: boolean;
  showCompany?: boolean;
  showRating?: boolean;
  className?: string;
}

export function TestimonialsGrid({
  showAvatars = true,
  showCompany = true,
  showRating = true,
  className
}: TestimonialsGridProps) {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      text: t('sarah.text'),
      author: t('sarah.author'),
      company: 'TechStart',
      avatar: '/imgs/users/avatar-1.jpg',
      rating: 5
    },
    {
      text: t('david.text'),
      author: t('david.author'),
      company: 'InnovateAI',
      avatar: '/imgs/users/avatar-2.jpg',
      rating: 5
    },
    {
      text: t('emily.text'),
      author: t('emily.author'),
      company: 'Solo Dev',
      avatar: '/imgs/users/avatar-3.jpg',
      rating: 5
    }
  ];

  return (
    <section className={cn('py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-background p-6 rounded-lg border shadow-sm">
              {showRating && (
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                {showAvatars && (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                    unoptimized
                  />
                )}
                <div>
                  <div className="text-sm font-medium">{testimonial.author}</div>
                  {showCompany && (
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}