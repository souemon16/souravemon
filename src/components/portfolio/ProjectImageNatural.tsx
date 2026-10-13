// FILE: src/components/portfolio/ProjectImageNatural.tsx
"use client";

import { useEffect, useState } from "react";

const IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|webp|avif|gif)(\?.*)?$/i;

export function ProjectImageNatural({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && src && !IMAGE_EXTENSION_PATTERN.test(src)) {
      console.warn(
        `[ProjectImageNatural] "${src}" doesn't look like a direct image link. ` +
          `Use the ImageBB "Direct link" (i.ibb.co/...), not the page link.`
      );
    }
  }, [src]);

  if (error || !src) {
    return (
      <div className="flex h-40 w-full items-center justify-center bg-surface-2 text-secondary font-mono text-xs">
        IMAGE UNAVAILABLE
      </div>
    );
  }

  return (
    // Plain <img> intentionally — these are external, unoptimized URLs
    // and we need natural height (not Next/Image's required fixed box).
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="block w-full h-auto" onError={() => setError(true)} />
  );
}