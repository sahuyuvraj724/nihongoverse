"use client";

import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import AuthCard, { FormError, FormSuccess, inputClass } from "./AuthCard";

/* Shown after the user clicks the reset link in their email.
   The /auth/callback route already turned the link into a session,
   so updateUser() just works here. */

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password kam se kam 8 characters ka ho.")
      .regex(/[0-9]/, "Password me kam se kam 1 number ho.")
      .regex(/[a-zA-Z]/, "Password me kam se kam 1 letter ho."),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Dono password same nahi hain.",
    path: ["confirm"],
  });

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ password, confirm });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      // Pehle check karo: reset link se session bani ya nahi.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError(
          "Ye reset link kaam nahi kar raha (expired ya pehle use ho chuka). /forgot-password se naya link mangwao."
        );
        return;
      }
      const { error: updateError } = await supabase.auth.updateUser({
        password: parsed.data.password,
      });
      if (updateError) {
        setError(updateError.message);
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
      title="Naya password set karo"
      subtitle="Strong password rakho — kam se kam 8 characters."
    >
      {done ? (
        <div className="text-center">
          <FormSuccess message="Password update ho gaya! ✅ Ab naye password se login karo." />
          <Button href="/login" size="lg" className="mt-4 w-full">
            Login par jao
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormError message={error} />
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Naya password</span>
            <input
              className={inputClass}
              type="password"
              placeholder="Kam se kam 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Password dobara likho</span>
            <input
              className={inputClass}
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </label>
          <Button type="submit" size="lg" className="mt-2 w-full" ariaLabel="Set new password">
            {loading ? "Save ho raha hai…" : "Password save karo"}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
