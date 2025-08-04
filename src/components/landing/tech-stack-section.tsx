'use client';

import { useTranslations } from 'next-intl';
import { TechStackConfig } from '@/config/landing';

interface TechStackSectionProps {
  config?: TechStackConfig;
}

export function TechStackSection({ config }: TechStackSectionProps) {
  const t = useTranslations('tech-stack');

  const techStack = [
    {
      name: 'Next.js',
      description: t('items.nextjs'),
      icon: '⚡',
    },
    {
      name: 'TypeScript',
      description: t('items.typescript'),
      icon: '🔷',
    },
    {
      name: 'Tailwind CSS',
      description: t('items.tailwind'),
      icon: '🎨',
    },
    {
      name: 'Drizzle ORM',
      description: t('items.drizzle'),
      icon: '🗃️',
    },
    {
      name: 'NextAuth.js',
      description: t('items.nextauth'),
      icon: '🔐',
    },
    {
      name: 'Stripe',
      description: t('items.stripe'),
      icon: '💳',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border"
            >
              <div className="text-3xl">{tech.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{tech.name}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
