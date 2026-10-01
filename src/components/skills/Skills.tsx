// FILE: src/components/skills/Skills.tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { SkillFilters } from "@/components/skills/SkillFilters";
import { SkillCard } from "@/components/skills/SkillCard";
import { skills, type SkillCategory } from "@/content/skills";

export function Skills() {
  const [active, setActive] = useState<SkillCategory | "all">("all");

  const filtered = useMemo(() => {
    const list =
      active === "all" ? skills : skills.filter((s) => s.category === active);
    return [...list].sort((a, b) => a.order - b.order);
  }, [active]);

  return (
    <Section id="skills">
      <ScrollReveal>
        <SectionHeader
          eyebrow="SKILLS"
          heading="Tools in the Signal Stack"
          className="mb-8"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mb-8 text-base md:text-lg">
          A focused set of technologies I use to design, build, and animate digital experiences.
          Levels are honest proficiency markers — not marketing scores.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-10">
          <SkillFilters active={active} onChange={setActive} />
        </div>
      </ScrollReveal>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.2) }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="font-mono text-sm text-secondary mt-8">No skills in this category yet.</p>
      )}
    </Section>
  );
}