import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Subscription } from "@/lib/database.types";

export const metadata = { title: "Billing" };

/* Next 16 rule: session padhne wala hissa <Suspense> ke andar.
   REAL subscription row dikhti hai; premium Phase 5 me aayega — koi fake nahi. */

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="h-64 animate-pulse rounded-2xl border border-line/60 bg-panel/70" />
    </div>
  );
}

async function BillingContent() {
  const user = await requireUser("/billing");
  const supabase = await createClient();

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();
  const subscription = data as Subscription | null;

  const plan = subscription?.plan ?? "free";
  const isPremium = plan !== "free" && subscription?.status === "active";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-line/60 bg-panel/70 p-8 text-center">
        <p className="text-sm font-medium text-muted">Current plan</p>
        <p className="mt-2 font-display text-4xl font-extrabold text-ink">
          {isPremium ? (
            <>
              Premium{" "}
              <span className="text-sakura">
                ({plan === "annual" ? "Annual" : "Monthly"})
              </span>
            </>
          ) : (
            <>Free 🌱</>
          )}
        </p>
        {subscription?.current_period_end && isPremium && (
          <p className="mt-2 text-sm text-muted">
            Valid till{" "}
            {new Date(subscription.current_period_end).toLocaleDateString("en-IN")}
          </p>
        )}
        {!isPremium && (
          <>
            <p className="mt-4 text-muted">
              Premium plans <strong>Phase 5</strong> me launch honge — monthly aur
              annual, Razorpay se secure payment ke saath. Abhi Free plan par
              saari basic cheezein milengi.
            </p>
            <div className="mt-6">
              <Button href="/pricing" variant="secondary">
                Pricing dekho
              </Button>
            </div>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Payment history bhi Phase 5 me yahan dikhegi. Koi sawal ho to{" "}
        <Link href="/contact" className="text-sakura hover:underline">
          contact karo
        </Link>
        .
      </p>
    </div>
  );
}

export default function BillingPage() {
  return (
    <>
      <PageHeader
        eyebrow="請求"
        title="Billing"
        description="Tumhara plan aur payment status."
      />
      <Suspense fallback={<BillingSkeleton />}>
        <BillingContent />
      </Suspense>
    </>
  );
}
