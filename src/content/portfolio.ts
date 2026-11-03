// FILE: src/content/portfolio.ts

export type ProjectCategory = "web" | "design" | "blog";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  /** Use the DIRECT image link from ImageBB (e.g. https://i.ibb.co/xxxx/file.jpg), not the page link. */
  thumbnail: string;
  gallery: string[];
  category: ProjectCategory;
  tags: string[];
  year: string;
  client?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  /** For blog-type projects — link to the published article */
  externalUrl?: string | null;
  /** YouTube URL or direct .mp4 URL */
  videoUrl?: string | null;
  featured: boolean;
  order: number;
}

export const portfolioCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "design", label: "Design" },
  { id: "blog", label: "Blog" },
];

/**
 * TEMPORARY content — will move to Supabase `projects` table + admin panel in Phase 17–19.
 * More categories can be added to portfolioCategories above once admin CMS exists.
 */
export const portfolioContent = {
  eyebrow: "PORTFOLIO",
  heading: "Selected Work",
  intro:
    "A mix of web builds, design pieces, and written work — each one solving a different kind of problem.",
};

/**
 * PLACEHOLDER content — replace with your real projects.
 * thumbnail/gallery must be DIRECT ImageBB links (i.ibb.co/...), not share-page links.
 */
export const projects: Project[] = [
  {
    id: "project-1",
    slug: "project-one",
    title: "Apartment Hunt",
    shortDescription: "A full-stack web application for apartment hunting.",
    longDescription: "Apartment Hunt is an international organization for selling apartment. It is a full stack web project. Client can easily choose apartment as their wish from direct homepage. They can check the offer available with the apartment.",
    thumbnail: "/images/portfolio/Apartment Hunt/apartmenthunt-thumbnail.jpg",
    gallery: ["/images/portfolio/Apartment Hunt/apartmenthunt-1.jpg", "/images/portfolio/Apartment Hunt/apartmenthunt-2.jpg", "/images/portfolio/Apartment Hunt/apartmenthunt-3.jpg", "/images/portfolio/Apartment Hunt/apartmenthunt-4.jpg", "/images/portfolio/Apartment Hunt/apartmenthunt-5.jpg", "/images/portfolio/Apartment Hunt/apartmenthunt-6.jpg"],
    category: "web",
    tags: ["JavaScript", "ES6", "React", "React Router", "HTML", "CSS", "Bootstrap", "Firebase", "MongoDB", "Node JS", "Express JS"],
    year: "2020",
    client: "Assignment",
    liveUrl: "https://hunt-apartment.netlify.app/",
    githubUrl: null,
    externalUrl: null,
    videoUrl: null,
    featured: true,
    order: 1,
  },
  {
    id: "project-2",
    slug: "project-two",
    title: "Athena Design",
    shortDescription: "A modern landing page for a design agency.",
    longDescription: "Athena Design is a online based company for provide various design service. They provide Graphic Design, UX/UI Design, Web Design, etc. Users can get service from them. It is responsive landing page of a design related company. This landing page is divide into multiple section. It is responsive to all kind of devices.",
    thumbnail: "/images/portfolio/Athena Design/athenadesign-thumbnail.jpg",
    gallery: ["/images/portfolio/Athena Design/athenadesign-1.jpg", "/images/portfolio/Athena Design/athenadesign-2.jpg", "/images/portfolio/Athena Design/athenadesign-3.jpg", ],
    category: "web",
    tags: ["JavaScript", "ES6", "React", "React Router", "HTML", "CSS", "Bootstrap"],
    year: "2020",
    client: "Assignment",
    liveUrl: "https://athena-company.netlify.app/",
    githubUrl: null,
    externalUrl: null,
    videoUrl: null,
    featured: true,
    order: 2,
  },
   {
    id: "project-3",
    slug: "project-three",
    title: "Creative Agency",
    shortDescription: "A modern landing page for a creative agency.",
    longDescription: "Creative Agency is a online based service provider. They provide awesome services like Web & Mobile Design, Graphic Design, Web Development. Different dashboards for admins and clients. Client can enroll one or more services and they can check it from the review menu. Admin can add more services and check services that are enrolled by clients and they can take action on it.",
    thumbnail: "/images/portfolio/Creative Agency/creativeagency-thumbnail.jpg",
    gallery: ["/images/portfolio/Creative Agency/creativeagency-1.jpg", "/images/portfolio/Creative Agency/creativeagency-2.jpg", "/images/portfolio/Creative Agency/creativeagency-3.jpg", "/images/portfolio/Creative Agency/creativeagency-4.jpg", "/images/portfolio/Creative Agency/creativeagency-5.jpg", "/images/portfolio/Creative Agency/creativeagency-6.jpg"],
    category: "web",
    tags: ["JavaScript", "ES6", "React", "React Router", "HTML", "CSS", "Bootstrap", "Firebase", "MongoDB", "Node JS", "Express JS"],
    year: "2020",
    client: "Assignment",
    liveUrl: "https://creative-agency-d5b7d.web.app",
    githubUrl: null,
    externalUrl: null,
    videoUrl: null,
    featured: true,
    order: 3,
  },
  {
    id: "project-4",
    slug: "project-four",
    title: "Backdated Portfolio",
    shortDescription: "A portfolio website built with HTML and CSS with custom animation.",
    longDescription: "Backdated Portfolio is a modern portfolio website built with HTML and CSS. It features custom animations and a clean design. The website showcases various projects and services offered by the designer.",
    thumbnail: "/images/portfolio/Backdated Portfolio/backdatedportfolio-thumbnail.jpg",
    gallery: ["/images/portfolio/Backdated Portfolio/backdatedportfolio-1.jpg"],
    category: "web",
    tags: ["JavaScript", "ES6", "React", "React Router", "HTML", "CSS", "Bootstrap", "Firebase", "MongoDB", "Node JS", "Express JS"],
    year: "2022",
    client: "Personal Project",
    liveUrl: "https://find-sourav.netlify.app/",
    githubUrl: null,
    externalUrl: null,
    videoUrl: null,
    featured: true,
    order: 4,
  },
  {
    id: "project-5",
    slug: "project-five",
    title: "A Unique Wedding Card",
    shortDescription: "A unique wedding card design with a modern touch.",
    longDescription: "A unique wedding card design with a modern touch.",
    thumbnail: "/images/portfolio/Amit's Wedding Card/amitwedding-1.jpg",
    gallery: ["/images/portfolio/Amit's Wedding Card/amitwedding-1.jpg", "/images/portfolio/Amit's Wedding Card/amitwedding-2.jpg", "/images/portfolio/Amit's Wedding Card/amitwedding-3.jpg", "/images/portfolio/Amit's Wedding Card/amitwedding-4.jpg",],
    category: "design",
    tags: ["Adobe Illustrator", "Adobe Photoshop", "Graphic Design"],
    year: "2023",
    client: "Personal Project",
    liveUrl: null,
    githubUrl: null,
    externalUrl: null,
    videoUrl: null,
    featured: true,
    order: 5,
  },
];