// FILE: src/components/portfolio/ProjectImage.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|webp|avif|gif)(\?.*)?$/i;

export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && src && !IMAGE_EXTENSION_PATTERN.test(src)) {
      console.warn(
        `[ProjectImage] "${src}" doesn't look like a direct image link. ` +
          `If this is from ImageBB, make sure you copied the "Direct link" (starts with i.ibb.co and ends in .jpg/.png), not the page link (ibb.co/...).`
      );
    }
  }, [src]);

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
      unoptimized
      className="object-cover"
      onError={() => setError(true)}
    />
  );
}