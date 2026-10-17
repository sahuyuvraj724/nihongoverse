import type { ReactNode } from "react";

/* Centered card shell used by signup / login / password pages.
   Matches the Phase 1 midnight + sakura design system. */

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-line/60 bg-panel/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="mb-6 text-center">
          <span
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-glow to-sakura font-display text-2xl font-bold text-midnight"
            aria-hidden="true"
          >
            桜
          </span>
          <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

/* Shared Tailwind classes for auth inputs + error box. */
export const inputClass =
  "w-full rounded-xl border border-line/70 bg-midnight/60 px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition focus:border-sakura focus:ring-2 focus:ring-sakura/30";

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
    >
      {message}
    </div>
  );
}

export function FormSuccess({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
    >
      {message}
    </div>
  );
}
