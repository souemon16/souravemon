// FILE: src/components/i18n/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={() => {
        soundManager.click();
        toggleLang();
      }}
      className="font-mono text-xs tracking-wide px-3 py-1.5 rounded-sm border border-border hover:border-signal transition-colors"
      aria-label="Toggle language"
    >
      <span className={cn(lang === "en" ? "text-signal" : "text-secondary")}>EN</span>
      <span className="text-secondary mx-1">/</span>
      <span className={cn(lang === "bn" ? "text-signal" : "text-secondary")}>বাং</span>
    </button>
  );
}