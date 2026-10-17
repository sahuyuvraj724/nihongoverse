"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

/* Interactive sample lesson: a REAL hiragana quiz.
   - Shows one kana at a time (あ い う え お), shuffled.
   - 4 romaji choices per question, shuffled.
   - Instant right/wrong feedback, score at the end, restart button.
   - All state lives in the browser; nothing is sent anywhere. */

type Kana = { kana: string; romaji: string };

const KANA: Kana[] = [
  { kana: "あ", romaji: "a" },
  { kana: "い", romaji: "i" },
  { kana: "う", romaji: "u" },
  { kana: "え", romaji: "e" },
  { kana: "お", romaji: "o" },
];

type Question = Kana & { options: string[] };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(): Question[] {
  return shuffle(KANA).map((item) => {
    const distractors = shuffle(
      KANA.filter((k) => k.kana !== item.kana).map((k) => k.romaji)
    ).slice(0, 3);
    return { ...item, options: shuffle([item.romaji, ...distractors]) };
  });
}

export default function SampleQuiz() {
  // Questions are built after mount (in useEffect), because Math.random()
  // is not allowed during Next.js static prerendering.
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Questions are built after mount (in useEffect), because Math.random()
  // is not allowed during Next.js static prerendering.
  // The eslint-disable below is intentional: this effect runs once on mount,
  // sets state exactly once, and cannot cascade.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestions(buildQuestions());
  }, []);

  const q = questions ? questions[index] : null;
  const isLast = questions ? index === questions.length - 1 : false;

  const pick = (romaji: string) => {
    if (picked !== null || !q) return; // lock answer once picked
    setPicked(romaji);
    if (romaji === q.romaji) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setQuestions(buildQuestions()); // event handler — allowed here
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const total = questions?.length ?? KANA.length;
  const resultMessage =
    score === total
      ? "Perfect! すごい！ You are ready for the full N5 kana course."
      : score >= 3
        ? "Nice work! A little more practice and あ行 is yours."
        : "Good first try! Tap restart and give it another go — repetition is the secret.";

  return (
    <section id="sample-lesson" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading
        eyebrow="Try it now"
        title="Sample lesson: あ行 (the A-row)"
        description="A real mini-quiz from the upcoming N5 kana course. Pick the correct romaji for each hiragana — instant feedback included."
      />

      <div className="mx-auto max-w-xl">
        <Card>
          <AnimatePresence mode="wait">
            {!questions ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <p className="text-5xl" aria-hidden="true">
                  🌸
                </p>
                <p className="mt-4 text-muted">Preparing your quiz…</p>
              </motion.div>
            ) : !done && q ? (
              <motion.div
                key={`q-${index}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress */}
                <div className="mb-6 flex items-center justify-between text-sm">
                  <span className="font-medium text-muted">
                    Question {index + 1} of {questions.length}
                  </span>
                  <span className="font-display font-bold text-sakura">
                    Score: {score}
                  </span>
                </div>
                <div
                  className="mb-8 h-2 overflow-hidden rounded-full bg-white/5"
                  role="progressbar"
                  aria-valuenow={index + 1}
                  aria-valuemin={1}
                  aria-valuemax={questions.length}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sakura to-violet-glow transition-all duration-300"
                    style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Kana card */}
                <p className="text-center text-sm text-faint">
                  What is the romaji for this hiragana?
                </p>
                <p
                  className="my-6 text-center font-display text-8xl font-bold text-ink"
                  lang="ja"
                >
                  {q.kana}
                </p>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isCorrect = opt === q.romaji;
                    const isPicked = opt === picked;
                    let cls =
                      "border-line bg-panel-2 text-ink hover:border-violet-glow/70 hover:bg-violet-glow/10";
                    if (picked !== null) {
                      if (isCorrect)
                        cls = "border-emerald-400 bg-emerald-400/15 text-emerald-300";
                      else if (isPicked)
                        cls = "border-rose-400 bg-rose-400/15 text-rose-300";
                      else cls = "border-line bg-panel-2 text-faint opacity-60";
                    }
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => pick(opt)}
                        disabled={picked !== null}
                        className={`rounded-xl border-2 px-4 py-4 font-display text-2xl font-bold transition-all duration-200 ${picked === null ? "cursor-pointer" : "cursor-default"} ${cls}`}
                        aria-label={`Answer ${opt}`}
                      >
                        {opt}
                        {picked !== null && isCorrect && " ✓"}
                        {picked !== null && isPicked && !isCorrect && " ✗"}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback + next */}
                <div className="mt-6 min-h-[3.5rem] text-center">
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p
                        className={`font-medium ${picked === q.romaji ? "text-emerald-300" : "text-rose-300"}`}
                      >
                        {picked === q.romaji
                          ? "Correct! せいかい！"
                          : `Not quite — ${q.kana} is “${q.romaji}”.`}
                      </p>
                      <Button onClick={next} size="sm" className="mt-3">
                        {isLast ? "See my score" : "Next question →"}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <p className="text-6xl" aria-hidden="true">
                  {score === questions.length ? "🏆" : score >= 3 ? "🌸" : "💪"}
                </p>
                <h3 className="mt-4 font-display text-3xl font-bold text-ink">
                  {score} / {questions.length}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-muted">{resultMessage}</p>
                <Button onClick={restart} className="mt-6">
                  Try again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
        <p className="mt-4 text-center text-xs text-faint">
          This is a sample — full kana courses with progress saving arrive in
          Phase 3.
        </p>
      </div>
    </section>
  );
}
