    // FILE: src/lib/i18n/LanguageProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "en" | "bn";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "bn") setLang(stored);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "bn" : "en";
      try {
        localStorage.setItem("lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}