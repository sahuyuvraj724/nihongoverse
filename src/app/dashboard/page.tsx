import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import { requireUser, getProfile } from "@/lib/auth";

export const metadata = { title: "Dashboard" };

/* Next 16 (Cache Components) rule: jo component login cookie padhta hai,
   wo <Suspense> ke andar hona chahiye. Bahar ka shell static prerender
   hota hai, andar ka content request par load hota hai. */

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-panel/70 p-6">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 font-display text-4xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-line/60 bg-panel/70"
          />
        ))}
      </div>
    </div>
  );
}

/* Server-side protected: login nahi hai to /login par redirect.
   Saare numbers REAL profiles row se. Naye users ko honest empty state. */
async function DashboardContent() {
  const user = await requireUser("/dashboard");
  const profile = await getProfile(user.id);

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">
          Profile abhi ready nahi hui
        </h1>
        <p className="mt-3 text-muted">
          Signup to ho gaya, lekin profile row database me nahi bani. SQL migration
          run ki hai na? docs/SUPABASE_SETUP.md ka Step 1 check karo.
        </p>
      </div>
    );
  }

  const name = profile.display_name || user.email?.split("@")[0] || "Student";
  const isNew = profile.xp === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-2xl font-bold text-ink">
        Konnichiwa, {name}! 👋
      </h2>
      <p className="mt-2 text-muted">
        Yahan tumhari asli progress dikhegi — lessons, XP, streak, sab kuch database se.
      </p>

      {isNew && (
        <div className="mb-8 mt-6 rounded-2xl border border-sakura/30 bg-sakura/5 p-6">
          <p className="font-display text-lg font-bold text-ink">
            🌱 Abhi tumne koi lesson complete nahi kiya — koi baat nahi!
          </p>
          <p className="mt-2 text-muted">
            Jaise hi tum lessons complete karoge, yahan XP, streak aur progress
            dikhne lagega. Shuruaat yahan se karo:
          </p>
          <div className="mt-4">
            <Button href="/courses" size="sm">
              Courses dekho
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total XP" value={String(profile.xp)} hint="Lessons se kamaya hua" />
        <StatCard label="Day streak" value={String(profile.streak)} hint="Lagatar padhai ke din" />
        <StatCard
          label="Current level"
          value={profile.current_level ?? "N5"}
          hint="Tumhara JLPT target"
        />
        <StatCard label="Role" value={profile.role} hint="Student ya admin" />
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        📚 Asli lessons Phase 3 me aa rahe hain — tab ye dashboard jee uthega!
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="ダッシュボード"
        title="Dashboard"
        description="Tumhari learning journey ka control room."
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
