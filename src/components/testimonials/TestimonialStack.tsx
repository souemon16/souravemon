// FILE: src/components/testimonials/TestimonialStack.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { TestimonialAvatar } from "@/components/testimonials/TestimonialAvatar";
import { soundManager } from "@/lib/sound/soundManager";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

const AUTOPLAY_MS = 6000;

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 48 : -48, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -48 : 48, opacity: 0, scale: 0.97 }),
};

export function TestimonialStack() {
  const ordered = [...testimonials].sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const shouldAutoplay = !paused && !prefersReducedMotion && ordered.length > 1;

  useEffect(() => {
    if (!shouldAutoplay) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % ordered.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldAutoplay, ordered.length]);

  function goTo(next: number) {
    soundManager.click();
    const wrapped = ((next % ordered.length) + ordered.length) % ordered.length;
    setDirection(next > index || (index === ordered.length - 1 && next === 0) ? 1 : -1);
    setIndex(wrapped);
  }

  if (ordered.length === 0) {
    return <p className="font-mono text-sm text-secondary text-center">No testimonials yet.</p>;
  }

  const current = ordered[index];

  return (
    <div
      className="relative mx-auto max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Tight stack layers — barely peek out, no extra height below */}
      {ordered.length > 1 && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 inset-y-0 translate-y-2 rounded-lg border border-border bg-surface/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-1.5 inset-y-0 translate-y-1 rounded-lg border border-border bg-surface/60"
          />
        </>
      )}

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={prefersReducedMotion ? undefined : variants}
            initial={prefersReducedMotion ? { opacity: 0 } : "enter"}
            animate={prefersReducedMotion ? { opacity: 1 } : "center"}
            exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-lg border border-border bg-surface p-6 md:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]"
          >
            <Quote className="text-signal/30 mb-3" size={26} aria-hidden="true" />

            <p className="font-body text-primary text-base md:text-lg leading-relaxed mb-5">
              &ldquo;{current.message}&rdquo;
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <TestimonialAvatar src={current.avatar} name={current.name} />
                <div className="min-w-0">
                  <p className="font-display text-sm font-medium text-primary truncate">
                    {current.name}
                  </p>
                  <p className="font-mono text-[10px] text-secondary tracking-wide truncate">
                    {current.role}
                    {current.company ? ` · ${current.company}` : ""}
                  </p>
                </div>
              </div>

              {/* Dots live INSIDE the card, bottom-right */}
              {ordered.length > 1 && (
                <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Testimonial slides">
                  {ordered.map((t, i) => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === index ? "w-5 bg-signal" : "w-1.5 bg-border hover:bg-secondary/50"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side arrows — outside the card, no height impact */}
      {ordered.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="absolute left-[-12px] md:left-[-48px] top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-secondary hover:text-signal hover:border-signal transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="absolute right-[-12px] md:right-[-48px] top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-secondary hover:text-signal hover:border-signal transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}