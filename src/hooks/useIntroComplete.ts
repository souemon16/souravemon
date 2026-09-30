// FILE: src/hooks/useIntroComplete.ts
"use client";

import { useEffect, useState } from "react";
import { INTRO_SESSION_KEY, INTRO_COMPLETE_EVENT } from "@/lib/constants";

function checkAlreadyShown(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function useIntroComplete() {
  // Lazy init reads sessionStorage synchronously during the first render,
  // eliminating the race where LoadingScreen's "complete" event could fire
  // before this component's event listener was attached.
  const [complete, setComplete] = useState<boolean>(checkAlreadyShown);

  useEffect(() => {
    if (complete) return; // already resolved synchronously above

    function handleComplete() {
      setComplete(true);
    }

    window.addEventListener(INTRO_COMPLETE_EVENT, handleComplete);
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, handleComplete);
  }, [complete]);

  return complete;
}