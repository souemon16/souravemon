// FILE: src/components/ui/TerminalLine.tsx
import { cn } from "@/lib/utils/cn";

export function TerminalLine({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("font-mono text-sm md:text-base", className)}>
      <span className="text-signal">&gt; </span>
      <span className="text-secondary">{label}: </span>
      <span className="text-primary">{value}</span>
    </div>
  );
}