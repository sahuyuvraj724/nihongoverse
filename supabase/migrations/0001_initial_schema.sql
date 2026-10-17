-- ============================================================
-- NihongoVerse — Phase 2: initial database schema
-- ============================================================
-- HOW TO APPLY (the only step you do by hand):
--   1. Open your Supabase Dashboard → SQL Editor → "New query"
--   2. Paste this ENTIRE file into the editor
--   3. Press "Run" and wait for "Success. No rows returned"
-- Run it ONCE on a fresh project. Do not run it twice.
--
-- WHAT THIS CREATES:
--   • 18 tables (profiles, courses, modules, lessons, exercises,
--     exercise_attempts, lesson_progress, vocabulary, kanji,
--     flashcards, review_history, study_sessions, achievements,
--     user_achievements, subscriptions, payment_records,
--     webhook_events, support_requests)
--   • Row Level Security (RLS) on EVERY table
--   • A trigger that auto-creates a profile row on signup
--   • A trigger that stops users from making themselves admin
--
-- MAKE YOURSELF ADMIN (after running this file):
--   update profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================

-- ---------- Helper: is this user an admin? ----------
-- SECURITY DEFINER = runs with full rights, bypasses RLS,
-- so it never gets stuck in an infinite policy loop.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- Helper: keep updated_at fresh ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Helper: stop users promoting themselves ----------
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
as $$
begin
  -- If the role column is being changed, only an admin may do it.
  -- (You, the owner, change it with the UPDATE above via SQL Editor.)
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'You are not allowed to change your role.';
  end if;
  return new;
end;
$$;

-- ---------- Helper: auto-create profile on signup ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

-- ============================================================
-- TABLES
-- ============================================================

-- One row per user. id matches auth.users.id.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  current_level text not null default 'N5' check (current_level in ('N5','N4','N3','N2','N1')),
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null,
  title text not null,
  position integer not null default 0,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  -- The lesson body (explanation, examples, Hinglish notes) lives here as JSON.
  content_json jsonb not null default '{}'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, slug)
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  type text not null check (type in ('mcq','fill_blank','ordering','listening')),
  question text not null,
  -- For mcq: ["option A","option B",...]. For ordering: the shuffled words.
  options jsonb,
  -- The correct answer in a type-specific shape, e.g. {"index": 1}.
  answer_json jsonb not null,
  explanation text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  is_correct boolean not null,
  xp_earned integer not null default 0 check (xp_earned >= 0),
  created_at timestamptz not null default now()
);
create index if not exists idx_attempts_user on public.exercise_attempts(user_id);
create index if not exists idx_attempts_exercise on public.exercise_attempts(exercise_id);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  xp_earned integer not null default 0 check (xp_earned >= 0),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
create index if not exists idx_progress_user on public.lesson_progress(user_id);

create table if not exists public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete set null,
  word text not null,                 -- Japanese, e.g. 食べる
  reading text,                       -- e.g. たべる
  meaning_en text not null,
  meaning_hinglish text,              -- Hinglish explanation for Indian learners
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_vocab_level on public.vocabulary(level);

create table if not exists public.kanji (
  id uuid primary key default gen_random_uuid(),
  character text not null unique,     -- e.g. 日
  onyomi text,                        -- e.g. ニチ
  kunyomi text,                       -- e.g. ひ
  meaning_en text not null,
  meaning_hinglish text,
  level text not null check (level in ('N5','N4','N3','N2','N1')),
  stroke_count integer check (stroke_count > 0),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_kanji_level on public.kanji(level);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  front text not null,
  back text not null,
  deck text not null default 'vocabulary',
  -- Simple spaced-repetition scheduling (Phase 4 fills the algorithm).
  next_review_at timestamptz not null default now(),
  interval_days integer not null default 1 check (interval_days >= 0),
  ease real not null default 2.5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_flashcards_user_review on public.flashcards(user_id, next_review_at);

create table if not exists public.review_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  flashcard_id uuid not null references public.flashcards(id) on delete cascade,
  quality integer not null check (quality between 0 and 5),
  reviewed_at timestamptz not null default now()
);
create index if not exists idx_review_user on public.review_history(user_id);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  minutes integer check (minutes >= 0),
  xp_earned integer not null default 0 check (xp_earned >= 0)
);
create index if not exists idx_sessions_user on public.study_sessions(user_id);

-- Catalog of achievements (readable by everyone).
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  icon text,
  xp_reward integer not null default 0 check (xp_reward >= 0)
);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

