// FILE: src/components/ai/AITriggerButton.tsx
"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { soundManager } from "@/lib/sound/soundManager";

export function AITriggerButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          soundManager.click();
          setOpen(true);
        }}
        className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border border-border hover:border-pulse hover:text-pulse transition-colors"
        aria-label="Open Sourav's AI"
      >
        <Sparkles size={14} />
        <span className="hidden sm:inline">SOURAV&apos;S AI</span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center py-8">
          <p className="font-mono text-xs text-signal mb-3">CALIBRATING...</p>
          <h3 className="font-display text-2xl mb-2">Sourav&apos;s AI is coming online soon</h3>
          <p className="text-secondary text-sm">
            This assistant will be able to answer questions about my work, skills, and services. Check back soon.
          </p>
        </div>
      </Modal>
    </>
  );
}