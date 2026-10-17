# NihongoVerse — Architecture

> "Learn Japanese. Live the Journey." — an anime-inspired Japanese learning
> platform for Indian JLPT learners, with Hinglish explanations.

## Stack (free-first)

```
┌─────────────────────────────────────────────────────────┐
│  Browser (Next.js App Router, React 19, TypeScript)     │
│  Tailwind CSS v4 · Framer Motion · next/font            │
├─────────────────────────────────────────────────────────┤
│  Vercel (Hobby free tier) — hosting + serverless        │
├─────────────────────────────────────────────────────────┤
│  Supabase (free tier) — PostgreSQL + Auth + RLS         │  ← Phase 2
│  Razorpay (test/sandbox free) — Indian payments         │  ← Phase 5
└─────────────────────────────────────────────────────────┘
```

**Why these:** Next.js gives us the site + API routes in one codebase
(TypeScript everywhere). Supabase gives us a real Postgres database and
email/password auth on its free tier. Vercel's Hobby tier hosts Next.js
for free. Razorpay is the standard for Indian (INR) payments and its
sandbox/test mode costs nothing.

**Production domain candidate:** `nihonpath.in` (already owned, on
Cloudflare). It will be connected to Vercel at deploy time (Phase 7) —
not before the app is ready.

## What Phase 1 built

- Next.js 16 + TypeScript + Tailwind v4 + ESLint scaffold (`src/` dir,
  `@/*` import alias, `package-lock.json` committed).
- `framer-motion` and `zod` installed (zod will be used for validation
  from Phase 2 onwards).
- Design system: dark-mode-only theme (midnight `#0B0918`, panels
  `#141126`, sakura `#FF9EBB`/`#F9A8D4`, violet `#8B5CF6`), Noto Sans JP +
  Outfit fonts, reduced-motion support, visible focus rings.
- Reusable components: `Button`, `Card`, `SectionHeading`, `PageHeader`,
  `Navbar` (working mobile menu), `Footer`, `SakuraParticles` (canvas
  petals, disabled on reduced-motion), `MascotImage`.
- Original anime teacher mascot (`public/mascot.png`) — generated, not
  copied from any existing anime.
- Landing page (`/`): animated hero, interactive JLPT level selector
  (N5–N1, honest statuses), scroll-animated roadmap, a **real working**
  hiragana quiz (あ行, multiple choice, instant feedback, score, restart),
  course cards, honestly-labelled features grid, Free-vs-Premium teaser
  (prices "To be announced"), working FAQ accordion.
- Real routes: `/courses` (with `#n5`…`#n1` anchors), `/pricing`,
  `/about`, `/contact` (mailto only — no fake form), `/privacy`, `/terms`,
  `/refund-policy` (honest drafts, no lorem ipsum).
- `.env.example` with safe placeholders only; `.gitignore` excludes
  `.env*`.

**Honesty rules enforced:** no testimonials, no student counts, no
invented prices, no fake login/payments, no buttons that do nothing.

## Plan for later phases

- **Phase 2 — Auth + database:** Supabase project, SQL migrations for all
  18 tables (profiles → support_requests), Row Level Security policies,
  Supabase Auth (email/password, verification, reset), profiles, protected
  routes (`/dashboard`, `/learn/[lessonId]`, `/admin/*`), server-side role
  checks.
- **Phase 3 — Learning content:** real N5/N4 lessons, kana practice,
  grammar + vocabulary + kanji, exercises (MCQ, fill-in-blank, ordering),
  quizzes, `lesson_progress` + `exercise_attempts` persistence.
- **Phase 4 — Classroom + dashboard:** anime classroom with Sakura-sensei,
  flashcards + spaced review (`review_history`), real dashboard (XP,
  streaks, accuracy, study time) with server-side anti-farming, rule-based
  lesson tutor (honestly labelled; real AI provider optional later).
- **Phase 5 — Payments:** Razorpay sandbox — server-created orders,
  signature verification, idempotent webhooks, `subscriptions` +
  `payment_records`, server-side entitlement checks. Live mode only after
  sandbox tests + account approval.
- **Phase 6 — Admin + polish:** server-protected admin panel (courses,
  lessons, users, payments, webhooks, support), accessibility audit,
  responsive pass, performance pass.
- **Phase 7 — Tests + deploy:** Vitest + Playwright (auth, quizzes,
  isolation, webhooks, access control), `next build`, Vercel deploy,
  `nihonpath.in` via Cloudflare, production verification.

## Costs

Everything used in Phase 1 is free (open-source + free tiers). Supabase
free tier, Vercel Hobby, and Razorpay test mode are all free; Razorpay
only charges per successful live transaction. No paid service has been
bought or is required for the next phases.
