import type { ComponentType } from "react";

/** A single multiple-choice question. */
export interface Question {
  /** Week number this question belongs to (use 0 for the mock exam set). */
  week: number;
  /** Short topic label, e.g. "Cohesion & coupling". */
  topic: string;
  /** The question stem. */
  question: string;
  /** Exactly 4 answer options. */
  options: [string, string, string, string];
  /** Index (0-3) of the correct option. */
  answer: 0 | 1 | 2 | 3;
  /** Teaching explanation: why the right answer is right (and traps wrong). */
  explanation: string;
}

/** Metadata describing one week's lesson. */
export interface WeekMeta {
  week: number;
  title: string;
  /** One-line summary shown on the dashboard. */
  summary: string;
  /** The lesson page component. */
  component: ComponentType;
}

/** A subject = a set of weeks (lessons) + a question bank. */
export interface Subject {
  id: string;
  title: string;
  description: string;
  /** Accent hue used for theming/badges (Tailwind class fragment optional). */
  weeks: WeekMeta[];
  /** All questions across all weeks, plus the mock set (week 0). */
  questions: Question[];
}
