"use client";

import type { AnchorHTMLAttributes, PointerEvent } from "react";

/**
 * Anchor that keeps the click bound to itself even if its parent
 * shrinks via a :active transform (the nav pill does `scale(0.94)`
 * while the user is holding the mouse down — without pointer capture
 * the link moves out from under the cursor and the click is lost).
 */
export function PressableLink({
  onPointerDown,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      onPointerDown={(e: PointerEvent<HTMLAnchorElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        onPointerDown?.(e);
      }}
    />
  );
}
