'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  className?: string;
}

export function FAQAccordion({ className }: FAQAccordionProps) {
  const t = useTranslations('faq');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const faqs = [
    {
      id: 'pricing',
      question: t('items.pricing.question'),
      answer: t('items.pricing.answer')
    },
    {
      id: 'trial',
      question: t('items.trial.question'),
      answer: t('items.trial.answer')
    },
    {
      id: 'support',
      question: t('items.support.question'),
      answer: t('items.support.answer')
    },
    {
      id: 'security',
      question: t('items.security.question'),
      answer: t('items.security.answer')
    },
    {
      id: 'integration',
      question: t('items.integration.question'),
      answer: t('items.integration.answer')
    },
    {
      id: 'cancel',
      question: t('items.cancel.question'),
      answer: t('items.cancel.answer')
    }
  ];

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

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item) => (
            <div key={item.id} className="border rounded-lg bg-background">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    openItem === item.id && 'transform rotate-180'
                  )}
                />
              </button>
              {openItem === item.id && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('stillHaveQuestions')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('contactSupport')}
            </a>
            <a
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {t('viewDocs')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}