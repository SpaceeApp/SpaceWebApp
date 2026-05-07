# SPACE — sito

Landing page di SPACE, l'app per cartelle di foto condivise con amici e
famiglia. Next.js 16 (App Router) + Tailwind v4.

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Struttura

```
app/
  layout.tsx         Root layout + script no-FOUC per data-theme
  page.tsx           Home (Nav, Hero, ScrollStage, Features, CTA, Footer)
  globals.css        Palette (light + dark), nav-pill, cta, signature-fill
  components/
    LiquidGlass.tsx  Vetro liquido in stile Apple (backdrop + SVG displacement)
    PressableLink.tsx Anchor che cattura il pointer (fix click sulla nav-pill)
  (legal)/
    layout.tsx       Chrome condiviso per le pagine legali
    privacy/page.md  Privacy policy
    terms/page.md    Termini & condizioni
mdx-components.tsx   Mapping degli elementi MDX sugli stili del tema
documents/           Sorgente .md dei documenti legali (non serviti)
```

## Temi

Le variabili CSS in [app/globals.css](app/globals.css) definiscono le palette
light (default) e dark (`:root[data-theme="dark"]`). Lo script in
[app/layout.tsx](app/layout.tsx) imposta `data-theme` prima del paint leggendo
`localStorage.theme`, con fallback su `prefers-color-scheme`.

Per forzare un tema da console:

```js
localStorage.setItem('theme', 'dark'); // o 'light'
document.documentElement.setAttribute('data-theme', 'dark');
```

## MDX

Le pagine legali sono file `.md` renderizzati via `@next/mdx`
(configurato in [next.config.ts](next.config.ts)). Gli stili dei tag
(h1/h2/p/ul/…) sono in [mdx-components.tsx](mdx-components.tsx) e seguono
il tema del sito. Per aggiungere un'altra pagina legale basta creare
`app/(legal)/<nome>/page.md`.

## Build

```bash
npm run build   # produzione
npm run lint
```

## Note

AGENTS.md / CLAUDE.md contengono istruzioni specifiche di questa versione
di Next.js per gli agenti AI.
