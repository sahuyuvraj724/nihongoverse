import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getEnv } from "@/lib/env";

/* Runs on EVERY request (via src/proxy.ts).
   1. Reads the session cookie and refreshes it if the access token expired.
   2. Protects private routes with REAL 307 redirects (works in dev and prod,
      no client-side flash, curl-verifiable).
   Without this, users get randomly logged out. */

const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/billing", "/admin"];
const AUTH_PAGES = ["/login", "/signup", "/forgot-password"];

function isPath(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function loginRedirect(request: NextRequest, next: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  let env: ReturnType<typeof getEnv>;
  try {
    env = getEnv();
  } catch {
    // Supabase not configured yet (e.g. fresh clone without .env.local):
    // let the request through; pages will show the setup error instead.
    return supabaseResponse;
  }

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session if needed. Never throws for anonymous users.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Logged-out visitor on a private page → real 307 to /login.
  if (!user && isPath(pathname, PROTECTED_PREFIXES)) {
    return loginRedirect(request, pathname);
  }

  // Logged-in user on login/signup pages → straight to dashboard.
  if (user && isPath(pathname, AUTH_PAGES)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
