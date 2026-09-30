// FILE: src/components/ui/AnimatedText.tsx

import { cn } from "@/lib/utils/cn";

export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] mr-[0.28em] align-bottom"
        >
          <span
            data-word
            className="inline-block [transform:translateY(100%)] motion-reduce:[transform:translateY(0)] will-change-transform"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}