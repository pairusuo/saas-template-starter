"use client";
import React from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { ModeTogglePreview } from "@/components/page-builder/preview/ModeTogglePreview";

export type SiteControlsProps = {
  position?: "top-right" | "bottom-right";
  variant?: "pill";
  className?: string;
  usePreviewTheme?: boolean;
};

export function SiteControls({ position = "top-right", variant = "pill", className, usePreviewTheme = false }: SiteControlsProps) {
  const pos = position === "top-right"
    ? "top-[calc(env(safe-area-inset-top)+16px)] right-[calc(env(safe-area-inset-right)+16px)]"
    : "bottom-[calc(env(safe-area-inset-bottom)+16px)] right-[calc(env(safe-area-inset-right)+16px)]";
  const Toggle = usePreviewTheme ? ModeTogglePreview : ModeToggle;

  if (variant === "pill") {
    return (
      <div className={`pointer-events-none fixed z-50 ${pos}`}>
        <div className={`pointer-events-auto flex items-center gap-1 rounded-full border bg-background/60 backdrop-blur px-2 py-1 shadow-sm ${className ?? ""}`}>
          <LocaleSwitcher />
          <Toggle />
        </div>
      </div>
    );
  }
  return null;
}
