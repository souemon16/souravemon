// FILE: src/components/skills/SkillFilters.tsx
"use client";

import { skillCategories, type SkillCategory } from "@/content/skills";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";

export function SkillFilters({
  active,
  onChange,
}: {
  active: SkillCategory | "all";
  onChange: (id: SkillCategory | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
      {skillCategories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              soundManager.click();
              onChange(cat.id);
            }}
            className={cn(
              "font-mono text-xs tracking-wide px-3 py-1.5 rounded-sm border transition-colors",
              isActive
                ? "border-signal bg-signal/10 text-signal"
                : "border-border text-secondary hover:border-signal/50 hover:text-primary"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}