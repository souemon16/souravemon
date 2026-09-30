// FILE: src/components/layout/SectionHeader.tsx
import { cn } from "@/lib/utils/cn";

export function SectionHeader({
  eyebrow,
  heading,
  align = "left",
  className,
}: {
  eyebrow: string;
  heading: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="font-mono text-xs tracking-[0.25em] text-signal mb-3">{eyebrow}</p>
      <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
        {heading}
      </h2>
    </div>
  );
}