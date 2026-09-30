// FILE: src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { PlaceholderSection } from "@/components/layout/PlaceholderSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <PlaceholderSection id="skills" title="Skills" phase="PHASE 06 — UPCOMING" />
        <PlaceholderSection id="services" title="Services" phase="PHASE 07 — UPCOMING" />
        <PlaceholderSection id="education" title="Education" phase="PHASE 08 — UPCOMING" />
        <PlaceholderSection id="portfolio" title="Portfolio" phase="PHASE 09 — UPCOMING" />
        <PlaceholderSection id="testimonials" title="Testimonials" phase="PHASE 10 — UPCOMING" />
        <PlaceholderSection id="contact" title="Contact" phase="PHASE 12 — UPCOMING" />
      </main>
    </>
  );
}