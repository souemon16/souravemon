// FILE: src/components/portfolio/Portfolio.tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { projects, portfolioContent, type ProjectCategory, type Project } from "@/content/portfolio";

export function Portfolio() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const list = active === "all" ? projects : projects.filter((p) => p.category === active);
    return [...list].sort((a, b) => a.order - b.order);
  }, [active]);

  return (
    <Section id="portfolio">
      <ScrollReveal>
        <SectionHeader eyebrow={portfolioContent.eyebrow} heading={portfolioContent.heading} className="mb-6" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mb-8 text-base md:text-lg">
          {portfolioContent.intro}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-10">
          <PortfolioFilters active={active} onChange={setActive} />
        </div>
      </ScrollReveal>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="font-mono text-sm text-secondary mt-8">No projects in this category yet.</p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}