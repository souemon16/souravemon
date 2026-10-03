// FILE: src/components/education/Courses.tsx
"use client";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { CourseItemCard } from "@/components/education/CourseItem";
import { courses } from "@/content/courses";

export function CoursesList() {
  const ordered = [...courses].sort((a, b) => a.order - b.order);

  if (ordered.length === 0) {
    return <p className="font-mono text-sm text-secondary">No courses added yet.</p>;
  }

  return (
    <div className="max-w-3xl">
      {ordered.map((item, i) => (
        <ScrollReveal key={item.id} delay={Math.min(i * 0.06, 0.24)}>
          <CourseItemCard item={item} isLast={i === ordered.length - 1} />
        </ScrollReveal>
      ))}
    </div>
  );
}