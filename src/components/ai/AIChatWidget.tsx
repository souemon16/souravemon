// FILE: src/components/ai/AIChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "motion/react";
import { Sparkles, X, Send, Bot, User } from "lucide-react";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "bot" | "user" }[]>([
    { id: 1, text: "Hi! I'm Sourav's AI assistant. I'm currently booting up, but soon I'll be able to answer questions about his portfolio and services.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const dragControls = useDragControls();
  const prefersReducedMotion = usePrefersReducedMotion();
  const constraintsRef = useRef(null);

  // Prevent scrolling body on mobile when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    
    soundManager.click();
    setMessages((prev) => [...prev, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");

    // Simulate bot typing... (Will be replaced with Gemini API later)
    setTimeout(() => {
      soundManager.focus();
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "I'm still offline! Sourav is connecting me to the database soon.", sender: "bot" },
      ]);
    }, 1000);
  }

  function toggleChat() {
    soundManager.click();
    setIsOpen(!isOpen);
  }

  return (
    <>
      {/* Invisible area to constrain the drag so the chathead stays on screen */}
      <div ref={constraintsRef} className="fixed inset-4 z-[99] pointer-events-none" />

      {/* Floating Chathead Button */}
      <motion.div
        drag={!isOpen} // Only draggable when closed
        dragConstraints={constraintsRef}
        dragControls={dragControls}
        dragElastic={0.1}
        dragMomentum={false}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }} // Hide button when chat is open
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-[100] cursor-grab active:cursor-grabbing md:cursor-pointer touch-none"
        onClick={toggleChat}
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-signal text-[var(--bg-base)] shadow-[0_0_20px_0_var(--accent-signal)] hover:shadow-[0_0_30px_5px_var(--accent-signal)] transition-shadow">
          <Sparkles size={24} />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-base bg-pulse animate-pulse" />
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
              "fixed z-[101] flex flex-col overflow-hidden bg-surface border-border shadow-2xl",
              // Mobile: Full screen or Bottom sheet
              "bottom-0 left-0 right-0 h-[85dvh] rounded-t-2xl border-t",
              // Desktop: Floating card in corner
              "md:bottom-6 md:right-6 md:left-auto md:w-[380px] md:h-[600px] md:rounded-2xl md:border"
            )}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/20 text-signal">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-primary leading-none mb-1">Sourav&apos;s AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-pulse" />
                    <span className="font-mono text-[10px] text-secondary">SYSTEM ONLINE</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleChat} className="p-2 text-secondary hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-3", msg.sender === "user" ? "flex-row-reverse" : "")}>
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", msg.sender === "user" ? "bg-border text-secondary" : "bg-signal text-[var(--bg-base)]")}>
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm", msg.sender === "user" ? "bg-border text-primary rounded-tr-sm" : "bg-surface-2 border border-border text-primary rounded-tl-sm")}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="border-t border-border bg-surface p-4">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my work or skills..."
                  className="w-full rounded-full border border-border bg-surface-2 py-3 pl-4 pr-12 text-sm text-primary placeholder:text-secondary focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-signal text-[var(--bg-base)] transition-transform active:scale-90 disabled:opacity-50 disabled:bg-border"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}