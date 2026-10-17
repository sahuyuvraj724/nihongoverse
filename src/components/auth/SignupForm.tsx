"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import AuthCard, { FormError, FormSuccess, inputClass } from "./AuthCard";

/* Real Supabase email+password signup. No fake accounts — the user is
   created in Supabase Auth and must verify via the email link. */

const signupSchema = z.object({
  name: z.string().trim().min(2, "Apna naam likho (kam se kam 2 akshar)."),
  email: z.string().trim().email("Sahi email address likho."),
  password: z
    .string()
    .min(8, "Password kam se kam 8 characters ka ho.")
    .regex(/[0-9]/, "Password me kam se kam 1 number ho.")
    .regex(/[a-zA-Z]/, "Password me kam se kam 1 letter ho."),
});

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: { display_name: parsed.data.name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
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
      title="Create your account"
      subtitle="Free me shuru karo — koi card nahi chahiye."
    >
      {done ? (
        <div className="text-center">
          <FormSuccess
            message={`Ho gaya! 📧 ${email} par ek verification link bheja hai. Inbox (aur spam folder) check karo aur link par click karo.`}
          />
          <p className="mt-4 text-sm text-muted">
            Verify karne ke baad{" "}
            <Link href="/login" className="text-sakura hover:underline">
              yahan login karo
            </Link>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormError message={error} />
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Display name</span>
            <input
              className={inputClass}
              placeholder="Yuvii"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
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
              placeholder="Kam se kam 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <Button type="submit" size="lg" className="mt-2 w-full" ariaLabel="Sign up">
            {loading ? "Account ban raha hai…" : "Sign up free"}
          </Button>
          <p className="text-center text-sm text-muted">
            Pehle se account hai?{" "}
            <Link href="/login" className="text-sakura hover:underline">
              Login karo
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}
