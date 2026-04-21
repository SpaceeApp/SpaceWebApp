import type { MDXComponents } from "mdx/types";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        {...props}
        className="display mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05]"
      >
        <span className="signature-fill">{children}</span>
      </h1>
    ),
    h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        {...props}
        className="display mt-16 mb-4 text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text-primary"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        {...props}
        className="mt-10 mb-3 text-lg font-semibold text-text-primary"
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
      <p
        {...props}
        className="my-4 text-[0.98rem] leading-[1.75] text-text-primary/85"
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul
        {...props}
        className="my-4 space-y-2 pl-0 text-[0.98rem] leading-[1.7] text-text-primary/85 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-1 [&_li]:before:top-[0.7em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:-translate-y-1/2 [&_li]:before:rounded-full [&_li]:before:bg-gradient-to-br [&_li]:before:from-accent-soft [&_li]:before:to-accent-deep"
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: OlHTMLAttributes<HTMLOListElement>) => (
      <ol
        {...props}
        className="my-4 list-decimal space-y-2 pl-6 text-[0.98rem] leading-[1.7] text-text-primary/85 marker:text-accent marker:font-semibold"
      >
        {children}
      </ol>
    ),
    a: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        {...props}
        className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-deep hover:decoration-accent-deep/60"
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <strong {...props} className="font-semibold text-text-primary">
        {children}
      </strong>
    ),
    em: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <em {...props} className="italic text-text-primary/90">
        {children}
      </em>
    ),
    hr: (props: HTMLAttributes<HTMLHRElement>) => (
      <hr
        {...props}
        className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-text-primary/15 to-transparent"
      />
    ),
    blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        {...props}
        className="my-6 rounded-r-2xl border-l-4 border-accent bg-accent/5 py-4 pl-6 pr-4 italic text-text-primary/80"
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <code
        {...props}
        className="rounded-md bg-text-primary/5 px-1.5 py-0.5 font-mono text-[0.88em] text-accent-deep"
      >
        {children}
      </code>
    ),
  };
}
