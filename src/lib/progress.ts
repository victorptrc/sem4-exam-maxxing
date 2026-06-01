import type { Question } from "@/subjects/types";

/**
 * Per-question answer history, persisted to localStorage per subject. Lets the
 * app show coverage, accuracy, per-week breakdowns and a "review your misses"
 * list across sessions.
 */

const PREFIX = "study-app";

function key(subjectId: string) {
  return `${PREFIX}:${subjectId}:answers`;
}

/** Stable id for a question, derived from its text (+week) so it survives reloads. */
export function questionId(q: Pick<Question, "week" | "question">): string {
  let h = 5381;
  const s = q.question;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return `${q.week}:${(h >>> 0).toString(36)}`;
}

export interface AnswerRecord {
  /** times answered correctly */
  c: number;
  /** times answered wrong */
  w: number;
  /** last outcome: 1 correct, 0 wrong */
  last: 0 | 1;
  /** last answered timestamp (ms) */
  at: number;
}

export type AnswerMap = Record<string, AnswerRecord>;

export function getAnswers(subjectId: string): AnswerMap {
  try {
    return JSON.parse(localStorage.getItem(key(subjectId)) || "{}") as AnswerMap;
  } catch {
    return {};
  }
}

export function recordAnswer(
  subjectId: string,
  q: Pick<Question, "week" | "question">,
  correct: boolean
): void {
  try {
    const map = getAnswers(subjectId);
    const id = questionId(q);
    const rec = map[id] || { c: 0, w: 0, last: 0, at: 0 };
    if (correct) rec.c += 1;
    else rec.w += 1;
    rec.last = correct ? 1 : 0;
    rec.at = Date.now();
    map[id] = rec;
    localStorage.setItem(key(subjectId), JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function resetProgress(subjectId: string): void {
  try {
    localStorage.removeItem(key(subjectId));
  } catch {
    /* ignore */
  }
}

export interface WeekStat {
  week: number;
  total: number;
  attempted: number;
  mastered: number; // last attempt correct
  attempts: number;
  correct: number;
}

export interface SubjectStats {
  total: number;
  attempted: number;
  mastered: number;
  attempts: number;
  correct: number;
  /** accuracy across all attempts, 0..1 */
  accuracy: number;
  /** coverage = attempted / total, 0..1 */
  coverage: number;
  perWeek: WeekStat[];
}

/** Aggregate stats for a subject given its full question bank. */
export function getStats(subjectId: string, questions: Question[]): SubjectStats {
  const map = getAnswers(subjectId);
  const byWeek = new Map<number, WeekStat>();
  let total = 0;
  let attempted = 0;
  let mastered = 0;
  let attempts = 0;
  let correct = 0;

  for (const q of questions) {
    total += 1;
    const ws =
      byWeek.get(q.week) ||
      { week: q.week, total: 0, attempted: 0, mastered: 0, attempts: 0, correct: 0 };
    ws.total += 1;

    const rec = map[questionId(q)];
    if (rec && rec.c + rec.w > 0) {
      attempted += 1;
      ws.attempted += 1;
      attempts += rec.c + rec.w;
      ws.attempts += rec.c + rec.w;
      correct += rec.c;
      ws.correct += rec.c;
      if (rec.last === 1) {
        mastered += 1;
        ws.mastered += 1;
      }
    }
    byWeek.set(q.week, ws);
  }

  return {
    total,
    attempted,
    mastered,
    attempts,
    correct,
    accuracy: attempts ? correct / attempts : 0,
    coverage: total ? attempted / total : 0,
    perWeek: [...byWeek.values()].sort((a, b) => a.week - b.week),
  };
}

/** Questions whose most recent attempt was wrong, newest first (for review). */
export function getMisses(subjectId: string, questions: Question[]): Question[] {
  const map = getAnswers(subjectId);
  return questions
    .map((q) => ({ q, rec: map[questionId(q)] }))
    .filter((x) => x.rec && x.rec.last === 0)
    .sort((a, b) => (b.rec!.at || 0) - (a.rec!.at || 0))
    .map((x) => x.q);
}
