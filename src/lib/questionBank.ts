import type { Question } from "@/subjects/types";

/** Return questions for a given week (week 0 = the mock exam set). */
export function questionsForWeek(all: Question[], week: number): Question[] {
  return all.filter((q) => q.week === week);
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
