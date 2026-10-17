import { z } from "zod";

/* Central place that checks our environment variables.
   If something is missing, it throws a SIMPLE error telling the
   beginner exactly which variable is missing and where to put it —
   instead of a scary cryptic crash later. */

const serverSchema = z.object({
  // Public values — safe to use in the browser. They come from
  // Supabase Dashboard → Project Settings → API.
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL is not a valid URL.")
    .refine((v) => !v.includes("your-project"), {
      message:
        "NEXT_PUBLIC_SUPABASE_URL still has the placeholder value. " +
        "Copy your real Project URL from Supabase Dashboard → Project Settings → API " +
        "into your .env.local file.",
    }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(20, "NEXT_PUBLIC_SUPABASE_ANON_KEY looks too short.")
    .refine((v) => !v.includes("your-anon-key"), {
      message:
        "NEXT_PUBLIC_SUPABASE_ANON_KEY still has the placeholder value. " +
        "Copy your real anon / publishable key from Supabase Dashboard → Project Settings → API " +
        "into your .env.local file.",
    }),
});

export type Env = z.infer<typeof serverSchema>;

/* Call this once per module that needs Supabase config.
   Throws a beginner-friendly Error if .env.local is missing values. */
export function getEnv(): Env {
  const parsed = serverSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `• ${i.message}`).join("\n");
    throw new Error(
      "Supabase is not configured yet.\n" +
        details +
        "\n\nFix: open the file .env.local in the project root and fill in the values. " +
        "See docs/SUPABASE_SETUP.md for exact steps."
    );
  }
  return parsed.data;
}
