// FILE: src/components/ui/Input.tsx
"use client";

import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes, forwardRef, FocusEvent } from "react";
import { soundManager } from "@/lib/sound/soundManager";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, onFocus, ...props }, ref) => {
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      soundManager.focus();
      onFocus?.(e);
    };

    return (
      <input
        ref={ref}
        onFocus={handleFocus}
        className={cn(
          "w-full bg-transparent border-b border-border px-1 py-2 font-body text-primary",
          "placeholder:text-secondary/60 focus:outline-none focus:border-signal",
          "transition-all duration-200 focus:shadow-[0_4px_16px_-8px_var(--accent-signal)]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";