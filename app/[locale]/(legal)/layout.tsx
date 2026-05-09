import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LiquidGlass, LiquidGlassFilter } from "../../components/LiquidGlass";
import { PressableLocaleLink } from "../../components/PressableLink";

export default async function LegalLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <>
      <LiquidGlassFilter />

      <header className="fixed inset-x-0 top-0 z-50 px-4">
        <div className="mx-auto mt-4 max-w-4xl">
          <LiquidGlass
            className="nav-pill rounded-full"
            variant="mild"
            style={{ borderRadius: 9999 }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-2.5">
              <PressableLocaleLink href="/" className="flex items-center gap-2">
                <Image
                  src="/space-logo.png"
                  alt="SPACE logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm font-semibold tracking-[0.3em] text-text-primary" style={{ fontFamily: "var(--font-conthrax)" }}>
                  SPACE
                </span>
              </PressableLocaleLink>
              <PressableLocaleLink
                href="/"
                className="text-xs uppercase tracking-[0.25em] text-text-secondary transition-colors hover:text-text-primary sm:text-sm sm:normal-case sm:tracking-normal"
              >
                <span className="sm:hidden">{t("backHomeShort")}</span>
                <span className="hidden sm:inline">{t("backHome")}</span>
              </PressableLocaleLink>
            </div>
          </LiquidGlass>
        </div>
      </header>

      <main className="relative flex-1 px-6 pt-32 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              "radial-gradient(700px 380px at 50% 0%, rgba(74,72,212,0.18), transparent 65%), radial-gradient(520px 320px at 85% 15%, rgba(166,77,121,0.12), transparent 70%), radial-gradient(520px 320px at 15% 25%, rgba(107,105,224,0.12), transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
        />

        <article className="relative mx-auto max-w-3xl">
          <div className="prose-legal card rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
            {children}
          </div>
        </article>

        <div className="relative mx-auto mt-10 max-w-3xl text-center">
          <PressableLocaleLink
            href="/"
            className="cta-primary !py-3 !px-6 !text-xs tracking-[0.2em] uppercase"
          >
            {t("backHome")}
          </PressableLocaleLink>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 pb-10 pt-4 text-center text-xs text-text-secondary">
        <p>
          © {new Date().getFullYear()} <span style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span> - {t("rights")}
        </p>
      </footer>
    </>
  );
}
