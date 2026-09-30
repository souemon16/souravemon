// FILE: src/config/nav.config.ts

export interface NavItem {
  label: string;
  id: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Education", id: "education" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonials", id: "testimonials" },
];