import { useTranslations } from 'next-intl';

// 按需加载翻译文件的工具函数
export async function loadTranslations(locale: string, namespace: string) {
  try {
    const translations = await import(`../../messages/${locale}/${namespace}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for ${namespace} in ${locale}:`, error);
    return {};
  }
}

// 支持的翻译命名空间
export const TRANSLATION_NAMESPACES = [
  'landing',
  'auth',
  'dashboard',
  'settings',
  'about',
  'contact',
  'privacy',
  'terms',
  'cookies',
  'docs',
  'examples',
  'guides',
  'careers',
  'billing',
  'api-keys',
  'files',
  'organizations',
  'pricing',
  'profile',
  'success',
  'usage',
] as const;

export type TranslationNamespace = (typeof TRANSLATION_NAMESPACES)[number];

// 页面级别的翻译加载 Hook
export function usePageTranslations(namespace: TranslationNamespace) {
  return useTranslations(namespace);
}
