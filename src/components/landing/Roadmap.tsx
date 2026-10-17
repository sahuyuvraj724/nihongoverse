"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

/* Animated learning roadmap: Kana → N5 → N4 → N3 → N2 → N1.
   Cards slide in as you scroll (whileInView). Statuses stay honest. */

const steps = [
  {
    id: "kana",
    title: "Hiragana & Katakana",
    jp: "かな",
    text: "Master the two phonetic scripts first — every lesson builds on them.",
    status: "First milestone",
    done: false,
  },
  {
    id: "n5",
    title: "JLPT N5",
    jp: "入門",
    text: "Foundations: basic grammar, ~800 words, your first real sentences.",
    status: "In development",
    done: false,
  },
  {
    id: "n4",
    title: "JLPT N4",
    jp: "初級",
    text: "Elementary: verb conjugations and everyday conversation skills.",
    status: "In development",
    done: false,
  },
  {
    id: "n3",
    title: "JLPT N3",
    jp: "中級",
    text: "Intermediate: the bridge to reading real Japanese media.",
    status: "Planned",
    done: false,
  },
  {
    id: "n2",
    title: "JLPT N2",
    jp: "中上級",
    text: "Upper-intermediate: business-ready Japanese.",
    status: "Planned",
    done: false,
  },
  {
    id: "n1",
    title: "JLPT N1",
    jp: "上級",
    text: "Advanced: near-native mastery of the language.",
    status: "Planned",
    done: false,
  },
];

export default function Roadmap() {
  return (
    <section className="border-y border-line/60 bg-panel/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow="Your path"
          title="The road from あ to N1"
          description="One clear path, six milestones. Scroll to walk it — each step unlocks the next."
        />

        <ol className="relative space-y-6 before:absolute before:left-[27px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-gradient-to-b before:from-sakura before:via-violet-glow before:to-line sm:before:left-[31px]">
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="relative flex gap-5 sm:gap-6"
            >
              {/* Node dot */}
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-glow/40 bg-midnight font-display text-lg font-bold text-sakura shadow-[0_0_24px_rgba(139,92,246,0.35)] sm:h-16 sm:w-16">
                {i + 1}
              </div>
              {/* Card */}
              <div className="flex-1 rounded-2xl border border-line bg-panel p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">
                    {step.title}
                    <span className="ml-2 text-base font-medium text-faint">
                      {step.jp}
                    </span>
                  </h3>
                  <span className="rounded-full bg-white/5 border border-line px-3 py-1 text-xs font-medium text-muted">
                    {step.status}
                  </span>
                </div>
                <p className="mt-2 text-muted">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
