import type { Question } from "@/subjects/types";
import { shuffle } from "@/lib/utils";

/** Return questions for a given week (week 0 = the mock exam set). */
export function questionsForWeek(all: Question[], week: number): Question[] {
  return all.filter((q) => q.week === week);
}

/**
 * Build a random exam: `size` questions across all lectures, mirroring the real
 * exam's mix (~`exerciseRatio` exercise-based, the rest theory). Re-run for a
 * fresh exam each time. Mock/week-0 questions are excluded from the theory pool.
 */
export function sampleExam(all: Question[], size = 30, exerciseRatio = 0.1): Question[] {
  const exercises = all.filter((q) => q.source === "exercise-based");
  const theory = all.filter((q) => q.week > 0 && q.source !== "exercise-based");
  const nEx = Math.min(exercises.length, Math.round(size * exerciseRatio));
  const pickedEx = shuffle(exercises).slice(0, nEx);
  const pickedTh = shuffle(theory).slice(0, size - pickedEx.length);
  return shuffle([...pickedEx, ...pickedTh]);
}

/** All distinct non-mock weeks present in the bank, sorted ascending. */
export function weeksInBank(all: Question[]): number[] {
  return [...new Set(all.filter((q) => q.week > 0).map((q) => q.week))].sort((a, b) => a - b);
}

/** Count of questions per week. */
export function countByWeek(all: Question[]): Record<number, number> {
  return all.reduce<Record<number, number>>((acc, q) => {
    acc[q.week] = (acc[q.week] || 0) + 1;
    return acc;
  }, {});
}
