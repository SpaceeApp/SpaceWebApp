"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import "./pitch.css";

const TOTAL = 9;
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"] as const;
const SLIDE_KEYS = [
  "intro",
  "problem",
  "solution",
  "competitive",
  "market",
  "business",
  "tech",
  "team",
  "vision",
] as const;
const DESKTOP_BREAKPOINT = 1120;

export function PitchDeck() {
  const t = useTranslations("pitch");
  const [index, setIndex] = useState(0);

  const goNext = useCallback(
    () => setIndex((i) => Math.min(TOTAL - 1, i + 1)),
    [],
  );
  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    const isDesktop = () => window.innerWidth > DESKTOP_BREAKPOINT;

    const onKey = (e: KeyboardEvent) => {
      if (!isDesktop()) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(TOTAL - 1);
      }
    };

    let touchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchX = e.changedTouches[0].screenX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isDesktop()) return;
      const delta = touchX - e.changedTouches[0].screenX;
      if (Math.abs(delta) < 45) return;
      if (delta > 0) goNext();
      else goPrev();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  const progress = ((index + 1) / TOTAL) * 100;

  const slideContents = [
    <IntroSlide />,
    <ProblemSlide />,
    <SolutionSlide />,
    <CompetitiveSlide />,
    <MarketSlide />,
    <BusinessSlide />,
    <TechSlide />,
    <TeamSlide />,
    <CTASlide />,
  ];

  return (
    <div className="pitch-root">
      <div className="noise" aria-hidden="true" />
      <main className="deck">
        {slideContents.map((Slide, i) => (
          <SlideShell
            key={i}
            active={i === index}
            brand={t(`slides.${SLIDE_KEYS[i]}.brand`)}
            tag={t("tag", { n: ROMAN[i] })}
            footerLabel={t(`slides.${SLIDE_KEYS[i]}.footer`)}
            roman={ROMAN[i]}
            progress={progress}
            isIntro={i === 0}
          >
            {Slide}
          </SlideShell>
        ))}
      </main>
    </div>
  );
}

function SlideShell({
  active,
  brand,
  tag,
  footerLabel,
  roman,
  progress,
  isIntro,
  children,
}: {
  active: boolean;
  brand: string;
  tag: string;
  footerLabel: string;
  roman: string;
  progress: number;
  isIntro: boolean;
  children: React.ReactNode;
}) {
  const t = useTranslations("pitch");
  return (
    <section className={`slide${active ? " active" : ""}`} data-slide>
      <article className="panel">
        <header className="slide-header">
          <div className="brand">{brand}</div>
          <div className="tag">{tag}</div>
        </header>
        {children}
        <footer className="slide-footer">
          <span>{footerLabel}</span>
          {isIntro ? (
            <span className="desktop-help">
              {t.rich("kbdHint", {
                kbd: (chunks) => <span className="kbd">{chunks}</span>,
              })}
            </span>
          ) : (
            <div className="progress-wrap">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <span className="roman">{roman}</span>
        </footer>
      </article>
    </section>
  );
}

function IntroSlide() {
  const t = useTranslations("pitch.slides.intro");
  return (
    <div className="slide-body intro-stage">
      <div className="intro-orb orb-a" aria-hidden="true" />
      <div className="intro-orb orb-b" aria-hidden="true" />
      <div className="intro-orb orb-c" aria-hidden="true" />
      <p className="intro-kicker fade-up">{t("kicker")}</p>
      <span className="intro-space-outline" aria-hidden="true">
        SPACE
      </span>
      <h1 className="intro-space fade-up delay-1">SPACE</h1>
      <p className="intro-tagline fade-up delay-2">{t("tagline")}</p>
      <p className="intro-sub fade-up delay-2">{t("sub")}</p>
    </div>
  );
}

function ProblemSlide() {
  const t = useTranslations("pitch.slides.problem");
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <div className="problem-layout">
        <p
          className="problem-copy"
          dangerouslySetInnerHTML={{ __html: t.raw("copy") }}
        />
        <div className="phone-mock">
          <div className="phone-screen" />
          <div className="phone-notice">{t("phoneNotice")}</div>
        </div>
        <div className="quote">
          <p className="quote-text">{t("quote")}</p>
          <p className="small">{t("quoteCaption")}</p>
        </div>
      </div>
    </div>
  );
}

function SolutionSlide() {
  const t = useTranslations("pitch.slides.solution");
  const screens = t.raw("screens") as string[];
  return (
    <div className="slide-body center-copy">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <h1>SPACE</h1>
      <p
        className="business-note"
        style={{ margin: "0 auto" }}
        dangerouslySetInnerHTML={{ __html: t.raw("note") }}
      />
      <div className="screen-row">
        {screens.map((label, i) => (
          <div key={i} className="screen-box">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitiveSlide() {
  const t = useTranslations("pitch.slides.competitive");
  const headers = t.raw("tableHeaders") as string[];
  const rows = t.raw("tableRows") as string[][];
  return (
    <div className="slide-body">
      <h2
        className="center-copy"
        dangerouslySetInnerHTML={{ __html: t.raw("title") }}
      />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => {
              const isSpace = i === rows.length - 1;
              return (
                <tr key={i}>
                  {cells.map((c, j) => (
                    <td key={j} className={isSpace ? "highlight" : undefined}>
                      {c}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarketSlide() {
  const t = useTranslations("pitch.slides.market");
  const charts = t.raw("charts") as { title: string; bars: number[] }[];
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <p className="lead">{t("lead")}</p>
      <div className="layout-3">
        {charts.map((chart) => (
          <div key={chart.title} className="chart-card">
            <strong>{chart.title}</strong>
            <div className="bars">
              {chart.bars.map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="small">{t("source")}</p>
    </div>
  );
}

function BusinessSlide() {
  const t = useTranslations("pitch.slides.business");
  const bullets = t.raw("bullets") as string[];
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <div className="layout-2">
        <div className="card">
          <p
            className="business-note"
            dangerouslySetInnerHTML={{ __html: t.raw("note") }}
          />
        </div>
        <div className="card">
          <h3>{t("nextStepsTitle")}</h3>
          <ul className="bullet-list">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TechSlide() {
  const t = useTranslations("pitch.slides.tech");
  const chips = t.raw("chips") as string[];
  const cards = t.raw("cards") as { title: string; body: string }[];
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <p className="lead">{t("lead")}</p>
      <div className="card">
        <div className="chip-row">
          {chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      </div>
      <div className="layout-3">
        {cards.map((c) => (
          <div key={c.title} className="card">
            <h3>{c.title}</h3>
            <p className="small">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSlide() {
  const t = useTranslations("pitch.slides.team");
  const profiles = t.raw("profiles") as { name: string; role: string }[];
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <div className="layout-4">
        {profiles.map((p) => (
          <article key={p.name} className="profile-box">
            <div className="avatar-placeholder" />
            <h3>{p.name}</h3>
            <p className="small">{p.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function CTASlide() {
  const t = useTranslations("pitch.slides.vision");
  return (
    <div className="slide-body">
      <h2>
        <span className="underlined">{t("title")}</span>
      </h2>
      <div className="cta">
        <h1>{t("heading")}</h1>
        <p
          className="lead"
          dangerouslySetInnerHTML={{ __html: t.raw("body") }}
        />
        <p className="small">{t("contacts")}</p>
        <button className="btn" type="button">
          {t("button")}
        </button>
      </div>
    </div>
  );
}
