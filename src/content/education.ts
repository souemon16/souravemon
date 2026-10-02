// FILE: src/content/education.ts

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  description: string;
  startYear: string;
  endYear: string;
  /** Optional public certificate/document URL later */
  certificateUrl?: string | null;
  order: number;
}

/**
 * TEMPORARY content — will move to Supabase `education` table in Phase 16–19.
 * Replace placeholders with your real education. Do not invent institutions or years.
 */
export const educationContent = {
  eyebrow: "EDUCATION",
  heading: "Learning Path",
  intro:
    "The foundation behind the craft — formal study, continuous practice, and the curiosity to keep leveling up.",
};

export const education: EducationItem[] = [
  {
    id: "edu-1",
    institution: "University Laboratory School & College",
    degree: "S.S.C",
    description:
      "Completed Secondary Scholarship Certificate",
    startYear: "Jan, 2005",
    endYear: "April, 2016",
    certificateUrl: "https://ibb.co.com/hF1zPhFR",
    order: 1,
  },
  {
    id: "edu-2",
    institution: "University Laboratory School & College",
    degree: "H.S.C",
    description:
      "Completed Higher Scholarship Education from University Laboratory College.",
    startYear: "Jan, 2017",
    endYear: "Dec, 2018",
    certificateUrl: "https://ibb.co.com/ns9JWDgn",
    order: 2,
  },
  {
    id: "edu-3",
    institution: "Kabi Nazrul Govt. College",
    degree: "B.B.A",
    description:
      "I hold a Bachelor of Business Administration (BBA) degree in Management from Kabi Nazrul Government College.",
    startYear: "Jan, 2019",
    endYear: "Dec, 2022",
    certificateUrl: "https://ibb.co.com/tPvfvwK0",
    order: 3,
  },
  {
    id: "edu-4",
    institution: "Kabi Nazrul Govt. College",
    degree: "M.B.A",
    description:
      "I also hold a Master of Business Administration (MBA) in Management from Kabi Nazrul Government College, where I completed my BBA as well.",
    startYear: "Jan, 2023",
    endYear: "Dec, 2024",
    certificateUrl: null,
    order: 4,
  },
];