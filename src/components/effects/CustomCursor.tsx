// FILE: src/components/effects/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useHasFinePointer } from "@/hooks/useHasFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';
const MAGNETIC_SELECTOR = "[data-magnetic]";

export function CustomCursor() {
  const hasFinePointer = useHasFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !prefersReducedMotion;

  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Ring lags slightly (softer spring) for a trailing feel.
  const ringX = useSpring(rawX, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(rawY, { stiffness: 260, damping: 26, mass: 0.5 });

  // Dot tracks tightly, feels precise.
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.15 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.15 });

  const magnetElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");

    function handleMouseMove(e: MouseEvent) {
      const magnetEl = magnetElRef.current;

      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Partial pull toward center — 65% magnet, 35% real position.
        rawX.set(centerX + (e.clientX - centerX) * 0.35);
        rawY.set(centerY + (e.clientY - centerY) * 0.35);
      } else {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      }

      setIsVisible(true);
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) setIsHovering(true);

      const magnetTarget = target.closest(MAGNETIC_SELECTOR) as HTMLElement | null;
      if (magnetTarget) magnetElRef.current = magnetTarget;
    }

    function handleMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) setIsHovering(false);

      const magnetTarget = target.closest(MAGNETIC_SELECTOR);
      if (magnetTarget && magnetElRef.current === magnetTarget) {
        magnetElRef.current = null;
      }
    }

    function handleMouseDown() {
      setIsPressed(true);
    }
    function handleMouseUp() {
      setIsPressed(false);
    }
    function handleLeaveWindow() {
      setIsVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — targeting reticle */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 52 : 30,
          height: isHovering ? 52 : 30,
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.82 : 1,
          borderColor: isHovering ? "var(--accent-pulse)" : "var(--accent-signal)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner dot — precise tracking, hides while targeting */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-signal"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 0 : 6,
          height: isHovering ? 0 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}