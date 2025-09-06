"use client";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { usePreviewTheme } from "./PreviewThemeProvider";

export function ModeTogglePreview() {
  const { theme, toggle } = usePreviewTheme();
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme (preview)"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm"
    >
      {isDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
