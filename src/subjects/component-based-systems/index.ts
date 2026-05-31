import type { ComponentType } from "react";
import type { Question, Subject, WeekMeta } from "../types";
import {
  SUBJECT_ID,
  SUBJECT_TITLE,
  SUBJECT_DESCRIPTION,
  WEEK_INFO,
} from "./meta";

import Week06 from "./lessons/Week06";
import Week07 from "./lessons/Week07";
import Week08 from "./lessons/Week08";
import Week09 from "./lessons/Week09";
import Week10 from "./lessons/Week10";
import Week11 from "./lessons/Week11";
import Week12 from "./lessons/Week12";
import Week13 from "./lessons/Week13";
import Week16 from "./lessons/Week16";
import Week17 from "./lessons/Week17";
import Week18 from "./lessons/Week18";
import Week19 from "./lessons/Week19";

import mock from "./questions/mock";
import q06 from "./questions/week06";
import q07 from "./questions/week07";
import q08 from "./questions/week08";
import q09 from "./questions/week09";
import q10 from "./questions/week10";
import q11 from "./questions/week11";
import q12 from "./questions/week12";
import q13 from "./questions/week13";
import q16 from "./questions/week16";
import q17 from "./questions/week17";
import q18 from "./questions/week18";
import q19 from "./questions/week19";

const COMPONENTS: Record<number, ComponentType> = {
  6: Week06,
  7: Week07,
  8: Week08,
  9: Week09,
  10: Week10,
  11: Week11,
  12: Week12,
  13: Week13,
  16: Week16,
  17: Week17,
  18: Week18,
  19: Week19,
};

const weeks: WeekMeta[] = WEEK_INFO.map((w) => ({
  ...w,
  component: COMPONENTS[w.week],
}));

const questions: Question[] = [
  mock,
  q06,
  q07,
  q08,
  q09,
  q10,
  q11,
  q12,
  q13,
  q16,
  q17,
  q18,
  q19,
].flat();

export const componentBasedSystems: Subject = {
  id: SUBJECT_ID,
  title: SUBJECT_TITLE,
  description: SUBJECT_DESCRIPTION,
  weeks,
  questions,
  unitLabel: "Week",
  mockLabel: "Mock exam",
  examDate: "9 June 2026",
  studyPlan: [
    { day: "Day 1", task: "Weeks 6 & 7 — CBSE foundations + Java/Maven. Get the vocabulary solid." },
    { day: "Day 2", task: "Weeks 8 & 9 — component design/architecture + the Java Module System." },
    { day: "Day 3", task: "Week 10 — Dependency Injection (high-yield: appears on the mock exam)." },
    { day: "Day 4", task: "Weeks 11 & 12 — Spring & AOP (aspects, join points, pointcuts, advice)." },
    { day: "Day 5", task: "Week 13 — architecture patterns. Review + re-quiz weeks 6–10." },
    { day: "Day 6", task: "Weeks 16 & 17 — SOA, web services, gRPC, microservices patterns." },
    { day: "Day 7", task: "Weeks 18 & 19 — component testing, test types, load vs stress." },
    { day: "Day 8", task: "Full exam mode twice. Review every miss; revisit weak lessons." },
    { day: "Day 9", task: "Mock exam + flashcard sprint on exam traps. Light review, then rest." },
  ],
};
