"use client";

import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/Button";
import { FormError, FormSuccess, inputClass } from "@/components/auth/AuthCard";

/* Real settings forms. display_name → profiles table (RLS allows own row).
   Password → Supabase Auth directly. Nothing is faked. */

const nameSchema = z.object({
  display_name: z.string().trim().min(2, "Naam kam se kam 2 akshar ka ho.").max(40),
});

const passwordSchema = z
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

export function DisplayNameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    const parsed = nameSchema.safeParse({ display_name: name });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("Login session nahi mili — dobara login karo.");
        return;
      }
      // RLS: user apni khud ki row hi update kar sakta hai,
      // aur role change trigger se blocked hai.
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ display_name: parsed.data.display_name })
        .eq("id", user.id);
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setOk(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuch galat ho gaya.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-bold text-ink">Display name</h2>
      <FormError message={error} />
      <FormSuccess message={ok ? "Naam save ho gaya! ✅" : null} />
      <input
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Yuvii"
        maxLength={40}
      />
      <div>
        <Button type="submit" size="sm" ariaLabel="Save display name">
          {loading ? "Save ho raha hai…" : "Save karo"}
        </Button>
      </div>
    </form>
  );
}

export function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    const parsed = passwordSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: parsed.data.password,
      });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setPassword("");
      setConfirm("");
      setOk(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuch galat ho gaya.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-bold text-ink">Password badlo</h2>
      <FormError message={error} />
      <FormSuccess message={ok ? "Password update ho gaya! ✅" : null} />
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink">Naya password</span>
        <input
          className={inputClass}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink">Dobara likho</span>
        <input
          className={inputClass}
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <div>
        <Button type="submit" size="sm" ariaLabel="Update password">
          {loading ? "Update ho raha hai…" : "Password update karo"}
        </Button>
      </div>
    </form>
  );
}
