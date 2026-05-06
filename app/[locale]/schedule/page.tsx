import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ScheduleDeck from "../../components/ScheduleDeck";

export const metadata: Metadata = {
  title: "SPACE | Pitch Deck",
  robots: { index: false, follow: false },
};

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ScheduleDeck />;
}
