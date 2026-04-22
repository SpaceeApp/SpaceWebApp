import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PitchDeck } from "./PitchDeck";

// Hidden route: not linked from anywhere on the site, and noindex'd so it
// doesn't get crawled. Reachable only by knowing the URL.
export const metadata: Metadata = {
  title: "SPACE | Pitch Deck",
  robots: { index: false, follow: false },
};

export default async function PitchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PitchDeck />;
}
