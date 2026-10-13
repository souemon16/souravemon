

// FILE: src/components/portfolio/ProjectModal.tsx
"use client";

import { ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Modal } from "@/components/ui/Modal";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { Project } from "@/content/portfolio";
import { Button } from "@/components/ui/Button";

function isYouTubeUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    const id = u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const images = project ? [project.thumbnail, ...project.gallery] : [];
  const hasLinks = project && (project.liveUrl || project.githubUrl || project.externalUrl);

  return (
    <Modal open={!!project} onClose={onClose} className="max-w-3xl">
      {project && (
        <div className="flex flex-col gap-6">
          <ProjectGallery images={images} alt={project.title} />

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-signal">
              {project.category} · {project.year}
              {project.client ? ` · ${project.client}` : ""}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-primary">
              {project.title}
            </h3>
            <p className="font-body text-secondary leading-relaxed">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wide px-2 py-1 rounded-sm border border-border text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.videoUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
              {isYouTubeUrl(project.videoUrl) ? (
                <iframe
                  src={toYouTubeEmbed(project.videoUrl)}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={project.videoUrl} controls className="h-full w-full" />
              )}
            </div>
          )}

          {hasLinks && (
            <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
              {project.liveUrl && (
                <Button variant="primary" size="sm" onClick={() => window.open(project.liveUrl!, "_blank")}>
                  <ExternalLink size={14} /> Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="secondary" size="sm" onClick={() => window.open(project.githubUrl!, "_blank")}>
                  <FaGithub size={14} /> Source
                </Button>
              )}
              {project.externalUrl && (
                <Button variant="secondary" size="sm" onClick={() => window.open(project.externalUrl!, "_blank")}>
                  <FileText size={14} /> Read Article
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}