import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getEnv } from "@/lib/env";

/* Supabase client for SERVER components, route handlers and server actions.
   IMPORTANT: create a NEW client on every call — never share one client
   across requests. Next 16 requires `await cookies()`. */

export async function createClient() {
  const env = getEnv();
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // setAll only works in route handlers / proxy. In plain server
          // components Next.js throws — the proxy.ts below handles refresh,
          // so we safely ignore the error here.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — session refresh is handled by proxy.
          }
        },
      },
    }
  );
}
