// FILE: src/components/about/About.tsx
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ScanFrame } from "@/components/ui/ScanFrame";
import { TerminalLine } from "@/components/ui/TerminalLine";
import { StatBlock } from "@/components/ui/StatBlock";
import { aboutContent } from "@/content/about";

export function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow={aboutContent.eyebrow} heading={aboutContent.heading} className="mb-14" />

      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-start">
        {/* Left: philosophy panel, framed like the hero portrait for visual consistency */}
        <ScrollReveal direction="left">
          <ScanFrame>
            <div className="rounded-md border border-border bg-surface p-6 md:p-8 flex flex-col gap-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-1">
                PRINCIPLES.LOG
              </p>
              {aboutContent.principles.map((p) => (
                <TerminalLine key={p.label} label={p.label} value={p.value} />
              ))}
            </div>
          </ScanFrame>
        </ScrollReveal>

        {/* Right: narrative + stats */}
        <div className="flex flex-col gap-8">
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-4">
              {aboutContent.paragraphs.map((paragraph, i) => (
                <p key={i} className="font-body text-secondary leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {aboutContent.stats.map((stat) => (
                <StatBlock key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}