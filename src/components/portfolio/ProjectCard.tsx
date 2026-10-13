// FILE: src/components/portfolio/ProjectCard.tsx
"use client";

import { Project, portfolioCategories } from "@/content/portfolio";
import { Badge } from "@/components/ui/Badge";
import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const categoryLabel =
    portfolioCategories.find((c) => c.id === project.category)?.label ?? project.category;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-md border bg-surface overflow-hidden cursor-pointer",
        "transition-all duration-300 ease-standard",
        "hover:-translate-y-1 hover:shadow-[0_0_28px_-12px_var(--accent-signal)]",
        project.featured ? "border-signal/40 hover:border-signal/70" : "border-border hover:border-signal/40"
      )}
      onClick={() => {
        soundManager.click();
        onOpen(project);
      }}
    >
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="text-[10px]">Featured</Badge>
        </div>
      )}

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <ProjectImage src={project.thumbnail} alt={project.title} />
      </div>

      <div className="flex flex-col gap-2 px-5 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-signal">
          {categoryLabel} · {project.year}
        </p>
        <h3 className="font-display text-lg font-medium text-primary">{project.title}</h3>
        <p className="font-body text-sm leading-relaxed text-secondary line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-1 rounded-sm border border-border text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}