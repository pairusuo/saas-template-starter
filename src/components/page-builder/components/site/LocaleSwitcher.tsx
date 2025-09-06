"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import { replaceLocaleInPath } from "@/utils/i18n/locale-path";

// 在保持当前路径的前提下，仅替换 locale 前缀
function buildLocaleHref(pathname: string, target: Locale) {
  return replaceLocaleInPath(pathname, target, locales);
}

export function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const segments = pathname.split('/').filter(Boolean);
  const current = (segments[0] && (locales as readonly string[]).includes(segments[0])) ? segments[0] : undefined;
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Link
        href={buildLocaleHref(pathname, "en")}
        className={`px-2 py-1 rounded-full hover:text-foreground ${current === 'en' ? 'border border-border text-foreground' : ''}`}
      >
        EN
      </Link>
      <span>/</span>
      <Link
        href={buildLocaleHref(pathname, "zh")}
        className={`px-2 py-1 rounded-full hover:text-foreground ${current === 'zh' ? 'border border-border text-foreground' : ''}`}
      >
        中文
      </Link>
    </div>
  );
}
