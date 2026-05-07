'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PressableLocaleLink } from './PressableLink';

type Link = { href: string; label: string };

export function NavMobileMenu({
  links,
  ctaHref,
  ctaLabel,
}: {
  links: Link[];
  ctaHref: string;
  ctaLabel: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary transition-colors hover:text-accent"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* drawer */}
          <div className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-text-primary/10 bg-surface/90 p-6 shadow-2xl backdrop-blur-2xl">
            <nav className="flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <PressableLocaleLink
                  key={href}
                  href={href}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-text-primary transition-colors hover:bg-text-primary/5 hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </PressableLocaleLink>
              ))}
            </nav>
            <div className="mt-5 border-t border-text-primary/10 pt-5">
              <PressableLocaleLink
                href={ctaHref}
                className="cta-primary block w-full text-center"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </PressableLocaleLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
