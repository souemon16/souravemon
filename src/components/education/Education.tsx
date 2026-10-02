// FILE: src/components/education/Education.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { EducationItemCard } from "@/components/education/EducationItem";
import { education, educationContent } from "@/content/education";

export function Education() {
  const ordered = [...education].sort((a, b) => a.order - b.order);

  return (
    <Section id="education">
      <ScrollReveal>
        <SectionHeader
          eyebrow={educationContent.eyebrow}
          heading={educationContent.heading}
          className="mb-6"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mb-12 text-base md:text-lg">
          {educationContent.intro}
        </p>
      </ScrollReveal>

      <div className="max-w-3xl">
        {ordered.map((item, i) => (
          <ScrollReveal key={item.id} delay={Math.min(i * 0.06, 0.24)}>
            <EducationItemCard item={item} isLast={i === ordered.length - 1} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}