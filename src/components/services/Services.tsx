// FILE: src/components/services/Services.tsx
"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services, servicesContent } from "@/content/services";
import { scrollToSection } from "@/lib/utils/scroll";

export function Services() {
  const ordered = [...services].sort((a, b) => a.order - b.order);

  return (
    <Section id="services">
      <ScrollReveal>
        <SectionHeader
          eyebrow={servicesContent.eyebrow}
          heading={servicesContent.heading}
          className="mb-6"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p className="font-body text-secondary max-w-2xl mb-12 text-base md:text-lg">
          {servicesContent.intro}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ordered.map((service, i) => (
          <ScrollReveal key={service.id} delay={Math.min(i * 0.05, 0.2)}>
            <ServiceCard service={service} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-14 flex flex-col items-center text-center gap-5 border-t border-border pt-12">
          <p className="font-display text-2xl md:text-3xl text-primary max-w-xl">
            Have an idea worth building?
          </p>
          <p className="font-body text-secondary max-w-md">
            Tell me what you&apos;re working on — I&apos;ll help shape it into something people remember.
          </p>
          <Button
            variant="primary"
            size="lg"
            data-magnetic
            onClick={() => scrollToSection(servicesContent.ctaTargetId)}
          >
            {servicesContent.ctaLabel}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  );
}