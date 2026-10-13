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
    thumbnail: "https://i.ibb.co.com/DHGMjgqt/apartment-hunt-cover.jpg",
    gallery: ["https://i.ibb.co.com/7yJsj8J/Apartment-Hunt.png", "https://i.ibb.co.com/dsyGnWDW/image.png"],
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
    thumbnail: "https://i.ibb.co.com/j9b5jzSy/Athena-Design-thumbnail.png",
    gallery: ["https://i.ibb.co.com/PZLwNTHH/Athena-Design-Full.jpg"],
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
    thumbnail: "https://i.ibb.co.com/DHGMjgqt/apartment-hunt-cover.jpg",
    gallery: ["https://i.ibb.co.com/7yJsj8J/Apartment-Hunt.png", "https://i.ibb.co.com/dsyGnWDW/image.png"],
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
];