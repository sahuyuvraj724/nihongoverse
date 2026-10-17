"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import AuthCard, { FormError, FormSuccess, inputClass } from "./AuthCard";

/* Sends a REAL password-reset email via Supabase Auth.
   The email link goes to /auth/callback?next=/reset-password. */

const schema = z.object({
  email: z.string().trim().email("Sahi email address likho."),
});

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        parsed.data.email,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        }
      );
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kuch galat ho gaya. Dobara try karo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Reset password"
      subtitle="Email likho — password reset link bhej dungi."
    >
      {done ? (
        <div className="text-center">
          <FormSuccess
            message={`Bhej diya! 📧 ${email} par reset link aaya hoga. Inbox (aur spam) check karo — link par click karke naya password set karo.`}
          />
          <p className="mt-4 text-sm text-muted">
            <Link href="/login" className="text-sakura hover:underline">
              Wapas login par jao
            </Link>
          </p>
        </div>
      ) : (
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
          <Button type="submit" size="lg" className="mt-2 w-full" ariaLabel="Send reset link">
            {loading ? "Bhej rahi hoon…" : "Reset link bhejo"}
          </Button>
          <p className="text-center text-sm text-muted">
            <Link href="/login" className="text-sakura hover:underline">
              Wapas login par jao
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}
