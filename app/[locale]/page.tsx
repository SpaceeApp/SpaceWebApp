import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { LiquidGlass, LiquidGlassFilter } from "../components/LiquidGlass";
import { PressableLocaleLink } from "../components/PressableLink";
import { Link } from "../../i18n/navigation";
import { NavMobileMenu } from "../components/NavMobileMenu";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LiquidGlassFilter />
      <Nav />
      <Hero />
      <ScrollStage />
      <FeatureGrid />
      <PrivacyBand />
      <BigCTA />
      <Footer />
    </>
  );
}

/* ─── Nav (liquid glass — refracts whatever is under it) ──────────── */

function Nav() {
  const t = useTranslations("nav");
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <div className="mx-auto mt-4 max-w-6xl">
        <LiquidGlass
          className="nav-pill rounded-full"
          variant="mild"
          style={{ borderRadius: 9999 }}
        >
          <div className="flex items-center justify-between px-5 py-2.5">
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
            <nav className="hidden gap-8 text-sm text-text-secondary sm:flex">
              <PressableLocaleLink
                href="/#features"
                className="transition-colors hover:text-text-primary"
              >
                {t("features")}
              </PressableLocaleLink>
              <PressableLocaleLink
                href="/#privacy"
                className="transition-colors hover:text-text-primary"
              >
                {t("privacy")}
              </PressableLocaleLink>
              <PressableLocaleLink
                href="/#get"
                className="transition-colors hover:text-text-primary"
              >
                {t("download")}
              </PressableLocaleLink>
            </nav>
            <div className="flex items-center gap-2">
              <PressableLocaleLink
                href="/#get"
                className="cta-primary !py-2 !px-4 !text-xs hidden sm:inline-flex"
              >
                {t("cta")}<span style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span>
              </PressableLocaleLink>
              <NavMobileMenu
                links={[
                  { href: "/#features", label: t("features") },
                  { href: "/#privacy",  label: t("privacy")  },
                  { href: "/#get",      label: t("download") },
                ]}
                ctaHref="/#get"
                ctaLabel={<>{t("cta")}<span style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span></>}
              />
            </div>
          </div>
        </LiquidGlass>
      </div>
    </header>
  );
}

/* ─── Hero with real photo collage behind ─────────────────────────── */

function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-32 text-center"
    >
      <div className="hero-ambient" />

      <p className="relative z-10 mb-6 text-xs font-medium uppercase tracking-[0.4em] text-accent">
        {t("eyebrow")}
      </p>

      <h1 className="display signature-fill relative z-10 text-[clamp(4rem,14vw,13rem)] font-semibold" style={{ fontFamily: "var(--font-conthrax)" }}>
        SPACE
      </h1>

      <p className="relative z-10 mt-8 max-w-xl text-lg text-text-primary/80 sm:text-xl">
        {t("tagline")}
        <br className="hidden sm:inline" />
        {t("taglineSub")}
      </p>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-3">
        <PressableLocaleLink href="/#get" className="cta-primary cta-primary-lg">
          {t("ctaPrimary")}<span style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span>
          <ArrowIcon />
        </PressableLocaleLink>
        <LiquidGlass
          className="nav-pill rounded-full"
          variant="mild"
          style={{ borderRadius: 9999 }}
        >
          <PressableLocaleLink
            href="/#features"
            className="block px-7 py-[0.9rem] text-[0.9rem] font-semibold text-text-primary"
          >
            {t("ctaSecondary")}
          </PressableLocaleLink>
        </LiquidGlass>
      </div>
    </section>
  );
}

/* ─── Scroll stage ────────────────────────────────────────────────── */

function ScrollStage() {
  const t = useTranslations("scroll");
  // Tuple: [accent part (solid dark), signature-fill part (indigo→rose)]
  const lines = t.raw("lines") as [string, string][];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10 sm:py-24 lg:py-40">
      {lines.map(([accent, signature], i) => {
        const accentWords = accent.split(" ");
        return (
          <p
            key={i}
            className="display my-14 text-[clamp(2rem,6vw,4.5rem)] font-semibold sm:my-28"
          >
            {accentWords.map((w, k) => (
              <span
                key={`a-${k}`}
                className="scroll-word text-text-primary"
                style={{ ["--i" as string]: k } as React.CSSProperties}
              >
                {w}&nbsp;
              </span>
            ))}
            <span className="scroll-phrase">
              <span className="signature-fill">{signature}</span>
            </span>
          </p>
        );
      })}
    </section>
  );
}

/* ─── Feature grid ────────────────────────────────────────────────── */

