import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/database.types";

/* Small server-side helpers so every protected page does auth the same way.
   NEVER trust the browser for this — these run on the server only. */

/** The logged-in user, or null. Uses getUser() (validated with Supabase). */
export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Redirects to /login when nobody is logged in. Returns the user. */
export async function requireUser(next?: string) {
  const user = await getSessionUser();
  if (!user) {
    redirect(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
  }
  return user;
}

/** The user's profile row, or null (e.g. brand-new signup before trigger). */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) return null;
  return data as Profile;
}

/** True only when the user's profile row has role = 'admin'. */
export async function isAdminUser(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.role === "admin";
}
