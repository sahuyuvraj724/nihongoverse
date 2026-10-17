import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import { DisplayNameForm, PasswordForm } from "@/components/settings/SettingsForms";
import { requireUser, getProfile } from "@/lib/auth";

export const metadata = { title: "Settings" };

/* Next 16 rule: session padhne wala hissa <Suspense> ke andar. */

function SettingsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="h-64 animate-pulse rounded-2xl border border-line/60 bg-panel/70" />
    </div>
  );
}

async function SettingsContent() {
  const user = await requireUser("/settings");
  const profile = await getProfile(user.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-line/60 bg-panel/70 p-6">
        <h2 className="font-display text-lg font-bold text-ink">Account</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Email</dt>
            <dd className="text-ink">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Role</dt>
            <dd className="text-ink">{profile?.role ?? "student"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Member since</dt>
            <dd className="text-ink">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("en-IN")
                : "—"}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted">
          Email change abhi Phase 3 me aayega. Tab tak yehi email rahega.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-line/60 bg-panel/70 p-6">
        <DisplayNameForm initialName={profile?.display_name ?? ""} />
      </div>

      <div className="mt-6 rounded-2xl border border-line/60 bg-panel/70 p-6">
        <PasswordForm />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="設定"
        title="Settings"
        description="Apna profile yahan se manage karo."
      />
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </>
  );
}
