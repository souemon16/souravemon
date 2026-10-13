// FILE: src/components/portfolio/ProjectGallery.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectImageNatural } from "@/components/portfolio/ProjectImageNatural";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  function goTo(next: number) {
    soundManager.click();
    setIndex(((next % images.length) + images.length) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-md border border-border bg-surface-2 overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectImageNatural src={images[index]} alt={alt} />
            </motion.div>
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base/70 text-primary hover:text-signal transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-base/70 text-primary hover:text-signal transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-signal" : "w-1.5 bg-border hover:bg-secondary/50"
              )}
            />
          ))}
        </div>
      )}

      <p className="text-center font-mono text-[10px] text-secondary/60">
        Scroll inside the image to view the full page
      </p>
    </div>
  );
}