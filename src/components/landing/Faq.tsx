"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

/* FAQ accordion — honest answers, no invented claims. */

const faqs = [
  {
    q: "Is NihongoVerse free?",
    a: "Yes — the core lessons will always have a free tier, and the sample lesson above is free with no sign-up. Premium plans with extra features will arrive in a later phase; prices will be announced honestly before anything costs money.",
  },
  {
    q: "Do I need to know any Japanese to start?",
    a: "No. The N5 track starts from absolute zero — Hiragana and Katakana first, then basic grammar and vocabulary step by step.",
  },
  {
    q: "What are Hinglish explanations?",
    a: "Tricky grammar points explained in a Hindi + English mix, the way Indian students actually think. For example: は (wa) is a topic marker — matlab, 'as for X…' wala concept.",
  },
  {
    q: "When will the full N5 course be ready?",
    a: "N5 and N4 lessons are in development right now. This site is being built in phases — content, accounts, and progress tracking land in Phases 2–4.",
  },
  {
    q: "Is there a mobile app?",
    a: "Not yet. The website is designed mobile-first, so it works well in your phone's browser. A dedicated app is a possible later step, not a Phase 1 promise.",
  },
  {
    q: "Who is building NihongoVerse?",
    a: "A solo project by Yuvii, an Indian student learning Japanese himself, built with the help of Muse AI. No big company, no fake team — just one learner building the tool he wished existed.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="Questions"
        title="Frequently asked questions"
        description="Straight answers — no marketing fluff."
      />

      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-violet-glow/50 bg-panel" : "border-line bg-panel/60"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
              >
                <span className="font-display text-lg font-semibold text-ink">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-glow/15 text-xl text-sakura"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
