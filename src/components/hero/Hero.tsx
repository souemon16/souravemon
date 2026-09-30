// FILE: src/components/hero/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { scrollToSection } from "@/lib/utils/scroll";
import { heroContent } from "@/content/hero";
import { useIntroComplete } from "@/hooks/useIntroComplete";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { TypewriterRole } from "@/components/hero/TypewriterRole";

export function Hero() {
  const introComplete = useIntroComplete();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [entranceDone, setEntranceDone] = useState(false);

  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introComplete) return;

    // carousel ekhan theke start hobe 
    if (prefersReducedMotion) {
      setEntranceDone(true);
      return;
    }

    const elements = [
      badgeRef.current,
      nameRef.current,
      roleRef.current,
      taglineRef.current,
      ctaRef.current,
      imageWrapRef.current,
      scrollRef.current,
    ];

    if (elements.some((el) => el === null)) {
      setEntranceDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current, nameRef.current, roleRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 16,
      });
      gsap.set(imageWrapRef.current, { opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });
      gsap.set(sweepRef.current, { top: "-20%", opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setEntranceDone(true),
      });

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.25")
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(imageWrapRef.current, { opacity: 1, duration: 0.8 }, "-=0.9")
        .fromTo(sweepRef.current, { top: "-20%" }, { top: "120%", duration: 1, ease: "power1.inOut" }, "<")
        .to(sweepRef.current, { opacity: 0, duration: 0.3 }, ">-0.1")
        .to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.3");
    });

    return () => ctx.revert();
  }, [introComplete, prefersReducedMotion]);

  return (
    <Section id="hero" className="min-h-screen flex flex-col justify-center py-32 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <div ref={badgeRef} className="inline-block mb-6">
            <Badge>{heroContent.eyebrow}</Badge>
          </div>

          <h1
            ref={nameRef}
            className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.15] mb-3"
          >
            {heroContent.name}
          </h1>

          <p ref={roleRef} className="font-display text-2xl md:text-3xl font-medium text-signal mb-6 min-h-[1.3em]">
            <TypewriterRole />
          </p>

          <p ref={taglineRef} className="font-body text-lg md:text-xl text-secondary max-w-md mx-auto md:mx-0 mb-10">
            {heroContent.tagline}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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

      <div ref={scrollRef} className="mt-16 md:mt-20 flex justify-center">
        <ScrollIndicator targetId="about" />
      </div>
    </Section>
  );
}