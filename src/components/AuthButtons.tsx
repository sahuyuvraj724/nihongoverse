"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/* Right side of the navbar: Login/Signup when logged out,
   display name + Logout when logged in. Reads the real session. */

type SessionState =
  | { status: "loading" }
  | { status: "out" }
  | { status: "in"; name: string };

export default function AuthButtons({ onNavigate }: { onNavigate?: () => void }) {
  const [state, setState] = useState<SessionState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (cancelled) return;
        if (!user) {
          setState({ status: "out" });
          return;
        }
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();
        if (cancelled) return;
        setState({
          status: "in",
          name:
            (profile?.display_name as string | null) ||
            user.email?.split("@")[0] ||
            "Student",
        });
      } catch {
        if (!cancelled) setState({ status: "out" });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <span className="h-9 w-24 animate-pulse rounded-full bg-white/10" />;
  }

  if (state.status === "out") {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          onClick={onNavigate}
          className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          Login
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className="rounded-full bg-gradient-to-r from-sakura to-sakura-soft px-5 py-2.5 font-display text-sm font-semibold text-midnight transition-transform hover:-translate-y-0.5"
        >
          Sign up free
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="max-w-32 truncate rounded-full bg-violet-glow/15 px-4 py-2 text-sm font-medium text-sakura transition-colors hover:bg-violet-glow/25"
        title="Dashboard kholo"
      >
        {state.name}
      </Link>
      <Link
        href="/auth/signout"
        onClick={onNavigate}
        className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        Logout
      </Link>
    </div>
  );
}
