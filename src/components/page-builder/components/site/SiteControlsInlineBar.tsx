"use client";
import React from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { ModeTogglePreview } from "@/components/page-builder/preview/ModeTogglePreview";

export type SiteControlsInlineBarProps = {
  size?: "sm" | "md";
  showLocale?: boolean;
  showTheme?: boolean;
  className?: string;
  usePreviewTheme?: boolean;
};

export function SiteControlsInlineBar({ size = "sm", showLocale = true, showTheme = true, className, usePreviewTheme = false }: SiteControlsInlineBarProps) {
  const padd = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';
  const gap = size === 'sm' ? 'gap-2' : 'gap-3';
  const Toggle = usePreviewTheme ? ModeTogglePreview : ModeToggle;
  return (
    <div className={`inline-flex items-center ${gap} rounded-full border bg-background/60 backdrop-blur ${padd} shadow-sm ${className ?? ''}`}>
      {showLocale && <LocaleSwitcher />}
      {showTheme && <Toggle />}
    </div>
  );
}
