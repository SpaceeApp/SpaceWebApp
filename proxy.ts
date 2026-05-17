import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except: api routes, Next.js internals, files with an
  // extension (e.g. favicon.ico, robots.txt, images), and /join/* which is
  // served by app/join/[token]/page.tsx as a Universal Link target (must
  // resolve at the literal /join path, not under a locale prefix).
  matcher: ["/((?!api|_next|_vercel|join|.*\\..*).*)"],
};
