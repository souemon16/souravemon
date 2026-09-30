// FILE: src/components/hero/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Section } from "@/components/ui/Section";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { scrollToSection } from "@/lib/utils/scroll";
import { heroContent } from "@/content/hero";
import { useIntroComplete } from "@/hooks/useIntroComplete";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const introComplete = useIntroComplete();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [entranceDone, setEntranceDone] = useState(false);

  const badgeRef = useRef<HTMLDivElement>(null);
  const nameWrapRef = useRef<HTMLHeadingElement>(null);
  const roleWrapRef = useRef<HTMLParagraphElement>(null);
  const taglineWrapRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introComplete) return;

    if (prefersReducedMotion) {
      setEntranceDone(true);
      return;
    }

    const nameWords = nameWrapRef.current?.querySelectorAll("[data-word]") ?? [];
    const roleWords = roleWrapRef.current?.querySelectorAll("[data-word]") ?? [];
    const taglineWords = taglineWrapRef.current?.querySelectorAll("[data-word]") ?? [];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setEntranceDone(true),
    });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 })
      .to(nameWords, { yPercent: 0, duration: 0.8, stagger: 0.08 }, "-=0.2")
      .to(roleWords, { yPercent: 0, duration: 0.6, stagger: 0.06 }, "-=0.4")
      .to(taglineWords, { yPercent: 0, duration: 0.6, stagger: 0.03 }, "-=0.4")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(imageWrapRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.9")
      .fromTo(
        sweepRef.current,
        { top: "-20%" },
        { top: "120%", duration: 1, ease: "power1.inOut" },
        "<"
      )
      .to(sweepRef.current, { opacity: 0, duration: 0.3 }, ">-0.1")
      .to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [introComplete, prefersReducedMotion]);

  return (
    <Section id="hero" className="min-h-screen flex flex-col justify-center py-32 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <div
            ref={badgeRef}
            className="inline-block opacity-0 [transform:translateY(0.75rem)] motion-reduce:opacity-100 motion-reduce:[transform:translateY(0)] mb-6"
          >
            <Badge>{heroContent.eyebrow}</Badge>
          </div>

          <h1
            ref={nameWrapRef}
            className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-3"
          >
            <AnimatedText text={heroContent.name} />
          </h1>

          <p
            ref={roleWrapRef}
            className="font-display text-2xl md:text-3xl font-medium text-signal mb-6"
          >
            <AnimatedText text={heroContent.role} />
          </p>

          <p
            ref={taglineWrapRef}
            className="font-body text-lg md:text-xl text-secondary max-w-md mx-auto md:mx-0 mb-10"
          >
            <AnimatedText text={heroContent.tagline} />
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0 [transform:translateY(0.75rem)] motion-reduce:opacity-100 motion-reduce:[transform:translateY(0)]"
          >
            <Button variant="primary" size="lg" data-magnetic onClick={() => scrollToSection(heroContent.ctaPrimary.targetId)}>
              {heroContent.ctaPrimary.label}
            </Button>
            <Button variant="secondary" size="lg" data-magnetic onClick={() => scrollToSection(heroContent.ctaSecondary.targetId)}>
              {heroContent.ctaSecondary.label}
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <HeroPortrait ref={imageWrapRef} sweepRef={sweepRef} carouselActive={entranceDone} />
        </div>
      </div>

      <div ref={scrollRef} className="mt-16 md:mt-20 flex justify-center opacity-0 motion-reduce:opacity-100">
        <ScrollIndicator targetId="about" />
      </div>
    </Section>
  );
}