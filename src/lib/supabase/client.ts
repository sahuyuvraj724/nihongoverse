import { createBrowserClient } from "@supabase/ssr";
import { getEnv } from "@/lib/env";

/* Supabase client for BROWSER components ("use client").
   The session is stored in cookies so the server can read it too.
   Never import this in a server component — use server.ts there. */

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (browserClient) return browserClient;
  const env = getEnv();
  browserClient = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return browserClient;
}
