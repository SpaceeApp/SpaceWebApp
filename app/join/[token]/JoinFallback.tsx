"use client";

import { useEffect, useState } from "react";

const APPSTORE_URL = "https://apps.apple.com/app/id6768677963";
const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.spaceapp.space";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Platform = "ios" | "android" | "desktop";

function detectPlatform(ua: string): Platform {
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  // iPadOS 13+ reports as Mac with touch support
  if (/macintosh/i.test(ua) && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1) {
    return "ios";
  }
  return "desktop";
}

export default function JoinFallback({ token }: { token: string }) {
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
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0C",
        color: "#FFFFFF",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 420, width: "100%" }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            margin: "0 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          Apri l&apos;invito in SPACE
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            opacity: 0.75,
            margin: "0 0 32px",
          }}
        >
          Se hai l&apos;app installata si aprirà automaticamente.
          <br />
          Altrimenti scaricala qui:
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "stretch",
          }}
        >
          {showIos && (
            <a
              href={APPSTORE_URL}
              style={{
                display: "block",
                background: "#5E5CE6",
                color: "#FFFFFF",
                padding: "14px 20px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Scarica su App Store
            </a>
          )}
          {showAndroid && (
            <a
              href={PLAYSTORE_URL}
              style={{
                display: "block",
                background: showIos ? "transparent" : "#5E5CE6",
                color: "#FFFFFF",
                padding: "14px 20px",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
                border: showIos ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
            >
              Scarica su Google Play
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
