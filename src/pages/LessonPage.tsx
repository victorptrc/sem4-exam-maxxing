import * as React from "react";
import { useParams } from "react-router-dom";
import { getSubject } from "@/subjects";
import { LessonLayout } from "@/components/LessonLayout";
import { markWeekVisited } from "@/lib/storage";
import { NotFound } from "./NotFound";

export function LessonPage() {
  const { subjectId = "", week = "" } = useParams();
  const subject = getSubject(subjectId);
  const weekNum = Number(week);
  const idx = subject?.weeks.findIndex((w) => w.week === weekNum) ?? -1;

  React.useEffect(() => {
    if (subject && idx >= 0) {
      markWeekVisited(subjectId, weekNum);
      window.scrollTo(0, 0);
    }
  }, [subjectId, weekNum, subject, idx]);

  if (!subject || idx < 0) return <NotFound />;

  const meta = subject.weeks[idx];
  const prev = idx > 0 ? subject.weeks[idx - 1] : undefined;
  const next = idx < subject.weeks.length - 1 ? subject.weeks[idx + 1] : undefined;
  const LessonBody = meta.component;

  return (
    <LessonLayout subjectId={subjectId} meta={meta} prev={prev} next={next}>
      <LessonBody />
    </LessonLayout>
  );
}
