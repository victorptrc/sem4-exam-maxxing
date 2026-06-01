/** localStorage helpers for quiz progress & best scores. Namespaced per subject. */

const PREFIX = "study-app";

interface BestScore {
  correct: number;
  total: number;
  at: number;
}

function key(subjectId: string, mode: string) {
  return `${PREFIX}:${subjectId}:best:${mode}`;
}

export function getBestScore(subjectId: string, mode: string): BestScore | null {
  try {
    const raw = localStorage.getItem(key(subjectId, mode));
    return raw ? (JSON.parse(raw) as BestScore) : null;
  } catch {
    return null;
  }
}

export function saveBestScore(
  subjectId: string,
  mode: string,
  correct: number,
  total: number
): void {
  try {
    const prev = getBestScore(subjectId, mode);
    const prevPct = prev ? prev.correct / prev.total : -1;
    const pct = total ? correct / total : 0;
    if (pct >= prevPct) {
      localStorage.setItem(
        key(subjectId, mode),
        JSON.stringify({ correct, total, at: Date.now() })
      );
    }
  } catch {
    /* ignore */
  }
}

/** Whether quiz sound effects are enabled (default true). */
export function isSoundEnabled(): boolean {
  try {
    return localStorage.getItem(`${PREFIX}:sound`) !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean): void {
  try {
    localStorage.setItem(`${PREFIX}:sound`, on ? "on" : "off");
  } catch {
    /* ignore */
  }
}

/** Sound effect volume, 0..1 (default 0.5). */
export function getVolume(): number {
  try {
    const raw = localStorage.getItem(`${PREFIX}:volume`);
    if (raw === null) return 0.5;
    const v = Number(raw);
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.5;
  } catch {
    return 0.5;
  }
}

export function setVolume(v: number): void {
  try {
    localStorage.setItem(`${PREFIX}:volume`, String(Math.min(1, Math.max(0, v))));
  } catch {
    /* ignore */
  }
}

/** Mark a lesson week as visited (for dashboard progress). */
export function markWeekVisited(subjectId: string, week: number): void {
  try {
    const k = `${PREFIX}:${subjectId}:visited`;
    const set = new Set<number>(JSON.parse(localStorage.getItem(k) || "[]"));
    set.add(week);
    localStorage.setItem(k, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

export function getVisitedWeeks(subjectId: string): Set<number> {
  try {
    const k = `${PREFIX}:${subjectId}:visited`;
    return new Set<number>(JSON.parse(localStorage.getItem(k) || "[]"));
  } catch {
    return new Set();
  }
}
