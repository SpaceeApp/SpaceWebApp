# SPACE — sito

Landing page di SPACE, l'app per cartelle di foto condivise con amici e
famiglia. Next.js 16 (App Router, Turbopack) · React 19.2 · Tailwind v4 · next-intl v4.

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Struttura

```
app/
  layout.tsx                    Root layout + script no-FOUC per data-theme
  globals.css                   Tailwind v4 @theme, palette light/dark
  [locale]/
    layout.tsx                  Locale layout: NextIntlClientProvider, FloatingControls
    page.tsx                    Home (Nav, Hero, ScrollStage, Features, CTA, Footer)
    pitch/page.tsx              Pitch deck
    schedule/page.tsx           Schedule + ScheduleDeck
    (legal)/
      layout.tsx                Chrome condiviso per le pagine legali
      privacy/
        _content/{it,en}.md     Testo della privacy policy
        page.tsx                Pagina che carica il .md nella locale corrente
      terms/                    Stessa struttura di privacy/
      cookie/                   Stessa struttura di privacy/
  components/
    FloatingControls.tsx        Switcher lingua + tema (client)
    HtmlLangSync.tsx            Sincronizza lang sull'<html> lato client
    LiquidGlass.tsx             Vetro liquido in stile Apple (backdrop + SVG)
    NavMobileMenu.tsx           Menu di navigazione mobile
    PressableLink.tsx           Anchor che cattura il pointer (fix click nav-pill)
    ScheduleDeck.tsx            Deck delle slide per la pagina schedule
i18n/
  routing.ts                    Definizione locales, defaultLocale, localePrefix
  request.ts                    Carica i messaggi per locale
  navigation.ts                 Link/useRouter/redirect locale-aware
messages/
  it.json                       Stringhe italiane (locale default)
  en.json                       Stringhe inglesi
```

## i18n

Locales supportati: **italiano** (default, URL senza prefisso) e **inglese** (`/en/…`).

Per aggiungere o modificare testi: edita `messages/it.json` e `messages/en.json` in sincronia.
Per aggiungere un locale: aggiorna `i18n/routing.ts` e crea il file in `messages/`.

## Temi

Le variabili CSS in [app/globals.css](app/globals.css) definiscono le palette
light (default) e dark (`:root[data-theme="dark"]`). Lo script inline in
[app/layout.tsx](app/layout.tsx) imposta `data-theme` prima del paint leggendo
`localStorage.theme`, con fallback su `prefers-color-scheme`.

**Non esiste `tailwind.config.ts`** — il tema Tailwind v4 è interamente nel
blocco `@theme {}` di globals.css.

Per forzare un tema da console:

```js
localStorage.setItem('theme', 'dark') // o 'light'
document.documentElement.setAttribute('data-theme', 'dark')
```

## Pagine legali (MDX)

Le pagine legali caricano file `.md` da `_content/{locale}.md` e li renderizzano
via `@next/mdx`. Gli stili (h1/h2/p/ul/…) sono in [mdx-components.tsx](mdx-components.tsx).

Per aggiungere una pagina legale:
1. Creare `app/[locale]/(legal)/<nome>/page.tsx`
2. Creare `app/[locale]/(legal)/<nome>/_content/it.md` e `en.md`

## Note per agenti AI

Vedi [AGENTS.md](AGENTS.md) — contiene regole specifiche su Next.js 16,
Tailwind v4, e next-intl v4 che differiscono dal comportamento atteso dal
training data dei modelli.
