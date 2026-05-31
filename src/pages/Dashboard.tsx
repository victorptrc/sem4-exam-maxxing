import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Shuffle,
} from "lucide-react";
import { subjects } from "@/subjects";
import { countByWeek } from "@/lib/questionBank";
import { getVisitedWeeks, getBestScore } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const subject = subjects[0];
  const counts = countByWeek(subject.questions);
  const visited = getVisitedWeeks(subject.id);
  const totalPractice = subject.questions.filter((q) => q.week > 0).length;
  const mockBest = getBestScore(subject.id, "mock");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <GraduationCap className="h-4 w-4" /> Exam Maxxing
        </div>
        <Badge variant="accent" className="mb-3">
          <GraduationCap className="mr-1 h-3 w-3" /> Exam: 9 June 2026
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{subject.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subject.description}</p>
      </header>

      {/* Quiz CTAs */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        <QuizCta
          to={`/quiz/${subject.id}?mode=mock`}
          icon={ClipboardList}
          title="Mock exam"
          desc="The 15 official questions"
          footer={mockBest ? `Best: ${Math.round((mockBest.correct / mockBest.total) * 100)}%` : "Not attempted"}
          highlight
        />
        <QuizCta
          to={`/quiz/${subject.id}?mode=full`}
          icon={Shuffle}
          title="Full exam"
          desc={`All ${totalPractice} questions, shuffled`}
        />
        <QuizCta
          to={`/quiz/${subject.id}`}
          icon={BookOpen}
          title="Practice by week"
          desc="Focus on one topic"
        />
      </section>

      {/* Lessons */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Lessons</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subject.weeks.map((w) => {
            const isVisited = visited.has(w.week);
            return (
              <Link key={w.week} to={`/lesson/${subject.id}/${w.week}`}>
                <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge variant="secondary">Week {w.week}</Badge>
                      <div className="flex items-center gap-2">
                        {counts[w.week] ? (
                          <span className="text-xs text-muted-foreground">{counts[w.week]} Q</span>
                        ) : null}
                        {isVisited && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                    </div>
                    <CardTitle className="text-base leading-snug">{w.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{w.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Study plan */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <CalendarDays className="h-6 w-6 text-primary" /> How to study in 9 days
        </h2>
        <Card>
          <CardContent className="p-6">
            <ol className="space-y-3 text-sm">
              {STUDY_PLAN.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {d.day}
                  </span>
                  <span className="pt-0.5 text-foreground/90">{d.task}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
              <strong>Method:</strong> read the lesson → flip the flashcards → take that week's
              quiz. Re-take the <strong>Mock exam</strong> and <strong>Full exam</strong> until you
              consistently score 80%+.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        Built for exam prep · all content derived from the course lecture slides.
      </footer>
    </div>
  );
}

const STUDY_PLAN = [
  { day: "Day 1", task: "Weeks 6 & 7 — CBSE foundations + Java/Maven. Get the vocabulary solid." },
  { day: "Day 2", task: "Weeks 8 & 9 — component design/architecture + the Java Module System." },
  { day: "Day 3", task: "Week 10 — Dependency Injection (high-yield: appears on the mock exam)." },
  { day: "Day 4", task: "Weeks 11 & 12 — Spring & AOP (aspects, join points, pointcuts, advice)." },
  { day: "Day 5", task: "Week 13 — architecture patterns. Review + re-quiz weeks 6–10." },
  { day: "Day 6", task: "Weeks 16 & 17 — SOA, web services, gRPC, microservices patterns." },
  { day: "Day 7", task: "Weeks 18 & 19 — component testing, test types, load vs stress." },
  { day: "Day 8", task: "Full exam mode twice. Review every miss; revisit weak lessons." },
  { day: "Day 9", task: "Mock exam + flashcard sprint on exam traps. Light review, then rest." },
];

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
    <Button
      asChild
      variant={highlight ? "default" : "outline"}
      className="h-auto justify-start p-0"
    >
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
              <p className={`text-sm ${highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {desc}
              </p>
              {footer && (
                <p className={`mt-1 text-xs ${highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
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
