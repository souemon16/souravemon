// FILE: src/components/testimonials/Testimonials.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { TestimonialStack } from "@/components/testimonials/TestimonialStack";
import { testimonialsContent } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <ScrollReveal>
        <SectionHeader
          eyebrow={testimonialsContent.eyebrow}
          heading={testimonialsContent.heading}
          align="center"
          className="mb-6"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mx-auto text-center mb-4 text-base md:text-lg">
          {testimonialsContent.intro}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <TestimonialStack />
      </ScrollReveal>
    </Section>
  );
}