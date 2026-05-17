import type { Metadata } from "next";
import JoinFallback from "./JoinFallback";

export const metadata: Metadata = {
  title: "Apri l'invito in SPACE",
  description:
    "Apri l'invito alla cartella nell'app SPACE. Se non hai ancora l'app, scaricala dagli store.",
  robots: { index: false, follow: false },
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <JoinFallback token={token} />;
}
