import { LiquidGlass, LiquidGlassFilter } from "./components/LiquidGlass";
import { PressableLink } from "./components/PressableLink";

export default function Home() {
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <div className="mx-auto mt-4 max-w-6xl">
        <LiquidGlass
          className="nav-pill rounded-full"
          variant="mild"
          style={{borderRadius: 9999}}
        >
        <div className="flex items-center justify-between px-5 py-2.5">
          <PressableLink href="#top" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-[0.3em] text-text-primary">
              SPACE
            </span>
          </PressableLink>
          <nav className="hidden gap-8 text-sm text-text-secondary sm:flex">
            <PressableLink
              href="#features"
              className="transition-colors hover:text-text-primary"
            >
              Funzioni
            </PressableLink>
            <PressableLink
              href="#privacy"
              className="transition-colors hover:text-text-primary"
            >
              Privacy
            </PressableLink>
            <PressableLink
              href="#get"
              className="transition-colors hover:text-text-primary"
            >
              Scarica
            </PressableLink>
          </nav>
          <PressableLink href="#get" className="cta-primary !py-2 !px-4 !text-xs">
            Entra in SPACE
          </PressableLink>
        </div>
        </LiquidGlass>
      </div>
    </header>
  );
}

/* ─── Hero with real photo collage behind ─────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-32 text-center"
    >
      <div className="hero-ambient" />

      <p className="relative z-10 mb-6 text-xs font-medium uppercase tracking-[0.4em] text-accent">
        per te e chi conta davvero
      </p>

      <h1 className="display signature-fill relative z-10 text-[clamp(4rem,14vw,13rem)] font-semibold">
        SPACE
      </h1>

      <p className="relative z-10 mt-8 max-w-xl text-lg text-text-primary/80 sm:text-xl">
        Le tue foto. Le tue persone. Un posto solo vostro.
        <br className="hidden sm:inline" />
        Cartelle condivise, senza rumore.
      </p>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-3">
        <a href="#get" className="cta-primary cta-primary-lg">
          Entra in SPACE
          <ArrowIcon />
        </a>
        <LiquidGlass
            className="nav-pill rounded-full"
            variant="mild"
            style={{borderRadius: 9999}}
          >
          <PressableLink
            href="#features"
            className="block px-7 py-[0.9rem] text-[0.9rem] font-semibold text-text-primary"
          >
            Scopri di più
          </PressableLink>
        </LiquidGlass>
      </div>
    </section>
  );
}

/* ─── Scroll stage ────────────────────────────────────────────────── */

