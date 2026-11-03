// FILE: src/components/testimonials/TestimonialAvatar.tsx
"use client";

import { useState } from "react";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialAvatar({ src, name }: { src?: string | null; name: string }) {
  const [error, setError] = useState(false);
  const showFallback = !src || error;

  if (showFallback) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal/15 border border-signal/30 font-mono text-xs text-signal">
        {getInitials(name) || "?"}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="h-10 w-10 shrink-0 rounded-full object-cover border border-border"
      onError={() => setError(true)}
    />
  );
}