// FILE: src/components/layout/ScrollIndicator.tsx
"use client";

import { scrollToSection } from "@/lib/utils/scroll";
import { soundManager } from "@/lib/sound/soundManager";

export function ScrollIndicator({ targetId }: { targetId: string }) {
  return (
    <button
      onClick={() => {
        soundManager.click();
        scrollToSection(targetId);
      }}
      aria-label="Scroll to next section"
      className="group flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-secondary hover:text-signal transition-colors"
    >
      <span>SCROLL TO EXPLORE</span>
      <span className="relative h-8 w-[1.5px] bg-border overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-3 w-full bg-signal animate-[scrollLine_1.8s_ease-in-out_infinite] motion-reduce:animate-none" />
      </span>
    </button>
  );
}