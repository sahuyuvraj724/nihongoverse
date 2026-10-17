import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { requireUser, isAdminUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin" };

/* Next 16 rule: session padhne wala hissa <Suspense> ke andar.
   Server-side DOUBLE protection: login + role='admin'.
   Counts REAL tables se aate hain. */

function CountCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line/60 bg-panel/70 p-6">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 font-display text-4xl font-extrabold text-ink">{value}</p>
    </div>
  );
}

function AdminSkeleton() {
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

async function count(table: string): Promise<number> {
  const supabase = await createClient();
  const { count: c, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  // Table abhi bani hi nahi (migration run nahi hui) to 0 dikhao, crash nahi.
  if (error) return 0;
  return c ?? 0;
}

async function AdminContent() {
  const user = await requireUser("/admin");
  const admin = await isAdminUser(user.id);

  const promoteSql = `update profiles set role = 'admin' where email = '${user.email}';`;

  if (!admin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">
          🔒
        </p>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink">
          Access denied
        </h1>
        <p className="mt-3 text-muted">
          Ye page sirf admins ke liye hai. Agar tumhe admin hona chahiye tha, to
          Supabase SQL Editor me ye chalao:
        </p>
        <code className="mt-4 block rounded-xl border border-line/60 bg-midnight/60 p-4 text-left text-xs text-sakura">
          {promoteSql}
        </code>
        <p className="mt-6">
          <Link href="/dashboard" className="text-sakura hover:underline">
            ← Dashboard wapas jao
          </Link>
        </p>
      </div>
    );
  }

  const [users, courses, lessons, exercises] = await Promise.all([
    count("profiles"),
    count("courses"),
    count("lessons"),
    count("exercises"),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CountCard label="Total users" value={users} />
        <CountCard label="Courses" value={courses} />
        <CountCard label="Lessons" value={lessons} />
        <CountCard label="Exercises" value={exercises} />
      </div>

      <div className="mt-8 rounded-2xl border border-line/60 bg-panel/70 p-6">
        <h2 className="font-display text-lg font-bold text-ink">
          Phase 6 me yahan aayega
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>Courses, lessons, exercises ka create/edit/publish</li>
          <li>Users aur payments ki list</li>
          <li>Webhook status aur support requests</li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          Tab tak content seedha Supabase dashboard ke Table Editor se manage karo.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="管理者"
        title="Admin panel"
        description="Site ka control room. Content management Phase 6 me yahan aayega."
      />
      <Suspense fallback={<AdminSkeleton />}>
        <AdminContent />
      </Suspense>
    </>
  );
}
