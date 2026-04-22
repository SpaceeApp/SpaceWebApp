"use client";

import type { AnchorHTMLAttributes, PointerEvent } from "react";
import type { ComponentProps } from "react";
import { Link } from "../../i18n/navigation";

/**
 * Keeps the click bound to the element even if its parent shrinks via a
 * :active transform (the nav pill does `scale(0.94)` while the user is
 * holding the mouse down — without pointer capture the link moves out
 * from under the cursor and the click is lost).
 *
 * Renders a plain <a> by default (for in-page hash links). Pass
 * `locale` to route through the locale-aware Next.js Link instead.
 */
type BaseProps = {
  onPointerDown?: (e: PointerEvent<HTMLAnchorElement>) => void;
};

function capture(
  onPointerDown: BaseProps["onPointerDown"],
): (e: PointerEvent<HTMLAnchorElement>) => void {
  return (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    onPointerDown?.(e);
  };
}

export function PressableLink({
  onPointerDown,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...rest} onPointerDown={capture(onPointerDown)} />;
}

type PressableLocaleLinkProps = Omit<
  ComponentProps<typeof Link>,
  "onPointerDown"
> & BaseProps;

export function PressableLocaleLink({
  onPointerDown,
  ...rest
}: PressableLocaleLinkProps) {
  return <Link {...rest} onPointerDown={capture(onPointerDown)} />;
}
