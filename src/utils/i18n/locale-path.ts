export type Locale = string;

/**
 * 将 pathname 的第一个段作为 locale（若存在且在集合中），替换为 target。
 * 若不存在 locale 前缀，则在最前添加。
 * 例如：/en/page-builder -> /zh/page-builder
 */
export function replaceLocaleInPath(pathname: string, target: Locale, allLocales: readonly string[]): string {
  if (!pathname || pathname === '/') return `/${target}`;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && allLocales.includes(segments[0])) {
    segments[0] = target;
    return `/${segments.join('/')}`;
  }
  return `/${target}/${segments.join('/')}`;
}
