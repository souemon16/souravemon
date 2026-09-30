// FILE: src/components/ui/Carousel.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { soundManager } from "@/lib/sound/soundManager";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

interface CarouselSlide {
  id: string;
  node: ReactNode;
}

export function Carousel({
  slides,
  intervalMs = 5000,
  active = true,
  className,
}: {
  slides: CarouselSlide[];
  intervalMs?: number;
  /** Gate autoplay externally — e.g. wait until an entrance animation finishes */
  active?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const shouldAutoplay = active && !paused && !prefersReducedMotion && slides.length > 1;

  useEffect(() => {
    if (!shouldAutoplay) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldAutoplay, intervalMs, slides.length]);

  function goTo(next: number) {
    soundManager.click();
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  if (slides.length === 0) return null;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[index].id}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          }
          exit={{ opacity: 0, transition: { duration: 0.25, delay: prefersReducedMotion ? 0 : 0.35 } }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }
        >
          {slides[index].node}

          {/* Scanning line synced with the wipe reveal */}
          {!prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-[2px] bg-signal shadow-[0_0_10px_2px_var(--accent-signal)]"
              initial={{ top: "0%", opacity: 1 }}
              animate={{ top: "100%", opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          {/* Manual controls — appear on hover (desktop), always present for a11y via focus */}
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-base/40 text-primary opacity-0 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-base/40 text-primary opacity-0 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-5 bg-signal" : "w-1.5 bg-primary/30 hover:bg-primary/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}