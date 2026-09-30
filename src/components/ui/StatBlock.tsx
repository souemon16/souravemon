// FILE: src/components/ui/StatBlock.tsx
export function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center md:items-start gap-1">
      <span className="font-display text-3xl md:text-4xl font-semibold text-signal">
        {value}
      </span>
      <span className="font-mono text-[10px] tracking-[0.15em] text-secondary uppercase">
        {label}
      </span>
    </div>
  );
}