import type { Subject } from "./types";
import { componentBasedSystems } from "./component-based-systems";
import { aiFundamentals } from "./ai-fundamentals";

/**
 * The subject registry. To add a new subject, create a folder under src/subjects/
 * with its meta + lessons + questions, build a Subject in its index.ts, and add it here.
 */
export const subjects: Subject[] = [componentBasedSystems, aiFundamentals];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getWeek(subjectId: string, week: number) {
  const subject = getSubject(subjectId);
  return subject?.weeks.find((w) => w.week === week);
}
