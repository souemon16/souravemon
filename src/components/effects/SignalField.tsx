// FILE: src/components/effects/SignalField.tsx
"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  radius: number;
  layer: 0 | 1 | 2;
  isBeacon: boolean;
  twinklePhase: number;
}

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let pulses: PulseRing[] = [];
    let comets: Comet[] = [];
    let animationId: number;
    let lastPulseTime = 0;
    let lastCometTime = 0;
    let lastScrollY = window.scrollY;
    const mouse = { x: -9999, y: -9999 };

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const isLowPower = isCoarsePointer || cores <= 4;

    // Day mode particles/lines need more visual weight to read clearly
    // against a light background — tuned separately from night mode.
    const dayBoost = theme === "day" ? 1.8 : 1;

    function getColors() {
      const styles = getComputedStyle(document.documentElement);
      return {
        dot: styles.getPropertyValue("--field-dot").trim() || "#9A9CA5",
        signal: styles.getPropertyValue("--accent-signal").trim() || "#F0B429",
        pulse: styles.getPropertyValue("--accent-pulse").trim() || "#34D0C0",
      };
    }

    function getParticleCount() {
      const area = window.innerWidth * window.innerHeight;
      const base = Math.floor(area / 10000);
      const cap = isLowPower ? 90 : 160;
      const min = isLowPower ? 26 : 50;
      return Math.max(min, Math.min(base, cap));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      const count = getParticleCount();
      particles = Array.from({ length: count }, () => {
        const layer = (Math.floor(Math.random() * 3) as 0 | 1 | 2);
        const speedFactor = 0.06 + layer * 0.05;
        const vx = (Math.random() - 0.5) * speedFactor;
        const vy = (Math.random() - 0.5) * speedFactor;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          baseVx: vx,
          baseVy: vy,
          vx,
          vy,
          radius: 0.6 + layer * 0.5 + Math.random() * 0.5,
          layer,
          isBeacon: Math.random() < 0.22,
          twinklePhase: Math.random() * Math.PI * 2,
        };
      });
    }

    function drawStatic() {
      const colors = getColors();
      ctx!.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.isBeacon ? colors.signal : colors.dot;
        ctx!.globalAlpha = Math.min((p.isBeacon ? 0.45 : 0.35) * dayBoost, 1);
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
    }

    function drawGlowCircle(x: number, y: number, radius: number, color: string, alpha: number) {
      if (isLowPower) {
        ctx!.beginPath();
        ctx!.arc(x, y, radius * 2.4, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = Math.min(alpha * 0.15, 1);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = Math.min(alpha, 1);
        ctx!.fill();
      } else {
        ctx!.save();
        ctx!.shadowColor = color;
        ctx!.shadowBlur = 14;
        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = Math.min(alpha, 1);
        ctx!.fill();
        ctx!.restore();
      }
    }

    function spawnPulse(x: number, y: number) {
      pulses.push({ x, y, radius: 2, maxRadius: 70 + Math.random() * 40, alpha: 0.55 });
    }

    function spawnComet() {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -20 : width + 20;
      const startY = Math.random() * height * 0.5;
      const speed = 4 + Math.random() * 2;
      comets.push({
        x: startX,
        y: startY,
        vx: fromLeft ? speed : -speed,
        vy: speed * 0.4,
        life: 1,
      });
    }

    function step(time: number) {
      const colors = getColors();
      ctx!.clearRect(0, 0, width, height);

      // --- Scroll-reactive impulse (primary mobile interaction) ---
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      if (Math.abs(scrollDelta) > 0.3) {
        const force = Math.min(Math.abs(scrollDelta) * 0.025, 1.4) * Math.sign(scrollDelta);
        particles.forEach((p) => {
          p.vy += force * (0.4 + p.layer * 0.35);
        });
      }

      // --- Particles ---
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const force = (1 - dist / 130) * 0.6;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const twinkle = 0.5 + Math.sin(time * 0.001 + p.twinklePhase) * 0.35;
        const depthAlpha = 0.32 + p.layer * 0.2;

        if (p.isBeacon) {
          drawGlowCircle(p.x, p.y, p.radius, colors.signal, twinkle * depthAlpha * 1.2 * Math.min(dayBoost, 1.3));
        } else {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fillStyle = colors.dot;
          ctx!.globalAlpha = Math.min(twinkle * depthAlpha * dayBoost, 1);
          ctx!.fill();
        }
      });
      ctx!.globalAlpha = 1;

      // --- Node-to-node connections ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = colors.signal;
            ctx!.globalAlpha = Math.min((1 - dist / 110) * 0.16 * dayBoost, 0.5);
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;

      // --- Cursor / touch as transmitting node ---
      if (mouse.x > 0 && mouse.y > 0) {
        particles.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.strokeStyle = colors.pulse;
            ctx!.globalAlpha = Math.min((1 - dist / 160) * 0.26 * dayBoost, 0.6);
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        });
        ctx!.globalAlpha = 1;
      }

      // --- Pulse rings ---
      if (time - lastPulseTime > 3500 && Math.random() < 0.012) {
        const beacons = particles.filter((p) => p.isBeacon);
        if (beacons.length) {
          lastPulseTime = time;
          const b = beacons[Math.floor(Math.random() * beacons.length)];
          spawnPulse(b.x, b.y);
        }
      }
      pulses.forEach((ring) => {
        ring.radius += 1.1;
        ring.alpha -= 0.008;
        if (ring.alpha > 0) {
          ctx!.beginPath();
          ctx!.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx!.strokeStyle = colors.signal;
          ctx!.globalAlpha = Math.max(ring.alpha, 0);
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      });
      pulses = pulses.filter((r) => r.alpha > 0 && r.radius < r.maxRadius);
      ctx!.globalAlpha = 1;

      // --- Comet ---
      if (time - lastCometTime > 13000 && Math.random() < 0.0018) {
        lastCometTime = time;
        spawnComet();
      }
      comets.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.012;

        const gradient = ctx!.createLinearGradient(c.x, c.y, c.x - c.vx * 8, c.y - c.vy * 8);
        gradient.addColorStop(0, colors.signal);
        gradient.addColorStop(1, "transparent");

        if (!isLowPower) {
          ctx!.save();
          ctx!.shadowColor = colors.signal;
          ctx!.shadowBlur = 10;
        }
        ctx!.beginPath();
        ctx!.moveTo(c.x, c.y);
        ctx!.lineTo(c.x - c.vx * 8, c.y - c.vy * 8);
        ctx!.strokeStyle = gradient;
        ctx!.globalAlpha = Math.max(c.life, 0);
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
        if (!isLowPower) ctx!.restore();
      });
      comets = comets.filter((c) => c.life > 0 && c.x > -50 && c.x < width + 50);
      ctx!.globalAlpha = 1;

      animationId = requestAnimationFrame(step);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // Immediate tap feedback — ping fires the instant a finger touches down,
    // not only when dragging. This is the primary mobile interaction now.
    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length > 0) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        mouse.x = x;
        mouse.y = y;
        spawnPulse(x, y);
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }

    function handleTouchEnd() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(step);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animationId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [theme, prefersReducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--bg-base) 95%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}