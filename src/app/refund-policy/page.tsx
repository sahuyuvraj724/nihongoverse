import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "NihongoVerse refund policy (draft).",
};

/* /refund-policy — brief honest draft. Finalised before payments go live. */

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Refund Policy"
        description="Draft — finalised before payments go live in Phase 5."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Card>
          <div className="space-y-6 leading-relaxed text-muted">
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
              This is a draft. No payments are accepted on this site today, so
              there is nothing to refund yet. The final policy below will apply
              once Premium plans launch.
            </p>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Planned policy
              </h2>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  Monthly Premium: cancel anytime; you keep access until the end
                  of the paid month.
                </li>
                <li>
                  Annual Premium: a full refund will be available within the
                  first 7 days of purchase, no questions asked.
                </li>
                <li>
                  Duplicate or accidental charges: contact us and we will fix
                  them promptly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                How to request a refund
              </h2>
              <p className="mt-2">
                Email{" "}
                <a
                  href="mailto:hello@nihonpath.in?subject=Refund%20request"
                  className="text-sakura underline"
                >
                  hello@nihonpath.in
                </a>{" "}
                from the email address on your account, with your order details.
                Refunds will be processed to the original payment method via
                Razorpay.
              </p>
            </section>

            <p className="text-sm text-faint">
              Last updated: October 2026. This draft will be replaced by the
              final policy before payments launch.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
