// FILE: src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Services } from "@/components/services/Services";
import { Education } from "@/components/education/Education";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { Contact } from "@/components/contact/Contact";

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
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}