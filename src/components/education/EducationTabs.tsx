// FILE: src/components/education/EducationTabs.tsx
"use client";

import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";

export type EducationTab = "education" | "courses";

const TABS: { id: EducationTab; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "courses", label: "Courses" },
];

export function EducationTabs({
  active,
  onChange,
}: {
  active: EducationTab;
  onChange: (tab: EducationTab) => void;
}) {
  return (
    <div
      className="inline-flex gap-1 p-1 rounded-pill border border-border bg-surface"
      role="tablist"
      aria-label="Education or Courses"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              if (isActive) return;
              soundManager.click();
              onChange(tab.id);
            }}
            className={cn(
              "font-mono text-xs tracking-wide px-4 py-2 rounded-pill transition-colors",
              isActive
                ? "bg-signal text-[var(--bg-base)]"
                : "text-secondary hover:text-primary"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}