function ScrollStage() {
  // Tuple: [accent part (solid dark), signature-fill part (indigo→rose)]
  const lines: [string, string][] = [
    ["Una cartella", "per ogni ricordo"],
    ["Invita", "solo chi vuoi tu"],
    ["Niente algoritmi", "niente feed"],
    ["Solo voi,", "le vostre foto, il vostro spazio"],
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10 sm:py-40">
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
  const features = [
    {
      title: "Cartelle condivise",
      body: "Crea uno spazio, invita gli amici, caricate insieme. Ogni cartella è un piccolo mondo",
    },
    {
      title: "Solo su invito",
      body: "Nessuno vede le vostre foto se non è dentro. Niente link pubblici, niente sorprese",
    },
    {
      title: "Sincronizzato",
      body: "Aggiungi una foto sul telefono, appare sul tablet di chi condivide lo spazio. Subito",
    },
    {
      title: "Leggero, veloce",
      body: "Costruita per essere fluida. Scorri, carica, commenta senza attese",
    },
    {
      title: "I tuoi ricordi",
      body: "Le foto restano tue. Scarichi tutto quando vuoi, in pieno controllo",
    },
    {
      title: "Bella da usare",
      body: "Interfaccia pulita, luce e vetro. Perché i ricordi meritano una cornice",
    },
  ];

  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-32">
      <div className="reveal mb-10 max-w-2xl sm:mb-16">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent">
          funzioni
        </p>
        <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold text-text-primary">
          Tutto quello che serve
          <br />
          <span className="signature-fill">Niente che non serve</span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="reveal card rounded-3xl p-7 transition-transform hover:-translate-y-1"
          >
            <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-accent-deep shadow-[0_6px_18px_-6px_rgba(74,72,212,0.55)]">
              <span className="h-3 w-3 rounded-full bg-white/90" />
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
  return (
    <section
      id="privacy"
      className="reveal relative mx-auto my-12 max-w-6xl px-6 sm:my-24"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent-deep via-accent to-accent-soft p-10 text-white shadow-[0_40px_80px_-30px_rgba(74,72,212,0.45)] sm:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/20 blur-3xl" />
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/80">
          privacy
        </p>
        <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold">
          Le vostre foto non sono un prodotto.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/85">
          SPACE è pensato perché i ricordi restino fra chi li ha vissuti.
          Nessuna pubblicità, nessun tracciamento esterno, nessun feed
          pubblico.
        </p>
      </div>
    </section>
  );
}

/* ─── Big CTA ─────────────────────────────────────────────────────── */

const IS_LIVE = process.env.NEXT_PUBLIC_LIVE_MODE === "true";

function BigCTA() {
  return (
    <section
      id="get"
      className="reveal relative mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-40"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-accent">
        {IS_LIVE ? "scarica ora" : "inizia ora"}
      </p>
      <h2 className="display text-[clamp(2.75rem,8vw,6rem)] font-semibold text-text-primary">
        Il vostro <span className="signature-fill">SPACE</span>
        <br />
        vi aspetta
      </h2>
      <p className="mt-6 max-w-lg text-lg text-text-secondary">
        {IS_LIVE
          ? "Crea il tuo primo spazio in meno di un minuto. Invita chi vuoi."
          : "Siamo quasi pronti. Lasciaci la tua email e ti avvisiamo appena SPACE è scaricabile."}
      </p>

      {IS_LIVE ? (
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a href="#download-ios" className="cta-primary cta-primary-lg">
            Scarica per iOS
            <ArrowIcon />
          </a>
          <a href="#download-android" className="cta-primary cta-primary-lg">
            Scarica per Android
            <ArrowIcon />
          </a>
        </div>
      ) : (
        <form className="mt-12 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="la-tua@email.com"
            className="flex-1 rounded-full border border-text-primary/10 bg-surface px-5 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
          />
          <button type="submit" className="cta-primary">
            Avvisami al lancio
          </button>
        </form>
      )}
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────── */

function Footer() {
  const tags = [
    "foto",
    "amici",
    "cartelle condivise",
    "privacy",
    "ricordi",
    "famiglia",
    "viaggi",
    "sincronizzato",
  ];
  const strip = [...tags, ...tags];

  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com/space.app",
      icon: InstagramIcon,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/space-app",
      icon: LinkedInIcon,
    },
    { name: "X", href: "https://x.com/space_app", icon: XIcon },
  ];

  return (
    <footer className="relative mt-16 border-t border-text-primary/5 bg-surface/60">
      <div className="overflow-hidden py-10">
        <div className="marquee flex w-[200%] gap-4 whitespace-nowrap text-[clamp(2rem,6vw,4rem)] font-semibold text-text-primary/10">
          {strip.map((t, i) => (
            <span key={i}> - {t}</span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-semibold tracking-[0.3em] text-text-primary">
              SPACE
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
            Le tue foto. Le tue persone. Un posto solo vostro.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-text-primary">
            Contatti
          </p>
          <a
            href="mailto:hello@space-app.it"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            hello@space-app.it
          </a>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-text-primary">
            Seguici
          </p>
          <div className="flex items-center gap-3">
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
            Legale
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              <a
                href="/privacy"
                className="transition-colors hover:text-accent"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="transition-colors hover:text-accent"
              >
                Termini di servizio
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-text-primary/5 px-6 py-6 text-xs text-text-secondary sm:flex-row">
        <p>© {new Date().getFullYear()} SPACE</p>
        <p className="text-text-secondary/70">Tutti i diritti riservati</p>
      </div>
    </footer>
  );
}

/* ─── Icons ───────────────────────────────────────────────────────── */

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9.5h4v11H3v-11zm7 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V20.5H18.6v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6v4.98H10v-11z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
