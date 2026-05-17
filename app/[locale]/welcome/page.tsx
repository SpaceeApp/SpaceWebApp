import { setRequestLocale } from "next-intl/server";
import WelcomeClient from "./WelcomeClient";

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WelcomeClient />;
}
