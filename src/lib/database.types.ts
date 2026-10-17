/* Simple TypeScript shapes for the rows we read in Phase 2.
   (Full auto-generated types come later with `supabase gen types`.) */

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: "student" | "admin";
  current_level: string | null;
  xp: number;
  streak: number;
  created_at: string;
  updated_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: "free" | "monthly" | "annual";
  status: string;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};
