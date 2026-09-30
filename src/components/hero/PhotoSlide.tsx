// FILE: src/components/hero/PhotoSlide.tsx
import Image from "next/image";

export function PhotoSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 560px, 760px"
        quality={75}
        className="object-cover"
      />
    </div>
  );
}