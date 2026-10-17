import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "NihongoVerse pricing — free tier now, premium plans announced honestly before launch.",
};

/* /pricing — Free / Monthly Premium / Annual Premium.
   Prices are NOT invented: premium prices are marked "To be announced".
   No payment system exists in Phase 1; Razorpay sandbox lands in Phase 5. */

const freeFeatures = [
  "Sample lessons & quizzes",
  "Hiragana & Katakana practice",
  "Hinglish explanations",
  "Community access",
];

const premiumFeatures = [
  "Everything in Free",
  "Full N5–N1 lesson library (as released)",
  "Flashcards & spaced review",
  "Progress dashboard, XP & streaks",
  "Anime classroom with Sakura-sensei",
  "Priority support",
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, honest pricing"
        description="Start free. Premium plans arrive in a later phase — prices will be announced before anything costs money, and nothing here takes your payment today."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free */}
          <Card className="flex flex-col">
            <h2 className="font-display text-xl font-bold text-ink">Free</h2>
            <p className="mt-2 font-display text-4xl font-extrabold text-ink">
              ₹0
            </p>
            <p className="mt-1 text-sm text-muted">Free tier, always available</p>
            <ul className="mt-6 flex-1 space-y-3 text-muted">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-emerald-300" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/#sample-lesson" variant="secondary" className="mt-8">
              Start learning free
            </Button>
          </Card>

          {/* Monthly Premium */}
          <Card className="relative flex flex-col border-sakura/40">
            <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-sakura to-sakura-soft px-4 py-1 text-xs font-bold text-midnight">
              COMING LATER
            </span>
            <h2 className="font-display text-xl font-bold text-ink">
              Premium <span className="text-sm font-medium text-muted">/ monthly</span>
            </h2>
            <p className="mt-2 font-display text-4xl font-extrabold text-ink">
              TBA
            </p>
            <p className="mt-1 text-sm text-muted">Price to be announced</p>
            <ul className="mt-6 flex-1 space-y-3 text-muted">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-sakura" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="secondary" className="mt-8">
              Notify me at launch
            </Button>
          </Card>

          {/* Annual Premium */}
          <Card className="relative flex flex-col">
            <span className="absolute -top-3 left-6 rounded-full border border-line bg-panel-2 px-4 py-1 text-xs font-bold text-muted">
              COMING LATER
            </span>
            <h2 className="font-display text-xl font-bold text-ink">
              Premium <span className="text-sm font-medium text-muted">/ annual</span>
            </h2>
            <p className="mt-2 font-display text-4xl font-extrabold text-ink">
              TBA
            </p>
            <p className="mt-1 text-sm text-muted">Price to be announced</p>
            <ul className="mt-6 flex-1 space-y-3 text-muted">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-violet-glow" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl bg-white/5 p-4 text-sm text-faint">
              Annual billing details will be published with the price
              announcement — no charges before then.
            </p>
          </Card>
        </div>

        {/* Honest notes */}
        <Card className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">
            What you should know
          </h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-muted">
            <li>
              <strong className="text-ink">No payments today.</strong> There is
              no checkout, no card form, and no charge anywhere on this site in
              Phase 1.
            </li>
            <li>
              <strong className="text-ink">Razorpay sandbox in Phase 5.</strong>{" "}
              Indian payments will be integrated and tested in sandbox mode
              before anything goes live.
            </li>
            <li>
              <strong className="text-ink">Prices are placeholders.</strong> The
              owner sets final amounts before launch — we will never invent a
              price and charge it silently.
            </li>
            <li>
              <strong className="text-ink">Refunds.</strong> The refund policy
              will be finalised before payments go live. See the{" "}
              <a href="/refund-policy" className="text-sakura underline">
                draft refund policy
              </a>
              .
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}
