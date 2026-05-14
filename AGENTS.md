# Regole per agenti AI — SpaceWebApp

## Next.js 16 — non è il Next.js che conosci

Questa versione ha breaking changes rispetto a 15. Prima di scrivere codice leggi la guida pertinente in `node_modules/next/dist/docs/`. Rispetta i deprecation notice.

### `params` e `searchParams` sono Promise (breaking)

In Next.js 16 l'accesso sincrono è rimosso. Devi sempre awaittare:

```tsx
// layout.tsx / page.tsx
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
}
```

### Turbopack è il default

`next dev` e `next build` usano Turbopack. Non aggiungere configurazioni webpack — se aggiungi `webpack` in `next.config.ts` la build fallisce.

---

## Tailwind v4

**Non esiste `tailwind.config.ts`.** Il tema è definito interamente nel blocco `@theme {}` di [app/globals.css](app/globals.css) tramite custom properties CSS (`--color-*`, `--font-*`, ecc.). Per aggiungere o modificare token, modifica quel blocco — non creare file di configurazione.

Il tema dark è gestito via `data-theme="dark"` sull'elemento `<html>`, non via classe `.dark`.

---

## next-intl v4

### Import corretti

| Cosa | Import da |
|------|-----------|
| `Link`, `useRouter`, `redirect`, `usePathname` | `../../i18n/navigation` (o `@/i18n/navigation`) |
| `getTranslations`, `setRequestLocale` | `next-intl/server` |
| `NextIntlClientProvider`, `hasLocale` | `next-intl` |

Non importare `Link` da `next/link` o `useRouter` da `next/navigation` — usa sempre i wrapper locale-aware di `i18n/navigation`.

### Locales del progetto

- Locales: `["it", "en"]` — default `it`
- URL italiani: `/`, `/privacy`, `/schedule` (nessun prefisso)
- URL inglesi: `/en`, `/en/privacy`, `/en/schedule`
- `localeDetection: false` — nessun redirect automatico da Accept-Language

### Aggiungere traduzioni

1. Aggiungere la chiave in `messages/it.json` **e** `messages/en.json` — tenerle sempre in sincronia.
2. Usare `getTranslations({ locale, namespace: "..." })` nelle Server Component.
3. Usare `useTranslations("...")` nelle Client Component.

---

## Struttura routing

```
app/
  layout.tsx              Root layout (no locale, imposta data-theme)
  globals.css             Tailwind v4 @theme, palette light/dark
  [locale]/
    layout.tsx            Locale layout: NextIntlClientProvider, FloatingControls
    page.tsx              Home page
    pitch/page.tsx        Pitch deck
    schedule/page.tsx     Schedule
    (legal)/
      layout.tsx          Chrome legale condiviso
      privacy/page.tsx    Privacy policy (legge _content/{locale}.md)
      terms/page.tsx      Termini & condizioni
      cookie/page.tsx     Cookie policy
  components/             Componenti condivisi (Server o Client)
```

### Aggiungere una pagina legale

1. Creare `app/[locale]/(legal)/<nome>/page.tsx` che legge `_content/{locale}.md`
2. Creare `app/[locale]/(legal)/<nome>/_content/it.md` e `en.md`

---

## Prima di scrivere codice

Leggi la documentazione in `node_modules/next/dist/docs/` e `node_modules/next-intl/` per qualsiasi API che non sei certo sia rimasta invariata.
