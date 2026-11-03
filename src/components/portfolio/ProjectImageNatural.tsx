// FILE: src/components/portfolio/ProjectImageNatural.tsx
"use client";

import { useState } from "react";

export function ProjectImageNatural({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="flex h-40 w-full items-center justify-center bg-surface-2 text-secondary font-mono text-xs">
        IMAGE UNAVAILABLE
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      loading="lazy"
      className="block w-full h-auto" 
      onError={() => setError(true)} 
    />
  );
}