// FILE: src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/config/nav.config";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/utils/scroll";
import { soundManager } from "@/lib/sound/soundManager";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/lib/i18n/LanguageSwitcher";
import { AITriggerButton } from "@/components/ai/AITriggerButton";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const scrolled = useScrolled(40);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavClick(id: string) {
    soundManager.click();
    scrollToSection(id);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-standard",
          scrolled
            ? "bg-base/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo / wordmark — replaceable via admin panel later */}
          <a
            href="#hero"
            data-magnetic
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
            </span>
            SOURAV
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={cn(
                  "font-mono text-xs uppercase tracking-wide transition-colors",
                  activeId === item.id
                    ? "text-signal"
                    : "text-secondary hover:text-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <AITriggerButton />
            <Button
              variant="primary"
              size="sm"
              data-magnetic
              onClick={() => handleNavClick("contact")}
            >
              Contact
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => {
              soundManager.click();
              setMobileOpen(true);
            }}
            className="md:hidden p-2 text-primary"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} activeId={activeId} />
    </>
  );
}