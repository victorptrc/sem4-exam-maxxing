import type { Question, Subject, WeekMeta } from "../types";
import {
  SUBJECT_ID,
  SUBJECT_TITLE,
  SUBJECT_DESCRIPTION,
  LECTURE_INFO,
} from "./meta";

import sample from "./questions/sample";
import exercises from "./questions/exercises";
import l01 from "./questions/lecture01";
import l02 from "./questions/lecture02";
import l03 from "./questions/lecture03";
import l04 from "./questions/lecture04";
import l05 from "./questions/lecture05";
import l06 from "./questions/lecture06";
import l07 from "./questions/lecture07";
import l08 from "./questions/lecture08";
import l09 from "./questions/lecture09";
import l10 from "./questions/lecture10";
import l11 from "./questions/lecture11";
import l12 from "./questions/lecture12";

// Quiz-only subject: lecture metadata provides titles for the "by lecture"
// picker, but no lesson `component` is attached.
const weeks: WeekMeta[] = LECTURE_INFO.map((l) => ({
  week: l.week,
  title: l.title,
  summary: l.summary,
}));

const questions: Question[] = [
  sample,
  exercises,
  l01,
  l02,
  l03,
  l04,
  l05,
  l06,
  l07,
  l08,
  l09,
  l10,
  l11,
  l12,
].flat();

export const aiFundamentals: Subject = {
  id: SUBJECT_ID,
  title: SUBJECT_TITLE,
  description: SUBJECT_DESCRIPTION,
  weeks,
  questions,
  unitLabel: "Lecture",
  mockLabel: "Sample exam",
  examDate: "4 June 2026",
};
