// FILE: src/components/services/ServiceCard.tsx
"use client";

import {
  Globe,
  Sparkles,
  Palette,
  Clapperboard,
  PenTool,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Service } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  sparkles: Sparkles,
  palette: Palette,
  clapperboard: Clapperboard,
  "pen-tool": PenTool,
  "graduation-cap": GraduationCap,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Sparkles;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5 rounded-md border bg-surface p-6",
        "transition-all duration-300 ease-standard",
        "hover:-translate-y-1 hover:shadow-[0_0_28px_-12px_var(--accent-signal)]",
        service.featured
          ? "border-signal/40 hover:border-signal/70"
          : "border-border hover:border-signal/40"
      )}
    >
      {service.featured && (
        <div className="absolute -top-2.5 right-4">
          <Badge className="text-[10px]">Featured</Badge>
        </div>
      )}

      <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-surface-2 text-signal transition-colors group-hover:border-signal/40">
        <Icon size={20} strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-medium text-primary">{service.title}</h3>
        <p className="font-body text-sm leading-relaxed text-secondary">{service.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {service.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-wide px-2 py-1 rounded-sm border border-border text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}