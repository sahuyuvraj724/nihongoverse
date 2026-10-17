import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/* Handles Supabase email links (verify email, reset password, invites).
   Exchanges the ?code= for a session cookie, then redirects. */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code, or exchange failed — back to login with an honest message.
  return NextResponse.redirect(`${origin}/login?error=callback_failed`);
}
