// FILE: src/content/skills.ts

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "animation"
  | "design"
  | "teaching"
  | "tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 1–5 honest proficiency. Do not inflate. */
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  /** lucide-react icon name key — mapped in the component */
  icon: string;
  order: number;
}

export const skillCategories: { id: SkillCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "animation", label: "Animation" },
  { id: "design", label: "Design" },
   { id: "teaching", label: "Teaching" },
  { id: "tools", label: "Tools" },
];

/**
 * sob content edike edit korle ekhan theke korte hobe 
 */
export const skills: Skill[] = [
  {
    id: "html-css",
    name: "HTML & CSS",
    category: "frontend",
    level: 4,
    description: "Modern layout, responsive systems.",
    icon: "code-2",
    order: 1,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: 4,
    description: "ESNext, DOM, async patterns, modular architecture.",
    icon: "braces",
    order: 2,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 1,
    description: "Typed systems for safer, scalable applications.",
    icon: "file-type",
    order: 3,
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: 4,
    description: "Component architecture, hooks, performance patterns.",
    icon: "component",
    order: 4,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: 1,
    description: "App Router, SSR/SSG patterns, full-stack workflows.",
    icon: "globe",
    order: 5,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: 1,
    description: "Utility-first design systems and rapid UI building.",
    icon: "wind",
    order: 6,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: 3,
    description: "Server logic, APIs, tooling, and automation.",
    icon: "server",
    order: 7,
  },
  {
    id: "api",
    name: "REST APIs",
    category: "backend",
    level: 3,
    description: "Designing and consuming clean HTTP interfaces.",
    icon: "network",
    order: 8,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    level: 1,
    description: "Relational modeling, queries, and data integrity.",
    icon: "database",
    order: 9,
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "database",
    level: 1,
    description: "Auth, storage, and Postgres-backed app backends.",
    icon: "cloud",
    order: 10,
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "animation",
    level: 1,
    description: "Timeline-driven motion and scroll choreography.",
    icon: "sparkles",
    order: 11,
  },
  {
    id: "motion",
    name: "Motion",
    category: "animation",
    level: 1,
    description: "UI micro-interactions and gesture-friendly motion.",
    icon: "activity",
    order: 12,
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    category: "design",
    level: 3,
    description: "Hierarchy, spacing, interaction clarity, polish.",
    icon: "palette",
    order: 13,
  },
  {
    id: "canva",
    name: "Canva",
    category: "design",
    level: 4,
    description: "Interface design, prototyping, design handoff.",
    icon: "canva",
    order: 14,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "tools",
    level: 4,
    description: "Version control, collaboration, clean history.",
    icon: "git-branch",
    order: 15,
  },
   {
    id: "2d-animation",
    name: "2D Animation",
    category: "animation",
    level: 3,
    description: "Character and motion animation, timing, and visual storytelling.",
    icon: "clapperboard",
    order: 17,
  },
  {
    id: "creative-design",
    name: "Creative Design",
    category: "design",
    level: 3,
    description: "Visual design, layouts, and graphics for digital and print.",
    icon: "pen-tool",
    order: 18,
  },
  {
    id: "ict-teaching",
    name: "ICT Tutoring",
    category: "teaching",
    level: 3,
    description: "Teaching ICT concepts clearly and practically to students.",
    icon: "graduation-cap",
    order: 19,
  },
  {
    id: "vscode",
    name: "VS Code / Cursor",
    category: "tools",
    level: 4,
    description: "Daily development environment and workflows.",
    icon: "terminal",
    order: 16,
  },
];