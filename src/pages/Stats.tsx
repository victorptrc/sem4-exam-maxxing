import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Target, CheckCircle2, ListChecks, RotateCcw, Trophy } from "lucide-react";
import { getSubject } from "@/subjects";
import { getStats, getMisses, resetProgress } from "@/lib/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NotFound } from "./NotFound";

const pct = (x: number) => Math.round(x * 100);

export function Stats() {
  const { subjectId = "" } = useParams();
  const subject = getSubject(subjectId);
  const [version, setVersion] = React.useState(0);
  const [confirming, setConfirming] = React.useState(false);

  const stats = React.useMemo(
    () => (subject ? getStats(subject.id, subject.questions) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subject, version]
  );
  const misses = React.useMemo(
    () => (subject ? getMisses(subject.id, subject.questions) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subject, version]
  );

  if (!subject || !stats) return <NotFound />;

  const unitLabel = subject.unitLabel ?? "Week";
  const mockLabel = subject.mockLabel ?? "Mock exam";
  const titles = Object.fromEntries(subject.weeks.map((w) => [w.week, w.title]));

  const reset = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    resetProgress(subject.id);
    setConfirming(false);
    setVersion((v) => v + 1);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/subject/${subject.id}`}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {subject.title}
        </Link>
        <span>/</span>
        <span>Statistics</span>
      </div>

      <h1 className="mb-1 text-3xl font-bold tracking-tight">Your statistics</h1>
      <p className="mb-6 text-muted-foreground">
        Saved in this browser as you answer. {stats.attempts} answer
        {stats.attempts === 1 ? "" : "s"} recorded.
      </p>

      {/* Overall */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Target}
          label="Accuracy"
          value={`${pct(stats.accuracy)}%`}
          sub={`${stats.correct}/${stats.attempts} answers`}
        />
        <StatCard
          icon={ListChecks}
          label="Coverage"
          value={`${pct(stats.coverage)}%`}
          sub={`${stats.attempted}/${stats.total} questions tried`}
        />
        <StatCard
          icon={CheckCircle2}
          label="Mastered"
          value={`${stats.mastered}`}
          sub={`last answer correct`}
        />
      </section>

      {stats.attempted === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No answers recorded yet. Take a quiz and your progress will show up here.
            <div className="mt-4">
              <Button asChild>
                <Link to={`/quiz/${subject.id}`}>Start practicing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Per week/lecture */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold tracking-tight">
              By {unitLabel.toLowerCase()}
            </h2>
            <div className="space-y-3">
              {stats.perWeek.map((w) => {
                const acc = w.attempts ? w.correct / w.attempts : 0;
                const cover = w.total ? w.attempted / w.total : 0;
                const name = w.week === 0 ? mockLabel : `${unitLabel} ${w.week}`;
                return (
                  <Card key={w.week}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold">{name}</p>
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {titles[w.week] ?? ""}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          {w.attempted > 0 ? (
                            <span className="font-semibold">{pct(acc)}%</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">untouched</span>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {w.attempted}/{w.total} tried
                          </p>
                        </div>
                      </div>
                      <Progress value={cover * 100} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Review misses */}
          <section className="mb-8">
            <h2 className="mb-1 flex items-center gap-2 text-xl font-bold tracking-tight">
              <Trophy className="h-5 w-5 text-primary" /> Review your misses
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Questions whose last answer was wrong. Re-answer them correctly to clear them.
            </p>
            {misses.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Nothing to review — every question you've tried is currently correct. 🎉
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {misses.map((q, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary">
                          {q.week === 0 ? mockLabel : `${unitLabel} ${q.week}`}
                        </Badge>
                        <Badge variant="outline">{q.topic}</Badge>
                      </div>
                      <p className="mb-2 font-medium">{q.question}</p>
                      <p className="mb-2 text-sm">
                        <span className="font-semibold text-success">Correct: </span>
                        <span className="text-foreground/90">{q.options[q.answer]}</span>
                      </p>
                      <p className="rounded-lg bg-muted/60 p-3 text-sm text-foreground/90">
                        {q.explanation}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Reset */}
      <section className="border-t pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Progress is stored only in this browser.
          </p>
          <Button variant={confirming ? "destructive" : "outline"} onClick={reset} onBlur={() => setConfirming(false)}>
            <RotateCcw className="h-4 w-4" />
            {confirming ? "Click again to confirm" : "Reset progress"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="h-4 w-4" /> {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}
