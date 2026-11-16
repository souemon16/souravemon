// FILE: src/components/theme/ThemeToggle.tsx
"use client";

import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { soundManager } from "@/lib/sound/soundManager";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  async function handleToggle() {
    soundManager.click();

    // Fallback / reduced-motion: plain swap, no animation
    if (
      prefersReducedMotion ||
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(max-width: 768px)").matches // skip heavy wipe on mobile for perf
    ) {
      toggleTheme();
      return;
    }

    const btn = btnRef.current;
    if (!btn) {
      toggleTheme();
      return;
    }

    // Origin of the circular wipe = center of the toggle button
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Farthest corner distance — guarantees the circle covers the whole viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Expose coordinates as CSS custom properties for the keyframes
    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-r", `${endRadius}px`);

    try {
      const transition = document.startViewTransition(() => {
        toggleTheme();
      });
      await transition.ready;
    } catch {
      // If the transition is skipped/interrupted, theme still toggled above
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={handleToggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-secondary hover:border-signal hover:text-signal transition-colors overflow-hidden"
      aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "day" ? -30 : 0,
          opacity: theme === "day" ? 0 : 1,
          rotate: theme === "day" ? -90 : 0,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="absolute"
      >
        <Moon size={16} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === "day" ? 0 : 30,
          opacity: theme === "day" ? 1 : 0,
          rotate: theme === "day" ? 0 : 90,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="absolute"
      >
        <Sun size={16} />
      </motion.div>
    </button>
  );
}