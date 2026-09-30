// FILE: src/components/ui/Button.tsx
"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef, MouseEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { soundManager } from "@/lib/sound/soundManager";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden font-body font-medium select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-[var(--bg-base)] rounded-pill shadow-[0_0_0_0_var(--accent-signal)] hover:shadow-[0_0_22px_-2px_var(--accent-signal)]",
        secondary:
          "border border-border text-primary rounded-md hover:border-signal hover:text-signal bg-transparent",
        ghost: "text-secondary hover:text-primary rounded-md bg-transparent",
      },
      size: {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">,
    VariantProps<typeof buttonVariants> {
  silent?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, onClick, silent, children, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleCounter = useRef(0);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!silent) soundManager.click();

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rippleCounter.current += 1;
      const id = rippleCounter.current;

      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);

      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleClick}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="pointer-events-none absolute rounded-full bg-white/40 mix-blend-overlay"
              style={{ left: ripple.x, top: ripple.y, x: "-50%", y: "-50%" }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 220, height: 220, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    );
  }
);
Button.displayName = "Button";