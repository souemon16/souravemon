// FILE: src/components/ui/ScanFrame.tsx

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function ScanFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <span className="pointer-events-none absolute -top-2 -left-2 h-6 w-6 border-t-2 border-l-2 border-signal/70" />
      <span className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 border-t-2 border-r-2 border-signal/70" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-signal/70" />
      <span className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-signal/70" />
    </div>
  );
}