import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import JoinFallback, { type JoinTexts } from "./JoinFallback";

// Languages this page renders. Keep in sync with i18n/routing.ts so the
// detected locale always maps to a messages bundle that exists.
const SUPPORTED = ["it", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

// The URL stays `/join/<token>` for everyone (iOS Universal Links pin that
// path in apple-app-site-association). To still translate the page we read
// the recipient's browser preference from Accept-Language and resolve the
// strings server-side. English is the default fallback for unknown locales,
// since the invite is sent to anyone and Italian shouldn't be assumed.
function pickLocale(acceptLanguage: string): Locale {
  const primary = acceptLanguage
    .toLowerCase()
    .split(",")[0]
    ?.split(";")[0]
    ?.trim()
    ?.split("-")[0];
  return primary === "it" ? "it" : "en";
}

async function detectLocale(): Promise<Locale> {
  const accept = (await headers()).get("accept-language") ?? "";
  return pickLocale(accept);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const t = await getTranslations({ locale, namespace: "join" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const locale = await detectLocale();
  const t = await getTranslations({ locale, namespace: "join" });

  const texts: JoinTexts = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    body: t("body"),
    iosDownload: t("iosDownload"),
    androidDownload: t("androidDownload"),
  };

  return <JoinFallback token={token} texts={texts} />;
}
