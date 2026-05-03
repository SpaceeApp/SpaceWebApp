import { setRequestLocale } from "next-intl/server";
import ItContent from "./_content/it.md";
import EnContent from "./_content/en.md";

const CONTENT = { it: ItContent, en: EnContent } as const;

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const Content = CONTENT[locale as keyof typeof CONTENT] ?? CONTENT.it;
  return <Content />;
}
