'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FAQConfig } from '@/config/landing';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQSectionProps {
  config: FAQConfig & { enabled: boolean };
}

export function FAQSection({ config }: FAQSectionProps) {
  const t = useTranslations('landing.faq');
  const locale = useLocale();
  const router = useRouter();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (!config.enabled) return null;

  // Helper function to create locale-aware contact path
  const handleContactSupport = () => {
    const contactPath = locale === 'en' ? '/contact' : `/${locale}/contact`;
    router.push(contactPath);
  };

  const faqItems = [
    {
      id: 'pricing',
      question: t('items.pricing.question'),
      answer: t('items.pricing.answer'),
      category: 'pricing',
    },
    {
      id: 'features',
      question: t('items.features.question'),
      answer: t('items.features.answer'),
      category: 'features',
    },
    {
      id: 'support',
      question: t('items.support.question'),
      answer: t('items.support.answer'),
      category: 'support',
    },
    {
      id: 'integration',
      question: t('items.integration.question'),
      answer: t('items.integration.answer'),
      category: 'technical',
    },
    {
      id: 'customization',
      question: t('items.customization.question'),
      answer: t('items.customization.answer'),
      category: 'technical',
    },
    {
      id: 'deployment',
      question: t('items.deployment.question'),
      answer: t('items.deployment.answer'),
      category: 'technical',
    },
    {
      id: 'updates',
      question: t('items.updates.question'),
      answer: t('items.updates.answer'),
      category: 'support',
    },
    {
      id: 'refund',
      question: t('items.refund.question'),
      answer: t('items.refund.answer'),
      category: 'pricing',
    },
  ];

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (config.variant === 'grid') {
    return (
      <section id="faq" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {t('badge')}
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>

          {config.showSearch && (
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-background p-6 rounded-lg">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t('stillHaveQuestions')}</p>
            <Button variant="outline" onClick={handleContactSupport}>
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('contactSupport')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (config.variant === 'tabs') {
    const categories = ['all', 'pricing', 'features', 'technical', 'support'];

    const filteredByCategory =
      activeCategory === 'all'
        ? filteredItems
        : filteredItems.filter((item) => item.category === activeCategory);

    return (
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              {t('badge')}
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {filteredByCategory.map((item) => (
              <div key={item.id} className="border rounded-lg">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openItem === item.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openItem === item.id && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default: accordion variant
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {config.showSearch && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        <div
          className={`max-w-3xl mx-auto space-y-4 ${config.layout === 'two-column' ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0' : ''}`}
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openItem === item.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openItem === item.id && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t('stillHaveQuestions')}</p>
          <Button variant="outline" onClick={handleContactSupport}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {t('contactSupport')}
          </Button>
        </div>
      </div>
    </section>
  );
}
