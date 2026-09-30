// FILE: src/components/effects/LoadingScreen.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { INTRO_SESSION_KEY, INTRO_COMPLETE_EVENT } from "@/lib/constants";

const SEQUENCE = [
  "INITIALIZING SIGNAL",
  "IDENTITY // SOURAV SARKER EMON",
  "CREATIVE SYSTEM // ONLINE",
  "PORTFOLIO // DECODED",
];

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable — fail open, just show it once anyway
    }

    if (alreadyShown) {
      setVisible(false);
      // Still notify — Hero needs this signal even when the overlay never rendered.
      window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
      return;
    }

    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }

    const skipTimer = setTimeout(() => setCanSkip(true), 500);

    const counter = { value: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    timelineRef.current = tl;

    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i * 0.45;
      tl.fromTo(
        el,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        start
      ).to(el, { opacity: 0.3, duration: 0.25, ease: "power1.out" }, start + 0.5);
    });

    tl.to(
      counter,
      {
        value: 100,
        duration: SEQUENCE.length * 0.45 + 0.4,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(counter.value)
              .toString()
              .padStart(3, "0");
          }
        },
      },
      0
    );

    tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.3");

    return () => {
      clearTimeout(skipTimer);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      // ignore
    }
    document.body.style.overflow = "";
    setVisible(false);
    window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
  }

  function handleSkip() {
    if (!canSkip || finishedRef.current) return;
    timelineRef.current?.kill();
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: finish,
    });
  }

  useEffect(() => {
    if (!visible) return;
    function handleKeyDown() {
      handleSkip();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, canSkip]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading site"
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base cursor-pointer select-none"
    >
      <div className="flex flex-col items-start gap-2 font-mono text-sm md:text-base text-secondary">
        {SEQUENCE.map((line, i) => (
          <div
            key={line}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="opacity-0"
          >
            <span className="text-signal mr-2">&gt;</span>
            {line}
          </div>
        ))}
      </div>

      <div className="mt-10 font-mono text-3xl md:text-4xl text-primary tabular-nums">
        <span ref={counterRef}>000</span>
        <span className="text-secondary text-lg">%</span>
      </div>

      {canSkip && (
        <div className="absolute bottom-8 font-mono text-xs text-secondary/60 animate-pulse">
          CLICK OR PRESS ANY KEY TO SKIP
        </div>
      )}
    </div>
  );
}