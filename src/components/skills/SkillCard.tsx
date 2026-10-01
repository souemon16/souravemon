// FILE: src/components/skills/SkillCard.tsx
"use client";

import {
  Code2,
  Braces,
  FileType,
  Component,
  Globe,
  Wind,
  Server,
  Network,
  Database,
  Cloud,
  Sparkles,
  Activity,
  Palette,
  GitBranch,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { Skill } from "@/content/skills";
import { SkillLevel } from "@/components/skills/SkillLevel";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  "code-2": Code2,
  braces: Braces,
  "file-type": FileType,
  component: Component,
  globe: Globe,
  wind: Wind,
  server: Server,
  network: Network,
  database: Database,
  cloud: Cloud,
  sparkles: Sparkles,
  activity: Activity,
  palette: Palette,
  "git-branch": GitBranch,
  terminal: Terminal,
};

export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = ICONS[skill.icon] ?? Code2;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-md border border-border bg-surface p-5",
        "transition-all duration-300 ease-standard",
        "hover:border-signal/50 hover:-translate-y-1 hover:shadow-[0_0_24px_-10px_var(--accent-signal)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-surface-2 text-signal transition-colors group-hover:border-signal/40">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <SkillLevel level={skill.level} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-lg font-medium text-primary">{skill.name}</h3>
        <p className="font-body text-sm leading-relaxed text-secondary">{skill.description}</p>
      </div>

      <div className="mt-auto pt-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-secondary/80">
          {skill.category}
        </span>
      </div>
    </article>
  );
}