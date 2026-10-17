# Supabase Setup — NihongoVerse Phase 2

Beginner-friendly, click-by-click. You only do this ONCE.

## Step 1 — Run the database migration (creates all 18 tables)

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) and click your **nihongoverse** project.
2. In the left sidebar, click **SQL Editor**.
3. Click **"New query"**.
4. Open the file `supabase/migrations/0001_initial_schema.sql` in this project, select ALL of it (Ctrl+A), copy it.
5. Paste it into the SQL Editor and press **Run** (or Ctrl+Enter).
6. Wait for the green **"Success. No rows returned"** message.

**Verify it worked:** left sidebar → **Table Editor** → you should see tables like `profiles`, `courses`, `lessons`, `exercises`, … (18 total).

> If you see a red error instead: copy the error message and send it to Muse — do NOT run the file a second time until the error is fixed.

## Step 2 — Make yourself admin

1. Go back to **SQL Editor → New query**.
2. Paste this (replace with YOUR signup email):
   ```sql
   update profiles set role = 'admin' where email = 'you@example.com';
   ```
   > Note: your profile row appears only AFTER you sign up on the site (Step 4). So do Step 4 first, then run this.
3. Press **Run**. It should say "Success".

**Verify:** Table Editor → `profiles` table → your row shows `role = admin`.

## Step 3 — Configure login redirect URLs

Without this, email-verification links break.

1. Left sidebar → **Authentication → URL Configuration**.
2. **Site URL**: set to `http://localhost:3000`
3. **Redirect URLs** → **Add URL**, add BOTH:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/**`
4. Click **Save**.
5. (Later, when the site is deployed, add your real domain here too, e.g. `https://nihongoverse.vercel.app/auth/callback`.)

## Step 4 — Create your account on the site

1. Run the site locally (`npm run dev`) and open `http://localhost:3000/signup`.
2. Sign up with your email + password.
3. Check your inbox for the Supabase verification email and click the link.
4. Log in at `http://localhost:3000/login` → you land on `/dashboard`.
5. Now do **Step 2** above to become admin, then visit `http://localhost:3000/admin`.

## Keys — where they live

| Key | Where | Shared with |
|---|---|---|
| Project URL + anon/publishable key | Dashboard → Project Settings → API | `.env.local` (safe — designed for browsers) |
| `service_role` key | Dashboard → Project Settings → API | **NOBODY. Never paste it anywhere.** The app never needs it in Phase 2. |

`.env.local` is git-ignored — it will never be committed to git.
