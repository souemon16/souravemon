// FILE: src/lib/sound/soundManager.ts
"use client";

class SoundManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  isEnabled(): boolean {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("soundEnabled");
      return stored === null ? true : stored === "1";
    } catch {
      return true;
    }
  }

  setEnabled(value: boolean) {
    try {
      localStorage.setItem("soundEnabled", value ? "1" : "0");
    } catch {
      // ignore (private browsing etc.)
    }
  }

  private tone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.05) {
    if (!this.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  click() {
    const variance = 780 + Math.random() * 40;
    this.tone(variance, 0.08, "sine", 0.06);
  }

  focus() {
    this.tone(600, 0.06, "triangle", 0.035);
  }

  success() {
    this.tone(880, 0.1, "sine", 0.05);
    setTimeout(() => this.tone(1320, 0.15, "sine", 0.05), 90);
  }

  error() {
    this.tone(220, 0.15, "sawtooth", 0.04);
  }
}

export const soundManager = new SoundManager();