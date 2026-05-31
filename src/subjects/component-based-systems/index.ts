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
};
