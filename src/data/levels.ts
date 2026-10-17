/* Shared JLPT level catalogue.
   Statuses are honest: nothing here pretends to be finished.
   "in-development" = lessons are being written now.
   "planned" = scheduled for a later phase, no content yet. */

export type LevelStatus = "in-development" | "planned";

export type JlptLevel = {
  id: "n5" | "n4" | "n3" | "n2" | "n1";
  name: string;
  japanese: string;
  tagline: string;
  description: string;
  topics: string[];
  status: LevelStatus;
  statusLabel: string;
};

export const jlptLevels: JlptLevel[] = [
  {
    id: "n5",
    name: "N5",
    japanese: "入門",
    tagline: "Foundations — start from zero",
    description:
      "Hiragana, Katakana, basic grammar, and your first ~800 words of vocabulary. Perfect if you are starting Japanese from scratch.",
    topics: ["Hiragana & Katakana", "Basic grammar", "~800 words", "~100 kanji"],
    status: "in-development",
    statusLabel: "In development",
  },
  {
    id: "n4",
    name: "N4",
    japanese: "初級",
    tagline: "Elementary — hold simple conversations",
    description:
      "Everyday grammar, verb conjugations, and ~1,500 words of vocabulary so you can handle daily conversations in Japan.",
    topics: ["Verb conjugations", "Keigo basics", "~1,500 words", "~300 kanji"],
    status: "in-development",
    statusLabel: "In development",
  },
  {
    id: "n3",
    name: "N3",
    japanese: "中級",
    tagline: "Intermediate — the bridge level",
    description:
      "The bridge between beginner and advanced Japanese: complex grammar, faster listening, and reading real-world texts.",
    topics: ["Complex grammar", "Faster listening", "~3,750 words", "~650 kanji"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    id: "n2",
    name: "N2",
    japanese: "中上級",
    tagline: "Upper-intermediate — work-ready",
    description:
      "Business-level Japanese: nuanced grammar, news articles, and the fluency many Japanese companies ask for.",
    topics: ["Nuanced grammar", "News reading", "~6,000 words", "~1,000 kanji"],
    status: "planned",
    statusLabel: "Planned",
  },
  {
    id: "n1",
    name: "N1",
    japanese: "上級",
    tagline: "Advanced — near-native mastery",
    description:
      "The highest JLPT level: academic texts, subtle expressions, and near-native comprehension.",
    topics: ["Academic texts", "Subtle nuance", "~10,000 words", "~2,000 kanji"],
    status: "planned",
    statusLabel: "Planned",
  },
];

export function getLevel(id: string): JlptLevel | undefined {
  return jlptLevels.find((l) => l.id === id.toLowerCase());
}
