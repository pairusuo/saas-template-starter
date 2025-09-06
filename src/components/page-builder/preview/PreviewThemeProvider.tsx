"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type Theme = "light" | "dark";

interface PreviewThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const PreviewThemeContext = createContext<PreviewThemeContextValue | null>(null);

export function usePreviewTheme() {
  const ctx = useContext(PreviewThemeContext);
  if (!ctx) throw new Error("usePreviewTheme must be used within PreviewThemeProvider");
  return ctx;
}

export function PreviewThemeProvider({ children, initial = "light" as Theme }: { children: React.ReactNode; initial?: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial);
  const value = useMemo(() => ({ theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") }), [theme]);
  return <PreviewThemeContext.Provider value={value}>{children}</PreviewThemeContext.Provider>;
}
