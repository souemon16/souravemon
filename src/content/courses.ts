// FILE: src/content/courses.ts

export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  completionDate: string;
  /** Optional public certificate/document URL */
  certificateUrl?: string | null;
  /** Optional skill tags shown as small badges */
  skillTags?: string[];
  order: number;
}

export const coursesContent = {
  eyebrow: "COURSES",
  heading: "Courses & Certifications",
  intro:
    "Continuous, self-directed learning outside formal education — short courses and certifications that sharpened specific skills.",
};

/**
 * PLACEHOLDER content — replace with your real courses.
 * Do not invent providers, dates, or certificates.
 */
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Black Belt Web Developer",
    provider: "Programming Hero",
    description: "Successfully completed Programming Hero’s Complete Web Development Course and achieved **Black Belt Web Developer** recognition, gaining hands-on experience in modern full-stack web development.",
    completionDate: "2020",
    certificateUrl: "https://ibb.co.com/vCtNKNh9",
    skillTags: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
    order: 1,
  },
  {
    id: "course-2",
    title: "Flutter Development",
    provider: "ICT Division",
    description: "Successfully completed ICT Division’s Flutter Development Course and achieved **Flutter Developer** recognition, gaining hands-on experience in modern mobile development.",
    completionDate: "2022",
    certificateUrl: "https://ibb.co.com/7N6BH40z",
    skillTags: ["Flutter", "Dart", "Android", "iOS", "Firebase"],
    order: 2,
  },
  {
    id: "course-3",
    title: "Computer Hardware and Troubleshooting",
    provider: "Department of Youth Development",
    description: "Successfully completed the Computer Hardware and Troubleshooting course and achieved **Certified Technician** recognition, gaining hands-on experience in hardware maintenance and problem-solving.",
    completionDate: "2022",
    certificateUrl: "https://ibb.co.com/TMj3Y3fC",
    skillTags: ["Computer Hardware", "Troubleshooting", "Maintenance", "Problem-Solving"],
    order: 3,
  },
  {
    id: "course-4",
    title: "Modern Office Management",
    provider: "Department of Youth Development",
    description: "Successfully completed the Modern Office Management course and achieved **Certified Office Manager** recognition, gaining hands-on experience in modern office operations and productivity.",
    completionDate: "2025",
    certificateUrl: "https://ibb.co.com/zW0hb1PH",
    skillTags: ["Office Management", "Productivity", "Communication", "Organization"],
    order: 4,
  },
  {
    id: "course-5",
    title: "Responsive Web Design",
    provider: "FreeCodeCamp",
    description: "Successfully completed the Responsive Web Design course and achieved **Responsive Web Design** recognition, gaining hands-on experience in modern web development.",
    completionDate: "2020",
    certificateUrl: "https://ibb.co.com/G3JJnwRc",
    skillTags: ["HTML", "CSS", "Responsive Design"],
    order: 5,
  },
];