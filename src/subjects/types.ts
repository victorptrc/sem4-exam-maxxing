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

/** Metadata describing one week/lecture. */
export interface WeekMeta {
  week: number;
  title: string;
  /** One-line summary shown on the dashboard. */
  summary: string;
  /** The lesson page component. Omitted for quiz-only subjects. */
  component?: ComponentType;
}

/** One step of a per-subject study plan. */
export interface StudyPlanStep {
  day: string;
  task: string;
}

/** A subject = a set of weeks/lectures + a question bank. */
export interface Subject {
  id: string;
  title: string;
  description: string;
  /** Weeks/lectures. Each may carry a lesson `component`, or be quiz-only. */
  weeks: WeekMeta[];
  /** All questions across all weeks, plus the mock/sample set (week 0). */
  questions: Question[];
  /** Label for the unit of organization. Defaults to "Week". */
  unitLabel?: string;
  /** Label for the week-0 set. Defaults to "Mock exam". */
  mockLabel?: string;
  /** Human-readable exam date, e.g. "9 June 2026". */
  examDate?: string;
  /** Optional study plan shown on the dashboard. */
  studyPlan?: StudyPlanStep[];
}

/** Does this subject have any lesson pages? */
export function subjectHasLessons(subject: Subject): boolean {
  return subject.weeks.some((w) => w.component);
}
