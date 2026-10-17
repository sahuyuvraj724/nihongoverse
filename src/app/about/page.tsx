import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import MascotImage from "@/components/MascotImage";

export const metadata: Metadata = {
  title: "About",
  description: "About NihongoVerse — a solo project by Yuvii, built with Muse AI.",
};

/* /about — short, honest about page. */

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="One learner, building for learners"
        description="NihongoVerse is a solo project — no big company, no fake team, no inflated claims."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              <strong className="text-ink">NihongoVerse</strong> —{" "}
              <em>“Learn Japanese. Live the Journey.”</em> — is being built by{" "}
              <strong className="text-ink">Yuvii</strong>, an Indian student
              learning Japanese himself and preparing for the JLPT.
            </p>
            <p>
              The idea is simple: most Japanese courses are either expensive,
              boring, or not made for Indian learners. NihongoVerse teaches
              with an anime-inspired classroom,{" "}
              <strong className="text-ink">Hinglish explanations</strong> that
              make grammar click, and a clear road from your first あ to N1.
            </p>
            <p>
              The site is being built in phases with the help of{" "}
              <strong className="text-ink">Muse AI</strong> — right now you are
              looking at Phase 1: the design, the landing page, and honest
              pages. Accounts, real lessons, progress tracking, and payments
              arrive in later phases.
            </p>
            <p>
              No fake testimonials. No invented student counts. Just a real
              project, built in the open, one phase at a time. 🌸
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/courses">Browse courses</Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md text-center">
              <MascotImage size={360} className="mx-auto w-full max-w-xs" />
              <h2 className="mt-6 font-display text-2xl font-bold text-ink">
                Sakura-sensei <span className="text-faint text-lg">桜先生</span>
              </h2>
              <p className="mt-2 text-muted">
                Our original anime teacher mascot. She will guide your lessons
                from Phase 4 onwards — for now, she waves hello from the
                homepage. 👋
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
