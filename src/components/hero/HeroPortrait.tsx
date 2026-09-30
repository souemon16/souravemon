// FILE: src/components/hero/HeroPortrait.tsx
"use client";

import { forwardRef } from "react";
import { ScanFrame } from "@/components/ui/ScanFrame";
import { Carousel } from "@/components/ui/Carousel";
import { heroSlides } from "@/content/heroSlides";

export const HeroPortrait = forwardRef<
  HTMLDivElement,
  { sweepRef: React.RefObject<HTMLDivElement | null>; carouselActive: boolean }
>(({ sweepRef, carouselActive }, imageWrapRef) => {
  return (
    <ScanFrame className="w-full max-w-[320px] md:max-w-[380px] mx-auto">
      <div
        ref={imageWrapRef}
        data-hero-image
        className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-surface border border-border opacity-0 motion-reduce:opacity-100"
      >
        <div className="group relative h-full w-full">
          <Carousel slides={heroSlides} active={carouselActive} intervalMs={5000} />
        </div>

        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-x-0 top-[-20%] z-20 h-1/3 bg-gradient-to-b from-transparent via-signal/70 to-transparent motion-reduce:hidden"
        />
      </div>
    </ScanFrame>
  );
});
HeroPortrait.displayName = "HeroPortrait";