// FILE: src/lib/sound/soundManager.ts
"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private lastMoveSound = 0;
  private unlocked = false;

  constructor() {
    if (typeof window !== "undefined") {
      const unlock = () => {
        this.unlockAudio();
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      };
      window.addEventListener("pointerdown", unlock);
      window.addEventListener("keydown", unlock);
      window.addEventListener("touchstart", unlock);
    }
  }

  public unlockAudio() {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().then(() => {
        this.unlocked = true;
      });
    } else {
      this.unlocked = true;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("soundEnabled");
      return stored === null ? true : stored === "1";
    } catch {
      return true;
    }
  }

  public setEnabled(value: boolean) {
    try {
      localStorage.setItem("soundEnabled", value ? "1" : "0");
    } catch {
      // ignore
    }
  }

  /** Core sound synthesis helper */
  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = "sine",
    volume = 0.05
  ) {
    if (!this.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    try {
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
    } catch {
      // ignore audio errors
    }
  }

  // --- SOUND EFFECTS ---

  /** Button click sound */
  click() {
    const freq = 780 + Math.random() * 40;
    this.tone(freq, 0.08, "sine", 0.08);
  }

  /** Input focus sound */
  focus() {
    this.tone(600, 0.06, "triangle", 0.05);
  }

  /** Success sound (puzzles / form submission) */
  success() {
    this.tone(880, 0.1, "sine", 0.06);
    setTimeout(() => this.tone(1320, 0.15, "sine", 0.06), 90);
  }

  /** Error sound */
  error() {
    this.tone(220, 0.15, "sawtooth", 0.05);
  }

  /** Ambient tick when moving mouse near particles */
  fieldConnect() {
    const now = performance.now();
    if (now - this.lastMoveSound < 120) return; // Throttled max ~8 times/sec
    this.lastMoveSound = now;
    const freq = 450 + Math.random() * 120;
    this.tone(freq, 0.05, "sine", 0.04); // Volume boosted to 0.04
  }

  /** Ambient radar pulse / tap sound */
  fieldPulse() {
    this.tone(350, 0.12, "triangle", 0.05);
    setTimeout(() => this.tone(520, 0.1, "sine", 0.04), 70);
  }
}

export const soundManager = new SoundManager();