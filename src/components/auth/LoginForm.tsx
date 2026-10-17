"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import AuthCard, { FormError, inputClass } from "./AuthCard";

/* Real Supabase email+password login. Errors come straight from Supabase. */

const loginSchema = z.object({
  email: z.string().trim().email("Sahi email address likho."),
  password: z.string().min(1, "Password likho."),
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const callbackError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    callbackError === "callback_failed"
      ? "Login link kaam nahi kiya — dobara login karo."
      : null
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (signInError) {
        // Supabase ka asli error, plain words me.
        setError(
          signInError.message === "Invalid login credentials"
            ? "Email ya password galat hai. Dobara check karo."
            : signInError.message
        );
        return;
      }
      // Session cookie set ho gayi — ab dashboard par bhejo.
      window.location.href = next;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kuch galat ho gaya. Dobara try karo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back!" subtitle="Apne NihongoVerse account me login karo.">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            className={inputClass}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Password</span>
          <input
            className={inputClass}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <div className="text-right text-sm">
          <Link href="/forgot-password" className="text-sakura hover:underline">
            Password bhool gaye?
          </Link>
        </div>
        <Button type="submit" size="lg" className="w-full" ariaLabel="Log in">
          {loading ? "Login ho raha hai…" : "Login"}
        </Button>
        <p className="text-center text-sm text-muted">
          Account nahi hai?{" "}
          <Link href="/signup" className="text-sakura hover:underline">
            Free signup karo
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
