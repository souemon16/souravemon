// FILE: src/components/education/EducationItem.tsx
"use client";

import { EducationItem as EducationItemType } from "@/content/education";
import { cn } from "@/lib/utils/cn";
import { ExternalLink } from "lucide-react";

export function EducationItemCard({
  item,
  isLast,
}: {
  item: EducationItemType;
  isLast: boolean;
}) {
  return (
    <div className="relative grid grid-cols-[24px_1fr] gap-5 md:gap-8">
      {/* Timeline rail */}
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full bg-signal shadow-[0_0_12px_2px_var(--accent-signal)]" />
        {!isLast && (
          <span className="absolute top-4 bottom-0 w-px bg-gradient-to-b from-signal/70 via-border to-border" />
        )}
      </div>

      {/* Content */}
      <article
        className={cn(
          "mb-10 rounded-md border border-border bg-surface p-5 md:p-6",
          "transition-all duration-300 hover:border-signal/40"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-display text-xl font-medium text-primary">{item.degree}</h3>
            <p className="font-body text-signal mt-1">{item.institution}</p>
          </div>
          <p className="font-mono text-xs tracking-wide text-secondary whitespace-nowrap">
            {item.startYear} — {item.endYear}
          </p>
        </div>

        <p className="font-body text-sm leading-relaxed text-secondary">{item.description}</p>

        {item.certificateUrl && (
          <a
            href={item.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs text-signal hover:underline"
          >
            View Certificate <ExternalLink size={12} />
          </a>
        )}
      </article>
    </div>
  );
}