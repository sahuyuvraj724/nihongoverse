import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/* Next.js 16 calls this file `proxy.ts` (the old `middleware.ts` name is
   deprecated). It runs before every page render and keeps the Supabase
   login session fresh. */

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Run on everything except static files and images.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
