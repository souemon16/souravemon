// FILE: src/content/contact.ts

/**
 * TEMPORARY content — will move to Supabase / admin panel later.
 * Replace the WhatsApp number with your real one (country code, no + or spaces).
 * Example Bangladesh: 8801XXXXXXXXX
 */
export const contactContent = {
  eyebrow: "CONTACT",
  heading: "Let's Talk",
  intro:
    "Have a project, a question, or just want to say hello? Reach me directly on WhatsApp — I usually reply within a day.",
  /** Digits only, with country code. No +, no spaces, no dashes. */
  whatsappNumber: "8801303081801",
  whatsappLabel: "Message on WhatsApp",
  /** Optional pre-filled message when the chat opens */
  whatsappPrefill: "Hi Sourav — I found your portfolio and wanted to connect.",
};

export function getWhatsAppUrl(number: string, prefill?: string) {
  const base = `https://wa.me/${number}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}