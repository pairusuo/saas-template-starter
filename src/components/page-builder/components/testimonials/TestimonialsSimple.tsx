'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface TestimonialsSimpleProps {
  className?: string;
}

export function TestimonialsSimple({ className }: TestimonialsSimpleProps) {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      name: t('testimonial1.name'),
      role: t('testimonial1.role'),
      company: t('testimonial1.company'),
      content: t('testimonial1.content'),
      rating: 5,
    },
    {
      name: t('testimonial2.name'),
      role: t('testimonial2.role'),
      company: t('testimonial2.company'),
      content: t('testimonial2.content'),
      rating: 5,
    },
    {
      name: t('testimonial3.name'),
      role: t('testimonial3.role'),
      company: t('testimonial3.company'),
      content: t('testimonial3.content'),
      rating: 5,
    },
  ];

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className="container mx-auto px-4">
        {/* 标题部分 - 移动端优化 */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('title')}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            {t('subtitle')}
          </p>
        </div>

        {/* 评价列表 - 移动端优化 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background border rounded-lg p-6 sm:p-8 hover:shadow-lg transition-shadow">
              {/* 评分 */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* 评价内容 */}
              <blockquote className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* 用户信息 */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}