// FILE: src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Services } from "@/components/services/Services";
import { Education } from "@/components/education/Education";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Education />
        <PlaceholderSection id="portfolio" title="Portfolio" phase="PHASE 09 — UPCOMING" />
        <PlaceholderSection id="testimonials" title="Testimonials" phase="PHASE 10 — UPCOMING" />
        <PlaceholderSection id="contact" title="Contact" phase="PHASE 12 — UPCOMING" />
      </main>
    </>
  );
}