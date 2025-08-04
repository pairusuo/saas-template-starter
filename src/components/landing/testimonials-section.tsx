'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { TestimonialsConfig } from '@/config/landing';

interface TestimonialsSectionProps {
  config?: TestimonialsConfig;
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  const t = useTranslations('landing.testimonials');

  // Add error handling and debugging information
  let testimonials: Array<{
    name: string;
    role: string;
    content: string;
  }> = [];

  try {
    const rawTestimonials = t.raw('items');
    if (Array.isArray(rawTestimonials)) {
      testimonials = rawTestimonials;
    } else {
      console.warn('Testimonials data is not an array:', rawTestimonials);
      testimonials = [];
    }
  } catch (error) {
    console.error('Error loading testimonials:', error);
    // Provide default data as a fallback
    testimonials = [
      {
        name: 'Example User',
        role: 'Developer',
        content: 'This is a great product!',
      },
    ];
  }

  return (
    <section className="container mx-auto px-4 py-24 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="pt-6">
              <blockquote className="text-lg mb-4">"{testimonial.content}"</blockquote>
              <div className="flex items-center">
                <div className="h-10 w-10 mr-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}