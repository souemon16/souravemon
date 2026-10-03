// FILE: src/components/education/Education.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { EducationItemCard } from "@/components/education/EducationItem";
import { CoursesList } from "@/components/education/Courses";
import { EducationTabs, type EducationTab } from "@/components/education/EducationTabs";
import { education, educationContent } from "@/content/education";
import { coursesContent } from "@/content/courses";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TAB_ORDER: EducationTab[] = ["education", "courses"];

export function Education() {
  const [activeTab, setActiveTab] = useState<EducationTab>("education");
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const ordered = [...education].sort((a, b) => a.order - b.order);
  const activeIndex = TAB_ORDER.indexOf(activeTab);
  const content = activeTab === "education" ? educationContent : coursesContent;

  function handleTabChange(tab: EducationTab) {
    const nextIndex = TAB_ORDER.indexOf(tab);
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveTab(tab);
  }

  return (
    <Section id="education">
      <ScrollReveal>
        <SectionHeader eyebrow={content.eyebrow} heading={content.heading} className="mb-6" />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mb-8 text-base md:text-lg">
          {content.intro}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mb-10">
          <EducationTabs active={activeTab} onChange={handleTabChange} />
        </div>
      </ScrollReveal>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: direction * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: direction * -40, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "education" ? (
              <div className="max-w-3xl">
                {ordered.map((item, i) => (
                  <ScrollReveal key={item.id} delay={Math.min(i * 0.06, 0.24)}>
                    <EducationItemCard item={item} isLast={i === ordered.length - 1} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <CoursesList />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}