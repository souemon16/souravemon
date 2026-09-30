// FILE: src/hooks/useHasFinePointer.ts
"use client";

import { useEffect, useState } from "react";

/**
 * True only for devices with a precise pointer AND real hover capability
 * (i.e. a mouse/trackpad) — false for touch devices, even large tablets.
 */
export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasFinePointer(query.matches);

    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return hasFinePointer;
}