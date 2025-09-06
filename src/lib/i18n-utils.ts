import { useTranslations } from 'next-intl';
import { defaultLocale } from '@/lib/i18n-config';

/**
 * 创建本地化路径
 * @param path - 路径
 * @param locale - 语言代码
 * @returns 本地化后的路径
 */
export function createLocalizedPath(path: string, locale: string = defaultLocale): string {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // 始终显式携带语言前缀以匹配 [locale] 目录结构
  if (normalizedPath === '/') return `/${locale}`;
  return `/${locale}${normalizedPath}`;
}

/**
 * 导航翻译 Hook
 */
export function useNavTranslations() {
  return useTranslations('navigation');
}

/**
 * Footer翻译 Hook
 */
export function useFooterTranslations() {
  return useTranslations('footer');
}

/**
 * 通用翻译 Hook
 */
export function useCommonTranslations() {
  return useTranslations('common');
}

/**
 * Landing Page翻译 Hook
 */
export function useLandingTranslations() {
  return useTranslations('landing');
}

/**
 * 错误信息翻译 Hook
 */
export function useErrorTranslations() {
  return useTranslations('errors');
}

/**
 * 获取当前语言的显示名称
 * @param locale - 语言代码
 * @returns 语言显示名称
 */
export function getLanguageDisplayName(locale: string): string {
  const languageNames: Record<string, string> = {
    'en': 'English',
    'zh': '中文',
  };
  
  return languageNames[locale] || locale;
}

/**
 * 检查是否为默认语言
 * @param locale - 语言代码
 * @returns 是否为默认语言
 */
export function isDefaultLocale(locale: string): boolean {
  return locale === defaultLocale;
}

/**
 * 从路径中提取语言代码
 * @param pathname - 路径名
 * @returns 语言代码
 */
export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // 检查第一个段是否为支持的语言代码
  const supportedLocales = ['en', 'zh'];
  if (supportedLocales.includes(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLocale;
}

/**
 * 移除路径中的语言前缀
 * @param pathname - 路径名
 * @param locale - 语言代码
 * @returns 移除语言前缀后的路径
 */
export function removeLocaleFromPathname(pathname: string, locale: string): string {
  if (locale === defaultLocale) {
    return pathname;
  }
  
  const localePrefix = `/${locale}`;
  if (pathname.startsWith(localePrefix)) {
    const pathWithoutLocale = pathname.slice(localePrefix.length);
    return pathWithoutLocale || '/';
  }
  
  return pathname;
}
