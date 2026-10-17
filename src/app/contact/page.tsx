import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the NihongoVerse team by email.",
};

/* /contact — no fake form. A real mailto link that opens the visitor's
   email app, clearly labelled as such. */

const CONTACT_EMAIL = "hello@nihonpath.in";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello 👋"
        description="Questions, feedback, or just want to say ganbatte? We read every message."
      />

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Card className="text-center">
          <p className="text-5xl" aria-hidden="true">
            ✉️
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">
            Email us
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            There is no contact form yet — clicking the button below opens{" "}
            <strong className="text-ink">your own email app</strong> with a new
            message addressed to us. Nothing is submitted on this site.
          </p>
          <Button
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello from a NihongoVerse visitor!")}`}
            className="mt-6"
          >
            Open my email app
          </Button>
          <p className="mt-4 text-sm text-faint">
            Or write directly to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sakura underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Card>

        <Card className="mt-6">
          <h2 className="font-display text-lg font-bold text-ink">
            What to include
          </h2>
          <ul className="mt-3 space-y-2 text-muted">
            <li>• Your JLPT level (or “absolute beginner” — totally fine!)</li>
            <li>• What you want NihongoVerse to teach first</li>
            <li>• Any bug you spotted on this site</li>
          </ul>
          <p className="mt-4 text-sm text-faint">
            We usually reply within a few days. Please don&apos;t send passwords
            or payment details by email — we will never ask for them.
          </p>
        </Card>
      </div>
    </>
  );
}
