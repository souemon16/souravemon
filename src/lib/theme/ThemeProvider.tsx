// FILE: src/lib/theme/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTimeBasedTheme } from "./getTimeBasedTheme";

type Theme = "day" | "night";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "night";
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "day" || attr === "night" ? attr : getTimeBasedTheme();
  });

  useEffect(() => {
    // Re-check every minute so a visitor who stays through sunrise/sunset
    // gets a smooth automatic crossfade, not a stale theme.
    function sync() {
      const next = getTimeBasedTheme();
      setThemeState((prev) => {
        if (prev !== next) {
          document.documentElement.setAttribute("data-theme", next);
        }
        return next;
      });
    }

    const interval = setInterval(sync, 60_000);
    return () => clearInterval(interval);
  }, []);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}