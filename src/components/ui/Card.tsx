// FILE: src/components/ui/Card.tsx

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-surface border border-border rounded-md p-6 transition-all duration-300 ease-standard",
        "hover:border-signal/40",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";