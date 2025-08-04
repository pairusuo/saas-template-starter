'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { loadTranslations, TranslationNamespace } from '@/lib/translations';

interface PageTranslationsContextType {
  translations: Record<string, any>;
  loadPageTranslations: (namespace: TranslationNamespace) => Promise<void>;
  isLoading: boolean;
}

const PageTranslationsContext = createContext<PageTranslationsContextType | null>(null);

interface PageTranslationsProviderProps {
  children: ReactNode;
}

export function PageTranslationsProvider({ children }: PageTranslationsProviderProps) {
  const locale = useLocale();
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadPageTranslations = async (namespace: TranslationNamespace) => {
    if (translations[namespace]) {
      return; // 已经加载过了
    }

    setIsLoading(true);
    try {
      const pageTranslations = await loadTranslations(locale, namespace);
      setTranslations((prev) => ({
        ...prev,
        [namespace]: pageTranslations,
      }));
    } catch (error) {
      console.error(`Failed to load ${namespace} translations:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTranslationsContext.Provider
      value={{
        translations,
        loadPageTranslations,
        isLoading,
      }}
    >
      {children}
    </PageTranslationsContext.Provider>
  );
}

export function usePageTranslations() {
  const context = useContext(PageTranslationsContext);
  if (!context) {
    throw new Error('usePageTranslations must be used within PageTranslationsProvider');
  }
  return context;
}
