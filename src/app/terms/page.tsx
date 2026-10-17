import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "NihongoVerse terms of service (draft).",
};

/* /terms — brief honest draft. Full terms land before launch. */

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Draft — the full terms will be published before the site launches with accounts and payments."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Card>
          <div className="space-y-6 leading-relaxed text-muted">
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
              This is a draft. NihongoVerse is in Phase 1 — a public preview
              with free sample content and no accounts or payments.
            </p>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Using the site
              </h2>
              <p className="mt-2">
                You may browse all public pages and use the free sample lesson
                for personal, non-commercial learning. Please don&apos;t try to
                break the site, scrape it aggressively, or misrepresent it as
                your own work.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Content
              </h2>
              <p className="mt-2">
                Lessons, illustrations (including the Sakura-sensei mascot), and
                site text are original works of NihongoVerse. You may share
                short excerpts with credit; please don&apos;t republish full
                lessons elsewhere.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                No guarantees yet
              </h2>
              <p className="mt-2">
                This is an early preview. Pages, features, and course timelines
                may change as the project is built phase by phase. We describe
                build status honestly and will never charge you for something
                that doesn&apos;t exist.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">
                Accounts & payments (later)
              </h2>
              <p className="mt-2">
                Rules for accounts, subscriptions, and refunds will be added
                here before those features launch (Phases 2 and 5). Nothing on
                this site takes your money today.
              </p>
            </section>

            <p className="text-sm text-faint">
              Last updated: October 2026. This draft will be replaced by
              complete terms before launch.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}
