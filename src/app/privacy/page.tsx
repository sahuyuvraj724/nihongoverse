import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "NihongoVerse privacy policy (draft).",
};

/* /privacy — brief honest draft. Full policy lands before launch. */

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Draft — the full policy will be published before the site launches with accounts."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Card>
          <div className="space-y-6 leading-relaxed text-muted">
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
              This is a draft. NihongoVerse is in Phase 1 and currently collects
              no personal data at all — there are no accounts, no analytics, and
              no cookies beyond what the hosting platform needs to serve the
              site.
            </p>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                What we collect today
              </h2>
              <p className="mt-2">
                Nothing you type on this site is stored anywhere. The sample
                quiz runs entirely in your browser — your answers never leave
                your device.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                What will change later
              </h2>
              <p className="mt-2">
                When accounts launch (Phase 2), we will store your email,
                learning progress, and preferences — only what is needed to run
                the service. When payments launch (Phase 5), payment processing
                will be handled by Razorpay; we will never store your card
                details.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Your rights
              </h2>
              <p className="mt-2">
                You will be able to export and delete your account data at any
                time once accounts exist. Until then, there is simply nothing
                of yours on our servers to export or delete.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Contact
              </h2>
              <p className="mt-2">
                Privacy questions:{" "}
                <a
                  href="mailto:hello@nihonpath.in?subject=Privacy%20question"
                  className="text-sakura underline"
                >
                  hello@nihonpath.in
                </a>
              </p>
            </section>

            <p className="text-sm text-faint">
              Last updated: October 2026. This draft will be replaced by a
              complete policy before launch.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
