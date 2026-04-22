import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // Default locale keeps clean URLs ("/", "/privacy"); others get prefixed
  // ("/en", "/en/privacy"). Gives Italian-first SEO, English still indexable.
  localePrefix: "as-needed",
  // Don't auto-redirect "/" to "/en" based on the browser's Accept-Language.
  // The user's chosen URL wins; the switcher is the way to change locale.
  localeDetection: false,
});
