// FILE: src/content/services.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  featured: boolean;
  order: number;
}

/**
 * TEMPORARY content — will move to Supabase `services` table in Phase 16–19.
 * Edit titles/descriptions freely. Do not invent pricing unless you explicitly want it.
 */
export const servicesContent = {
  eyebrow: "SERVICES",
  heading: "What I Can Build For You",
  intro:
    "From interfaces to motion to full creative systems — focused work that feels intentional, not templated.",
  ctaLabel: "Start a Conversation",
  ctaTargetId: "contact",
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Modern, fast, responsive websites and web apps built with clean architecture and strong attention to detail.",
    icon: "globe",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind"],
    featured: true,
    order: 1,
  },
  {
    id: "creative-development",
    title: "Creative Development",
    description:
      "Interactive experiences that blend design, motion, and code — portfolios, landing pages, and digital identities that feel memorable.",
    icon: "sparkles",
    technologies: ["GSAP", "Motion", "Canvas", "UI Systems"],
    featured: true,
    order: 2,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "Clear visual hierarchy, usable flows, and polished interfaces designed to feel premium on both desktop and mobile.",
    icon: "palette",
    technologies: ["Figma", "Design Systems", "Prototyping"],
    featured: false,
    order: 3,
  },
  {
    id: "2d-animation",
    title: "2D Animation",
    description:
      "Motion graphics and 2D animation for stories, explainers, social content, and creative brand moments.",
    icon: "clapperboard",
    technologies: ["2D Motion", "Timing", "Visual Storytelling"],
    featured: false,
    order: 4,
  },
  {
    id: "creative-design",
    title: "Creative Design",
    description:
      "Visual design for digital products, graphics, and creative assets with a strong sense of style and clarity.",
    icon: "pen-tool",
    technologies: ["Layout", "Typography", "Visual Identity"],
    featured: false,
    order: 5,
  },
  {
    id: "ict-tutoring",
    title: "ICT Tutoring",
    description:
      "Practical ICT teaching and mentoring — helping students understand concepts clearly and build real confidence.",
    icon: "graduation-cap",
    technologies: ["Teaching", "Curriculum Support", "Hands-on Learning"],
    featured: false,
    order: 6,
  },
];