import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Shuffle,
} from "lucide-react";
import { getSubject } from "@/subjects";
import { subjectHasLessons } from "@/subjects/types";
import { countByWeek } from "@/lib/questionBank";
import { getVisitedWeeks, getBestScore } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotFound } from "./NotFound";

export function Dashboard() {
  const { subjectId = "" } = useParams();
  const subject = getSubject(subjectId);
  if (!subject) return <NotFound />;

  const unitLabel = subject.unitLabel ?? "Week";
  const mockLabel = subject.mockLabel ?? "Mock exam";
  const hasLessons = subjectHasLessons(subject);
  const counts = countByWeek(subject.questions);
  const visited = getVisitedWeeks(subject.id);
  const totalPractice = subject.questions.filter((q) => q.week > 0).length;
  const mockCount = subject.questions.filter((q) => q.week === 0).length;
  const mockBest = getBestScore(subject.id, "mock");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <header className="mb-10">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All subjects
        </Link>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <GraduationCap className="h-4 w-4" /> Exam Maxxing
        </div>
        {subject.examDate && (
          <Badge variant="accent" className="mb-3">
            <GraduationCap className="mr-1 h-3 w-3" /> Exam: {subject.examDate}
          </Badge>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{subject.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subject.description}</p>
      </header>

      {/* Quiz CTAs */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        {mockCount > 0 && (
          <QuizCta
            to={`/quiz/${subject.id}?mode=mock`}
            icon={ClipboardList}
            title={mockLabel}
            desc={`The ${mockCount} official questions`}
            footer={
              mockBest
                ? `Best: ${Math.round((mockBest.correct / mockBest.total) * 100)}%`
                : "Not attempted"
            }
            highlight
          />
        )}
        <QuizCta
          to={`/quiz/${subject.id}?mode=full`}
          icon={Shuffle}
          title="Full exam"
          desc={`All ${totalPractice} questions, shuffled`}
        />
        <QuizCta
          to={`/quiz/${subject.id}`}
          icon={BookOpen}
          title={`Practice by ${unitLabel.toLowerCase()}`}
          desc="Focus on one topic"
        />
      </section>

      {/* Weeks / lectures */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          {hasLessons ? "Lessons" : `${unitLabel}s`}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.weeks.map((w) => {
            const isVisited = visited.has(w.week);
            const card = (
              <Card
                className={`h-full transition-all ${
                  hasLessons ? "hover:-translate-y-0.5 hover:border-primary hover:shadow-md" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="mb-1 flex items-center justify-between">
                    <Badge variant="secondary">
                      {unitLabel} {w.week}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {counts[w.week] ? (
                        <span className="text-xs text-muted-foreground">{counts[w.week]} Q</span>
                      ) : null}
                      {hasLessons && isVisited && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base leading-snug">{w.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{w.summary}</p>
                </CardContent>
              </Card>
            );
            // Lessons link to the lesson page; quiz-only units link to that unit's practice set.
            return hasLessons ? (
              <Link key={w.week} to={`/lesson/${subject.id}/${w.week}`}>
                {card}
              </Link>
            ) : (
              <Link key={w.week} to={`/quiz/${subject.id}?week=${w.week}`}>
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Study plan */}
      {subject.studyPlan && subject.studyPlan.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
            <CalendarDays className="h-6 w-6 text-primary" /> How to study
          </h2>
          <Card>
            <CardContent className="p-6">
              <ol className="space-y-3 text-sm">
                {subject.studyPlan.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {d.day}
                    </span>
                    <span className="pt-0.5 text-foreground/90">{d.task}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
                <strong>Method:</strong> read the lesson → flip the flashcards → take that{" "}
                {unitLabel.toLowerCase()}'s quiz. Re-take the <strong>{mockLabel}</strong> and{" "}
                <strong>Full exam</strong> until you consistently score 80%+.
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        Built for exam prep · content derived from the course lecture material.
      </footer>
    </div>
  );
}

function QuizCta({
  to,
  icon: Icon,
  title,
  desc,
  footer,
  highlight,
}: {
  to: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  footer?: string;
  highlight?: boolean;
}) {
  return (
    <Button asChild variant={highlight ? "default" : "outline"} className="h-auto justify-start p-0">
      <Link to={to}>
        <Card
          className={`w-full border-0 bg-transparent shadow-none ${
            highlight ? "text-primary-foreground" : ""
          }`}
        >
          <CardContent className="flex items-start gap-3 p-4">
            <Icon className="mt-0.5 h-6 w-6 shrink-0" />
            <div className="text-left">
              <p className="font-semibold">{title}</p>
              <p
                className={`text-sm ${
                  highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {desc}
              </p>
              {footer && (
                <p
                  className={`mt-1 text-xs ${
                    highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {footer}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </Button>
  );
}
