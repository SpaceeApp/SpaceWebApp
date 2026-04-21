"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** "mild" = scale 80 (readable), "strong" = scale 200 (dramatic) */
  variant?: "mild" | "strong";
};

/**
 * Apple-style liquid glass wrapper.
 *
 * Four layered elements inside a rounded, overflow-hidden container:
 *   1. backdrop  — blur + SVG turbulence/displacement (refraction)
 *   2. tint      — subtle white veil
 *   3. edge      — inset highlight (specular rim)
 *   4. content   — on top, undistorted
 *
 * Requires <LiquidGlassFilter /> mounted once on the page.
 * Crucially: this only "reads" as glass when the backdrop has rich,
 * varied content (photos, gradients). Over a flat color it is invisible
 * by design — that is how glass works in physics, not a bug.
 */
export function LiquidGlass({
  children,
  className = "",
  style,
  variant = "mild",
}: Props) {
  const filterId =
    variant === "strong" ? "url(#lg-distort-strong)" : "url(#lg-distort-mild)";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        boxShadow:
          "0 6px 6px rgba(0,0,0,0.12), 0 0 20px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          borderRadius: "inherit",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          filter: filterId,
          isolation: "isolate",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          borderRadius: "inherit",
          background: "rgba(255, 255, 255, 0.22)",
        }}
      />
      {/* Specular rim: the inset shadow is drawn from this element's own edge,
          so it must share the parent's border-radius — otherwise the highlight
          stays rectangular and gets chopped at the rounded corners. */}
      <div
        aria-hidden
        className="absolute inset-0 z-20"
        style={{
          borderRadius: "inherit",
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255,255,255,0.55), inset -1px -1px 1px 1px rgba(255,255,255,0.45)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );
}

/**
 * Mount once at the root of the page. Defines two filter variants
 * (mild / strong) that <LiquidGlass> references by URL.
 */
export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Mild: readable text inside */}
        <filter
          id="lg-distort-mild"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="1"
            seed="11"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="80"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Strong: dramatic refraction, use over very rich backdrops */}
        <filter
          id="lg-distort-strong"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
