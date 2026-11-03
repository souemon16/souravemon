// FILE: src/components/contact/Contact.tsx
"use client";

import { MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { contactContent, getWhatsAppUrl } from "@/content/contact";
import { soundManager } from "@/lib/sound/soundManager";

export function Contact() {
  const href = getWhatsAppUrl(contactContent.whatsappNumber, contactContent.whatsappPrefill);

  function handleWhatsApp() {
    soundManager.click();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <Section id="contact" className="min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <SectionHeader
            eyebrow={contactContent.eyebrow}
            heading={contactContent.heading}
            align="center"
            className="mb-6"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="font-body text-secondary text-base md:text-lg leading-relaxed mb-10">
            {contactContent.intro}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Button variant="primary" size="lg" data-magnetic onClick={handleWhatsApp}>
            <MessageCircle size={18} />
            {contactContent.whatsappLabel}
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-6 font-mono text-[10px] tracking-wide text-secondary/70">
            Opens WhatsApp in a new tab
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}