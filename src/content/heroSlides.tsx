// FILE: src/content/heroSlides.tsx
import { ReactNode } from "react";
import { PhotoSlide } from "@/components/hero/PhotoSlide";

const photoFilenames: string[] = [
  "photo-1.jpeg",
  "photo-2.jpeg",
  "photo-3.jpeg",
  "photo-4.jpeg",
  "photo-5.jpeg",
  "photo-6.jpeg",
  "photo-7.jpeg",
  "photo-8.jpeg",
];

const photoSlides = photoFilenames.map((filename, i) => ({
  id: filename,
  node: (
    <PhotoSlide
      src={`/images/hero/${filename}`}
      alt="Sourav Sarker Emon"
      priority={i === 0}
    />
  ),
}));


export const heroSlides: { id: string; node: ReactNode }[] = [
  ...photoSlides,
];