// FILE: src/components/hero/TypewriterRole.tsx
"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TITLES = ["Creative Technologist", "Animator", "Web Developer", "ICT Mentor"];
const TYPE_MS = 55;
const DELETE_MS = 35;
const HOLD_MS = 2200;
const PAUSE_BETWEEN_MS = 400;

export function TypewriterRole({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(TITLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(TITLES[0]);
      return;
    }

    const full = TITLES[index];

    if (!isDeleting && text === full) {
      const t = setTimeout(() => setIsDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % TITLES.length);
      }, PAUSE_BETWEEN_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
        );
      },
      isDeleting ? DELETE_MS : TYPE_MS
    );

    return () => clearTimeout(t);
  }, [text, isDeleting, index, prefersReducedMotion]);

  return (
    <span className={className} aria-label={TITLES[index]}>
      {text}
      <span
        className="inline-block w-[0.55ch] ml-0.5 -mb-0.5 h-[1em] align-[-0.1em] bg-signal animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      />
    </span>
  );
}