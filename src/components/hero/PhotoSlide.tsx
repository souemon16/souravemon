// FILE: src/components/hero/PhotoSlide.tsx
import Image from "next/image";

export function PhotoSlide({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        // size o baraya rakhsi kintu phone er jonno eta beshi mb khabe
        sizes="(max-width: 768px) 560px, 760px"
        // image quality kahini korle ekhan theke change kora jabe default 75 ami 90 kore rakhsi
        quality={90}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}