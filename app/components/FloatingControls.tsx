"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";
import { LiquidGlass } from "./LiquidGlass";

type Theme = "light" | "dark";
const LOCALES = ["it", "en"] as const;

export function FloatingControls() {
  const locale = useLocale();
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute(
      "data-theme",
    ) as Theme | null;
    setTheme(current ?? "light");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <div
      className="fixed right-3 bottom-3 z-50 sm:right-4 sm:bottom-4"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingRight: "env(safe-area-inset-right)",
      }}
      aria-hidden={!mounted}
    >
      <LiquidGlass
        variant="mild"
        className="rounded-full"
        style={{
          borderRadius: 9999,
          opacity: mounted ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        <div className="flex items-center gap-1 p-1 [touch-action:manipulation]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-text-primary/5 active:bg-text-primary/10"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <span
            aria-hidden
            className="h-5 w-px bg-text-primary/15"
          />

          <div
            className="flex items-center text-[11px] font-semibold tracking-wider"
            role="group"
            aria-label="Language"
          >
            {LOCALES.map((l) => {
              const active = locale === l;
              return (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  aria-label={l === "it" ? "Italiano" : "English"}
                  aria-current={active ? "true" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-2 transition-colors ${
                    active
                      ? "bg-accent text-white shadow-[0_4px_12px_-4px_rgba(74,72,212,0.55)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}
