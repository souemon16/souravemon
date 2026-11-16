// FILE: src/lib/theme/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTimeBasedTheme } from "./getTimeBasedTheme";

type Theme = "day" | "night";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Read initial theme from HTML attribute set by inline script
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "night";
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "day" || attr === "night" ? attr : getTimeBasedTheme();
  });

  // Track if user manually overrode the theme this session
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    function sync() {
      if (isManual) return; // Stop auto-sync if user manually toggled
      const next = getTimeBasedTheme();
      setThemeState((prev) => {
        if (prev !== next) document.documentElement.setAttribute("data-theme", next);
        return next;
      });
    }
    const interval = setInterval(sync, 60_000);
    return () => clearInterval(interval);
  }, [isManual]);

  const toggleTheme = () => {
    setIsManual(true); // Disable auto-time switching for this session
    setThemeState((prev) => {
      const next = prev === "day" ? "night" : "day";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}