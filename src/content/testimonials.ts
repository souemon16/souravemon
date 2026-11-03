// FILE: src/content/testimonials.ts

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  /** Direct image URL. Leave null to show initials avatar automatically. */
  avatar?: string | null;
  message: string;
  date: string;
  featured: boolean;
  order: number;
}

export const testimonialsContent = {
  eyebrow: "TESTIMONIALS",
  heading: "What People Say",
  intro: "Real feedback from clients, collaborators, and students I've worked with.",
};

/**
 * PLACEHOLDER — to be filled in later. Do not fabricate real quotes.
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Tanvir Ahmed",
    role: "Director & Teacher",
    company: "BBA Vision",
    avatar: null,
    message: "A curious mind, a creative thinker, and someone who never stops learning. Sourav always finds a way to bring fresh perspectives to the things he does",
    date: "August, 2025",
    featured: true,
    order: 1,
  },
   {
    id: "testimonial-2",
    name: "Alokesh Roy",
    role: "Lecturer (Botany)",
    company: "Dinajpur Government College",
    avatar: null,
    message: "Friendly, reliable, and full of ideas. His dedication and friendly communication style make a real difference.",
    date: "June, 2022",
    featured: true,
    order: 2,
  },
   {
    id: "testimonial-3",
    name: "Tanmoy Das",
    role: "Student",
    company: "Dinajpur Government College",
    avatar: null,
    message: "Valo kisu koile update koira dimu",
    date: "[Month, Year]",
    featured: true,
    order: 3,
  },
];