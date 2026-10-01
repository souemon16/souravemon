// FILE: src/components/skills/SkillLevel.tsx

import { cn } from "@/lib/utils/cn";

export function SkillLevel({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            i < level ? "bg-signal" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}