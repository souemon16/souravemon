// FILE: src/components/layout/ScrollReveal.tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = "up" | "left" | "right" | "none";

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const offsets: Record<Direction, gsap.TweenVars> = {
      up: { y: 32, opacity: 0 },
      left: { x: -32, opacity: 0 },
      right: { x: 32, opacity: 0 },
      none: { opacity: 0 },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        offsets[direction],
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}