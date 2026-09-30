// FILE: src/components/layout/MobileMenu.tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { NAV_ITEMS } from "@/config/nav.config";
import { scrollToSection } from "@/lib/utils/scroll";
import { soundManager } from "@/lib/sound/soundManager";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEffect } from "react";
import { LanguageSwitcher } from "@/lib/i18n/LanguageSwitcher";

export function MobileMenu({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
}) {
  useBodyScrollLock(open);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  function handleLinkClick(id: string) {
    soundManager.click();
    onClose();
    // Small delay lets the menu close animation start before scrolling
    setTimeout(() => scrollToSection(id), 150);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-base flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-secondary hover:text-signal transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-6">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`font-display text-3xl transition-colors ${
                  activeId === item.id ? "text-signal" : "text-primary hover:text-signal"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex justify-center pb-10">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}