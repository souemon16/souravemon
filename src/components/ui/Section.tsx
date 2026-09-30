// FILE: src/components/layout/Section.tsx

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export function Section({ className, id, children, ...props }: HTMLAttributes<HTMLElement> & { id?: string }) {
  return (
    <section id={id} className={cn("relative w-full py-24 md:py-32 px-6 md:px-12", className)} {...props}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}