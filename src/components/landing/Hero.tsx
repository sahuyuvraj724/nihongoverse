"use client";

import { motion } from "framer-motion";
import SakuraParticles from "@/components/SakuraParticles";
import MascotImage from "@/components/MascotImage";
import Button from "@/components/Button";

/* Landing hero: headline, subtext, CTAs, mascot + sakura canvas.
   "Start Free Learning" scrolls to the sample lesson below. */

export default function Hero() {
  return (
    <section className="bg-aurora relative overflow-hidden">
      <SakuraParticles />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-sakura/30 bg-sakura/10 px-4 py-1.5 text-sm font-medium text-sakura"
          >
            <span aria-hidden="true">🌸</span> 日本語を学ぼう — made for Indian learners
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Learn Japanese.
            <br />
            <span className="bg-gradient-to-r from-sakura to-violet-glow bg-clip-text text-transparent">
              Live the Journey.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            Anime-style JLPT courses from N5 to N1, with{" "}
            <span className="text-ink font-medium">Hinglish explanations</span>{" "}
            that finally make grammar click. Start free — no sign-up needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="#sample-lesson" size="lg">
              Start Free Learning
            </Button>
            <Button href="/courses" variant="secondary" size="lg">
              Explore Courses
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-sm text-faint"
          >
            N5 &amp; N4 lessons are in development — try the free sample below.
          </motion.p>
        </div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <MascotImage size={440} priority className="w-full max-w-md" />
        </motion.div>
      </div>
    </section>
  );
}
