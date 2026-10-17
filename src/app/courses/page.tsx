import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { jlptLevels } from "@/data/levels";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "JLPT courses from N5 to N1 on NihongoVerse — honest build status for every level.",
};

/* /courses — lists every JLPT level with an honest status badge.
   Each section has an id (n5, n4, …) so footer links like /courses#n5 work. */

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="JLPT courses, N5 to N1"
        description="One clear ladder from your first hiragana to advanced Japanese. Every level below shows its honest build status — no fake 'coming soon' content pretending to exist."
      />

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
        {jlptLevels.map((level) => (
          <section key={level.id} id={level.id} className="scroll-mt-24">
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-extrabold text-ink">
                    {level.name}
                    <span className="ml-3 text-xl font-semibold text-faint">
                      {level.japanese}
                    </span>
                  </h2>
                  <p className="mt-1 font-display text-lg font-semibold text-sakura">
                    {level.tagline}
                  </p>
                </div>
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    level.status === "in-development"
                      ? "bg-amber-400/15 text-amber-300"
                      : "border border-line bg-white/5 text-muted"
                  }`}
                >
                  {level.status === "in-development" ? "🛠 " : "📋 "}
                  {level.statusLabel}
                </span>
              </div>

              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                {level.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {level.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-violet-glow/30 bg-violet-glow/10 px-3 py-1 text-sm text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                {level.status === "in-development" ? (
                  <p className="text-sm text-faint">
                    Lessons are being written now. Try the{" "}
                    <a href="/#sample-lesson" className="text-sakura underline">
                      free sample lesson
                    </a>{" "}
                    on the homepage meanwhile.
                  </p>
                ) : (
                  <p className="text-sm text-faint">
                    Planned for a later phase — after N5 and N4 are complete.
                  </p>
                )}
              </div>
            </Card>
          </section>
        ))}

        <Card className="border-dashed text-center">
          <h2 className="font-display text-2xl font-bold text-ink">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Absolute beginner? Start with Hiragana &amp; Katakana, then N5.
            Already know some Japanese? The N4 track will meet you there once
            lessons launch.
          </p>
          <Button href="/#sample-lesson" className="mt-6">
            Try the free sample lesson
          </Button>
        </Card>
      </div>
    </>
  );
}
