// FILE: src/components/portfolio/ProjectImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface-2 text-secondary font-mono text-xs text-center px-4">
        IMAGE UNAVAILABLE
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setError(true)}
    />
  );
}