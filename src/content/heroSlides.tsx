// FILE: src/content/heroSlides.tsx
import { ReactNode } from "react";
import { PhotoSlide } from "@/components/hero/PhotoSlide";

/**
 * TEMPORARY — will move to Supabase (media table) in Phase 16–19,
 * managed through the admin panel instead of editing this file directly.
 *
 * To add/remove a real photo:
 *   1. Drop the image file into public/images/hero/
 *   2. Add or remove a line in `photoFilenames` below
 * No other code changes needed.
 */
const photoFilenames: string[] = [
  "photo-1.jpeg",
  "photo-2.jpeg",
  "photo-3.jpeg",
  "photo-4.jpeg",
  "photo-5.jpeg",
  "photo-6.jpeg",
  "photo-7.png",
  "photo-8.jpeg",
  "photo-9.jpeg",
];

const photoSlides = photoFilenames.map((filename) => ({
  id: filename,
  node: (
    <PhotoSlide
      src={`/images/hero/${filename}`}
      alt="Sourav Sarker Emon"
    />
  ),
}));


/**
 * Final slide order: real photos first (if any exist), then the creative
 * identity cards mixed in after. If no photos are added yet, it gracefully
 * falls back to showing only the creative cards.
 */
export const heroSlides: { id: string; node: ReactNode }[] = [
  ...photoSlides,
];