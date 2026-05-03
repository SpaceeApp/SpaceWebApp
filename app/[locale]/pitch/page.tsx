import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import VCPitchDeckV2 from "../../components/VCPitchDeckV2";

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
  return <VCPitchDeckV2 />;
}
