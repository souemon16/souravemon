// FILE: src/lib/theme/getTimeBasedTheme.ts

export function getTimeBasedTheme(): "day" | "night" {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
}