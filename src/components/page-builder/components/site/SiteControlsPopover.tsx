"use client";
import React from "react";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { ModeTogglePreview } from "@/components/page-builder/preview/ModeTogglePreview";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import { useTranslations } from "next-intl";

// 轻量 Popover 版本：用 <details> 实现，无外部依赖
// 后续可替换为 shadcn/ui 的 Popover
export type SiteControlsPopoverProps = {
  align?: "right" | "left";
  className?: string;
  usePreviewTheme?: boolean;
};

function buildLocaleHref(pathname: string, target: Locale) {
  if (!pathname || pathname === "/") return `/${target}`;
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
    segments[0] = target;
    return `/${segments.join("/")}`;
  }
  return `/${target}/${segments.join("/")}`;
}

export function SiteControlsPopover({ align = "right", className, usePreviewTheme = false }: SiteControlsPopoverProps) {
  const alignCls = align === "right" ? "items-end" : "items-start";
  const pathname = usePathname() || "/";
  const t = useTranslations('page-builder');
  const Toggle = usePreviewTheme ? ModeTogglePreview : ModeToggle;
  return (
    <div className={`relative z-50 ${className ?? ""}`}>
      <details className="group">
        <summary className="list-none inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-3 py-1.5 text-sm text-muted-foreground shadow-sm cursor-pointer">
          <span className="i-lucide-globe" aria-hidden />
          <span className="hidden sm:inline">{t('siteControls.settings')}</span>
        </summary>
        <div className={`absolute mt-2 flex ${alignCls}`}>
          <div className="min-w-[220px] rounded-lg border bg-background p-3 shadow-md">
            <div className="text-xs text-muted-foreground mb-2">{t('siteControls.language')}</div>
            <div className="flex items-center gap-2 text-sm">
              <Link href={buildLocaleHref(pathname, "en")} className="rounded px-2 py-1 hover:bg-accent hover:text-accent-foreground">EN</Link>
              <Link href={buildLocaleHref(pathname, "zh")} className="rounded px-2 py-1 hover:bg-accent hover:text-accent-foreground">中文</Link>
            </div>
            <div className="h-px my-3 bg-border" />
            <div className="text-xs text-muted-foreground mb-2">{t('siteControls.theme')}</div>
            <Toggle />
          </div>
        </div>
      </details>
    </div>
  );
}