-- One row per user. Only the server (Phase 5) writes plan/status.
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','monthly','annual')),
  status text not null default 'active'
    check (status in ('active','cancelled','expired','past_due')),
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Money records. Users can NEVER touch these directly —
-- only the server (service_role key, Phase 5) writes them.
create table if not exists public.payment_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  provider text not null default 'razorpay',
  order_id text,
  payment_id text,
  amount integer check (amount >= 0),   -- smallest currency unit (paise)
  currency text not null default 'INR',
  status text not null default 'created'
    check (status in ('created','paid','failed','refunded','cancelled')),
  raw_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_payments_user on public.payment_records(user_id);

-- Raw webhook deliveries for safe reconciliation (Phase 5).
create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null unique,
  event_type text,
  payload jsonb,
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  subject text not null,
  message text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_support_user on public.support_requests(user_id);

-- ---------- updated_at triggers ----------
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','courses','modules','lessons','exercises',
    'lesson_progress','vocabulary','kanji','flashcards',
    'subscriptions','payment_records','support_requests'
  ] loop
    execute format(
      'drop trigger if exists trg_%I_updated on public.%I; ' ||
      'create trigger trg_%I_updated before update on public.%I ' ||
      'for each row execute function public.set_updated_at();',
      t, t, t, t
    );
  end loop;
end $$;

-- ---------- profile auto-create + role protection triggers ----------
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop trigger if exists no_self_promote on public.profiles;
create trigger no_self_promote
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();

-- ============================================================
-- ROW LEVEL SECURITY — enabled on EVERY table
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','courses','modules','lessons','exercises',
    'exercise_attempts','lesson_progress','vocabulary','kanji',
    'flashcards','review_history','study_sessions','achievements',
    'user_achievements','subscriptions','payment_records',
    'webhook_events','support_requests'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;

-- ---------- Public content catalogs ----------
-- Published rows are readable by EVERYONE (even logged-out visitors).
-- Drafts are visible only to admins. Only admins can write.

do $$
declare t text;
begin
  foreach t in array array[
    'courses','modules','lessons','exercises',
    'vocabulary','kanji','achievements'
  ] loop
    execute format('drop policy if exists public_read_published on public.%I;', t);
    execute format(
      'create policy public_read_published on public.%I ' ||
      'for select to anon, authenticated using (status = ''published'');', t);
    execute format('drop policy if exists admin_all on public.%I;', t);
    execute format(
      'create policy admin_all on public.%I ' ||
      'for all to authenticated using (public.is_admin()) ' ||
      'with check (public.is_admin());', t);
  end loop;
end $$;
-- Note: achievements has no `status` column, so fix its policy:
drop policy if exists public_read_published on public.achievements;
create policy public_read_published on public.achievements
  for select to anon, authenticated using (true);

-- ---------- Private learning data: users see ONLY their own rows ----------
do $$
declare t text;
begin
  foreach t in array array[
    'exercise_attempts','lesson_progress','flashcards',
    'review_history','study_sessions','user_achievements','support_requests'
  ] loop
    execute format('drop policy if exists own_rows on public.%I;', t);
    execute format(
      'create policy own_rows on public.%I ' ||
      'for all to authenticated ' ||
      'using (auth.uid() = user_id) with check (auth.uid() = user_id);', t);
    execute format('drop policy if exists admin_all on public.%I;', t);
    execute format(
      'create policy admin_all on public.%I ' ||
      'for all to authenticated using (public.is_admin()) ' ||
      'with check (public.is_admin());', t);
  end loop;
end $$;

-- ---------- profiles ----------
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (auth.uid() = id or public.is_admin());

-- Users may update their OWN row, but the no_self_promote trigger
-- blocks any change to the `role` column for non-admins.
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists admin_all on public.profiles;
create policy admin_all on public.profiles
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
-- (No INSERT policy: the handle_new_user trigger creates the row.)

-- ---------- subscriptions ----------
-- Users can READ their own subscription. They can never write it —
-- only the payment server (service_role, Phase 5) does that.
drop policy if exists subscriptions_select_own on public.subscriptions;
create policy subscriptions_select_own on public.subscriptions
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists admin_all on public.subscriptions;
create policy admin_all on public.subscriptions
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- payment_records & webhook_events ----------
-- NO policies for normal users at all: only the server (service_role
-- bypasses RLS) and admins (read-only) can touch these.
drop policy if exists admin_read_payments on public.payment_records;
create policy admin_read_payments on public.payment_records
  for select to authenticated using (public.is_admin());

drop policy if exists admin_read_webhooks on public.webhook_events;
create policy admin_read_webhooks on public.webhook_events
  for select to authenticated using (public.is_admin());

-- ============================================================
-- DONE. Now run, as the project owner:
--   update profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================
