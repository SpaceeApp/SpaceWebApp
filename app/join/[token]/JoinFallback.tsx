"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../../lib/storeLinks";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Platform = "ios" | "android" | "desktop";

export type JoinTexts = {
  eyebrow: string;
  title: string;
  body: string;
  iosDownload: string;
  androidDownload: string;
};

function detectPlatform(ua: string): Platform {
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  // iPadOS 13+ reports as Mac with touch support
  if (/macintosh/i.test(ua) && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1) {
    return "ios";
  }
  return "desktop";
}

export default function JoinFallback({
  token,
  texts,
}: {
  token: string;
  texts: JoinTexts;
}) {
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent));

    // Best-effort: utenti con app installata ma link in vecchio formato custom-scheme.
    // I link nuovi (universal link) sono già intercettati dall'OS prima del page load.
    if (UUID_V4.test(token)) {
      const timer = window.setTimeout(() => {
        window.location.href = `space://join/${token}`;
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [token]);

  const showIos = platform === "ios" || platform === "desktop";
  const showAndroid = platform === "android" || platform === "desktop";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <div className="hero-ambient" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-accent">
          {texts.eyebrow}
        </p>
        <h1 className="display text-[clamp(2.25rem,7vw,4rem)] font-semibold text-text-primary">
          {texts.title}{" "}
          <span
            className="signature-fill"
            style={{ fontFamily: "var(--font-conthrax)" }}
          >
            SPACE
          </span>
        </h1>
        <p className="mt-6 max-w-md text-base text-text-secondary sm:text-lg">
          {texts.body}
        </p>

        <div className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          {showIos && (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary cta-primary-lg w-full justify-center sm:w-auto"
            >
              {texts.iosDownload}
              <ArrowIcon />
            </a>
          )}
          {showAndroid && (
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary cta-primary-lg w-full justify-center sm:w-auto"
            >
              {texts.androidDownload}
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
