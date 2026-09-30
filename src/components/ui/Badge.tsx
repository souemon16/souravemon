// FILE: src/components/ui/Badge.tsx

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-xs uppercase tracking-wide",
        "px-3 py-1 rounded-sm bg-signal/10 text-signal border border-signal/20",
        className
      )}
      {...props}
    />
  );
}