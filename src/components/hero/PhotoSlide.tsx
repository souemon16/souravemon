// FILE: src/components/hero/PhotoSlide.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export function PhotoSlide({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}