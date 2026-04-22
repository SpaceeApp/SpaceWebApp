"use client";

import { useEffect } from "react";

// Keeps <html lang> in sync with the active locale on client-side navigation.
// The root layout can't set it dynamically because it sits above [locale].
export function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