function FeatureGrid() {
  const t = useTranslations("features");
  const features = t.raw("items") as { title: string; body: string }[];

  return (
    <section
      id="features"
      className="relative mx-auto max-w-6xl px-6 py-16 sm:py-32 scroll-mt-24"
    >
      <div className="reveal mb-10 max-w-2xl sm:mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-text-primary">
          {t("titlePrefix")}
          <br />
          <span className="signature-fill">{t("titleSuffix")}</span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="reveal card rounded-3xl p-7 transition-transform hover:-translate-y-1"
          >
            <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-accent-deep shadow-[0_6px_18px_-6px_rgba(74,72,212,0.55)]">
              <FeatureIcon index={i} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Privacy band ────────────────────────────────────────────────── */

function PrivacyBand() {
  const t = useTranslations("privacyBand");
  return (
    <section
      id="privacy"
      className="reveal relative mx-auto my-12 max-w-6xl px-6 sm:my-24 scroll-mt-28"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent-deep via-accent to-accent-soft p-6 text-white shadow-[0_40px_80px_-30px_rgba(74,72,212,0.45)] sm:p-10 lg:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/20 blur-3xl" />
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/80">
          {t("eyebrow")}
        </p>
        <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/85">{t("body")}</p>
      </div>
    </section>
  );
}

/* ─── Big CTA ─────────────────────────────────────────────────────── */

const APP_STORE_URL = "https://apps.apple.com/";
const PLAY_STORE_URL = "https://play.google.com/store";

function BigCTA() {
  const t = useTranslations("cta");
  return (
    <section
      id="get"
      className="reveal relative mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-28 lg:py-40 scroll-mt-24"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-accent">
        {t("eyebrowLive")}
      </p>
      <h2 className="display text-[clamp(2.75rem,8vw,6rem)] font-semibold text-text-primary">
        {t("titlePrefix")} <span className="signature-fill" style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span>
        <br />
        {t("titleSuffix")}
      </h2>
      <p className="mt-6 max-w-lg text-lg text-text-secondary">
        {t("bodyLive")}
      </p>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary cta-primary-lg"
        >
          {t("iosDownload")}
          <ArrowIcon />
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary cta-primary-lg"
        >
          {t("androidDownload")}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────── */

function Footer() {
  const t = useTranslations("footer");
  const tags = t.raw("tags") as string[];
  const strip = [...tags, ...tags];

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/space-app-45533a405",
      icon: LinkedInIcon,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/spaceeapp",
      icon: InstagramIcon,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@spaceeapp",
      icon: TikTokIcon,
    },
    { name: "X", href: "https://x.com/spaceeapp", icon: XIcon },
  ];

  return (
    <footer className="relative mt-16 border-t border-text-primary/5 bg-surface/60">
      <div className="overflow-hidden py-10">
        <div className="marquee flex w-[200%] gap-4 whitespace-nowrap text-[clamp(2rem,6vw,4rem)] font-semibold text-text-primary/10">
          {strip.map((tag, i) => (
            <span key={i}> - {tag}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <span className="mb-3 block text-sm font-semibold tracking-[0.3em] text-text-primary" style={{ fontFamily: "var(--font-conthrax)" }}>
            SPACE
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-text-primary">
            {t("contacts")}
          </p>
          <a
            href="mailto:info@spaceeapp.com"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            info@spaceeapp.com
          </a>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-text-primary">
            {t("follow")}
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-text-primary/10 bg-surface text-text-secondary transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-text-primary">
            {t("legal")}
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-accent"
              >
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-accent"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link
                href="/cookie"
                className="transition-colors hover:text-accent"
              >
                {t("cookiePolicy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-text-primary/5 px-6 py-6 text-xs text-text-secondary sm:flex-row">
        <p>© {new Date().getFullYear()} <span style={{ fontFamily: "var(--font-conthrax)" }}>SPACE</span></p>
        <p className="text-text-secondary/70">{t("rights")}</p>
      </div>
    </footer>
  );
}

/* ─── Icons ───────────────────────────────────────────────────────── */

const FEATURE_ICONS = [
  /* 0 — Shared folders */
  <svg key="folders" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <path d="M3 7a2 2 0 012-2h3.17a2 2 0 011.42.59l1 1H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    <path d="M8 13h8M8 16h5" strokeOpacity="0.6" />
  </svg>,
  /* 1 — Invite only */
  <svg key="lock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
    <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
  </svg>,
  /* 2 — Synced */
  <svg key="sync" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <path d="M4 12a8 8 0 018-8 8 8 0 017.43 5" />
    <path d="M20 12a8 8 0 01-8 8 8 8 0 01-7.43-5" />
    <polyline points="20 4 20 9 15 9" />
    <polyline points="4 20 4 15 9 15" />
  </svg>,
  /* 3 — Light, fast */
  <svg key="zap" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  /* 4 — Your memories */
  <svg key="download" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <path d="M12 3v13M8 12l4 4 4-4" />
    <path d="M5 19h14" />
  </svg>,
  /* 5 — Beautiful to use */
  <svg key="sparkles" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/90" aria-hidden>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z" strokeOpacity="0.7" />
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" strokeOpacity="0.7" />
  </svg>,
];

function FeatureIcon({ index }: { index: number }) {
  return FEATURE_ICONS[index % FEATURE_ICONS.length];
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

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9.5h4v11H3v-11zm7 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V20.5H18.6v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6v4.98H10v-11z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}
