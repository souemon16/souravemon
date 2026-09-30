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

  if (error) {
   "photo not found:@error"
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 560px, 760px"
        quality={90}
        priority={priority}
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}