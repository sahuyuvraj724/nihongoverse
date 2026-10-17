import Link from "next/link";
import Hero from "@/components/landing/Hero";
import LevelSelector from "@/components/landing/LevelSelector";
import Roadmap from "@/components/landing/Roadmap";
import SampleQuiz from "@/components/landing/SampleQuiz";
import Faq from "@/components/landing/Faq";
import Card from "@/components/Card";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { jlptLevels } from "@/data/levels";

/* Landing page: hero → level selector → roadmap → sample quiz →
   course cards → features → pricing teaser → FAQ.
   No testimonials, no student counts, no invented stats. */

const features = [
  {
    icon: "📖",
    title: "Interactive lessons",
    text: "Grammar, vocabulary and kanji taught step by step, with examples you actually remember.",
    tag: "In development",
  },
  {
    icon: "🗣️",
    title: "Hinglish explanations",
    text: "Tricky concepts explained in Hindi + English mix — built for Indian learners.",
    tag: "In development",
  },
  {
    icon: "🃏",
    title: "Flashcards & spaced review",
    text: "Smart revision scheduling so words stick long-term.",
    tag: "Phase 4",
  },
  {
    icon: "🏫",
    title: "Anime classroom",
    text: "Learn with Sakura-sensei, our original anime teacher, in an animated classroom.",
    tag: "Phase 4",
  },
  {
    icon: "📊",
    title: "Progress dashboard & XP",
    text: "Streaks, XP, achievements and a real dashboard of your learning.",
    tag: "Phase 4",
  },
  {
    icon: "🤖",
    title: "Lesson tutor",
    text: "A rule-based tutor that answers from your current lesson. Real AI comes later — honestly labelled.",
    tag: "Later phase",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <LevelSelector />
      <Roadmap />
      <SampleQuiz />

      {/* Course cards */}
      <section className="border-y border-line/60 bg-panel/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            eyebrow="Courses"
            title="JLPT courses, N5 to N1"
            description="The full ladder from your first あ to advanced mastery."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jlptLevels.map((level) => (
              <Link key={level.id} href="/courses" className="block h-full">
                <Card hover className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <p className="font-display text-4xl font-extrabold text-ink">
                      {level.name}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        level.status === "in-development"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-white/5 text-muted border border-line"
                      }`}
                    >
                      {level.statusLabel}
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-sakura">{level.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {level.description}
                  </p>
                  <span className="mt-4 font-display text-sm font-semibold text-violet-glow">
                    View course →
                  </span>
                </Card>
              </Link>
            ))}
            {/* 6th card: view all */}
            <Link href="/courses" className="block h-full">
              <Card
                hover
                className="flex h-full flex-col items-center justify-center border-dashed text-center"
              >
                <p className="font-display text-2xl font-bold text-ink">
                  See all courses
                </p>
                <p className="mt-2 text-sm text-muted">
                  Compare levels, topics and honest build status.
                </p>
                <span className="mt-4 font-display text-sm font-semibold text-sakura">
                  Browse →
                </span>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow="Features"
          title="Built for how you actually learn"
          description="Every feature below is labelled honestly — what's being built now, and what lands in later phases."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <p className="text-3xl" aria-hidden="true">
                {f.icon}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-ink">
                  {f.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              <span className="mt-4 inline-block rounded-full bg-white/5 border border-line px-3 py-1 text-xs font-medium text-faint">
                {f.tag}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="border-y border-line/60 bg-panel/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            eyebrow="Pricing"
            title="Free to start, fair when we grow"
            description="Core learning stays free. Premium plans arrive later — prices will be announced before anything costs money."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="flex flex-col">
              <h3 className="font-display text-2xl font-bold text-ink">Free</h3>
              <p className="mt-1 text-4xl font-extrabold text-ink font-display">
                ₹0
                <span className="text-base font-medium text-muted"> forever</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-muted">
                {[
                  "Sample lessons & quizzes",
                  "Hiragana & Katakana practice",
                  "Hinglish explanations",
                  "Community access",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-300" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/pricing" variant="secondary" className="mt-8">
                See full pricing
              </Button>
            </Card>
            <Card className="relative flex flex-col border-sakura/40">
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-sakura to-sakura-soft px-4 py-1 text-xs font-bold text-midnight">
                COMING LATER
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">Premium</h3>
              <p className="mt-1 text-4xl font-extrabold text-ink font-display">
                TBA
                <span className="text-base font-medium text-muted"> — to be announced</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-muted">
                {[
                  "Everything in Free",
                  "Full N5–N1 lesson library",
                  "Flashcards & spaced review",
                  "Progress dashboard, XP & streaks",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-sakura" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/pricing" className="mt-8">
                See full pricing
              </Button>
            </Card>
          </div>
          <p className="mt-6 text-center text-sm text-faint">
            No prices are final yet — and no payment system exists in this
            phase. Razorpay sandbox integration arrives in Phase 5.
          </p>
        </div>
      </section>

      <Faq />
    </>
  );
}
