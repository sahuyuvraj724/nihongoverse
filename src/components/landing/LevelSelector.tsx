"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jlptLevels } from "@/data/levels";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";

/* Interactive JLPT level selector.
   Clicking a level pill updates the detail panel below it.
   Statuses are honest: N5/N4 "In development", N3–N1 "Planned". */

export default function LevelSelector() {
  const [selected, setSelected] = useState("n5");
  const level = jlptLevels.find((l) => l.id === selected)!;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="Find your level"
        title="Where are you on your journey?"
        description="Pick a JLPT level to see what it covers and where it stands. We are building from N5 upwards — honestly."
      />

      {/* Level pills */}
      <div
        className="flex flex-wrap justify-center gap-3"
        role="tablist"
        aria-label="JLPT levels"
      >
        {jlptLevels.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={selected === l.id}
            onClick={() => setSelected(l.id)}
            className={`rounded-full px-6 py-3 font-display text-lg font-bold transition-all duration-200 cursor-pointer ${
              selected === l.id
                ? "bg-gradient-to-r from-sakura to-sakura-soft text-midnight shadow-[0_8px_30px_rgba(255,158,187,0.35)]"
                : "border border-line bg-panel text-muted hover:border-violet-glow/60 hover:text-ink"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="mx-auto mt-8 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-5xl font-extrabold text-ink">
                    {level.name}
                    <span className="ml-3 align-middle text-2xl font-semibold text-faint">
                      {level.japanese}
                    </span>
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-sakura">
                    {level.tagline}
                  </p>
                </div>
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    level.status === "in-development"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-white/5 text-muted border border-line"
                  }`}
                >
                  {level.status === "in-development" ? "🛠 " : "📋 "}
                  {level.statusLabel}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{level.description}</p>
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
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
