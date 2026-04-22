import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except: api routes, Next.js internals, files with an
  // extension (e.g. favicon.ico, robots.txt, images).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
