// FILE: src/components/layout/PlaceholderSection.tsx

import { Section } from "../ui/Section";

export function PlaceholderSection({
  id,
  title,
  phase,
}: {
  id: string;
  title: string;
  phase: string;
}) {
  return (
    <Section id={id} className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="font-mono text-xs text-signal mb-3">{phase}</p>
      <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
      <p className="text-secondary mt-2">Placeholder — to be built in an upcoming phase.</p>
    </Section>
  );
}