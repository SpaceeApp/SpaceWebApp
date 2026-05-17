"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "loading" | "redirecting" | "confirming" | "confirmed" | "error";

const EMAIL_OTP_TYPES = new Set([
  "signup", "invite", "magiclink", "recovery", "email_change", "email",
]);

function parseParams(str: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of str.split("&")) {
    const eq = part.indexOf("=");
    if (eq > 0) out[part.slice(0, eq)] = decodeURIComponent(part.slice(eq + 1));
  }
  return out;
}

export default function WelcomeClient() {
  const t = useTranslations("authCallback");
  const [status, setStatus] = useState<Status>("loading");
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [tokenHash, setTokenHash] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const hashParams = parseParams(window.location.hash.slice(1));
    const queryParams = parseParams(window.location.search.slice(1));

    // Supabase forwarded an error (e.g. expired link before this page)
    if (queryParams.error) {
      setErrorMsg(queryParams.error_description ?? null);
      setStatus("error");
      return;
    }

    let link: string | null = null;

    if (hashParams.access_token && hashParams.refresh_token) {
      // Implicit flow — tokens already present, pass straight through
      link = `space://auth/callback#access_token=${hashParams.access_token}&refresh_token=${hashParams.refresh_token}`;
    } else if (queryParams.token_hash && EMAIL_OTP_TYPES.has(queryParams.type ?? "")) {
      // OTP / email-confirmation token — pass through; app handles verifyOtp
      link = `space://auth/callback?token_hash=${encodeURIComponent(queryParams.token_hash)}&type=${encodeURIComponent(queryParams.type)}`;
      // Keep these for the cross-device confirm button
      setTokenHash(queryParams.token_hash);
      setTokenType(queryParams.type);
    } else if (queryParams.code) {
      // PKCE code — only exchangeable on the same device (verifier is in the app)
      link = `space://auth/callback?code=${encodeURIComponent(queryParams.code)}`;
    } else {
      setStatus("error");
      return;
    }

    setDeepLink(link);
    setStatus("redirecting");
    // Attempt to open the app immediately; fails silently on desktop
    window.location.href = link;
  }, []);

  async function handleCrossDevice() {
    if (!tokenHash || !tokenType) return;
    setStatus("confirming");

    // Supabase client is dynamically imported so it only loads on demand —
    // the happy path (same device) never downloads the library.
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: tokenType as Parameters<typeof supabase.auth.verifyOtp>[0]["type"],
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }

    setStatus("confirmed");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient gradient — same as the homepage hero */}
      <div className="hero-ambient" aria-hidden />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-10">

        {/* Wordmark header — matches homepage hero/CTA typography */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-accent">
            {t("eyebrow")}
          </p>
          <h1 className="display text-[clamp(2.25rem,8vw,3.5rem)] font-semibold text-text-primary">
            <span
              className="signature-fill"
              style={{ fontFamily: "var(--font-conthrax)" }}
            >
              SPACE
            </span>
          </h1>
        </div>

        {/* Card */}
        <div className="card w-full rounded-3xl p-8 flex flex-col items-center gap-6 text-center">

          {/* Status icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "var(--color-subtle-bg)" }}
          >
            {(status === "loading" || status === "confirming") && (
              <svg className="w-7 h-7 animate-spin" style={{ color: "var(--color-accent)" }}
                viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {(status === "redirecting" || status === "confirmed") && (
              <svg className="w-7 h-7" style={{ color: "var(--color-accent)" }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {status === "error" && (
              <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Title + subtitle */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-text-primary">
              {status === "loading" && t("titleLoading")}
              {status === "redirecting" && t("titleRedirecting")}
              {status === "confirming" && t("titleConfirming")}
              {status === "confirmed" && t("titleConfirmed")}
              {status === "error" && t("titleError")}
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              {status === "loading" && t("subtitleLoading")}
              {status === "redirecting" && t("subtitleRedirecting")}
              {status === "confirming" && t("subtitleConfirming")}
              {status === "confirmed" && t("subtitleConfirmed")}
              {status === "error" && (errorMsg ?? t("subtitleError"))}
            </p>
          </div>

          {/* Open app button (same-device fallback) */}
          {status === "redirecting" && deepLink && (
            <a href={deepLink} className="cta-primary cta-primary-lg w-full justify-center">
              {t("buttonOpen")}
              <ArrowIcon />
            </a>
          )}

          {/* Cross-device confirm button — only shown when we have a token_hash to exchange */}
          {status === "redirecting" && tokenHash && (
            <button
              onClick={() => void handleCrossDevice()}
              className="text-xs underline underline-offset-2 text-text-secondary transition-colors"
            >
              {t("crossDeviceButton")}
            </button>
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
