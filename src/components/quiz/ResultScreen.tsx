import { Link } from "react-router-dom";
import { RotateCcw, Home, Trophy, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PreparedQuestion } from "./QuestionCard";
import { cn } from "@/lib/utils";

interface ResultScreenProps {
  questions: PreparedQuestion[];
  answers: (number | null)[];
  best: { correct: number; total: number } | null;
  onRetry: () => void;
  unitLabel?: string;
  mockLabel?: string;
  subjectId?: string;
}

export function ResultScreen({
  questions,
  answers,
  best,
  onRetry,
  unitLabel = "Week",
  mockLabel = "Mock",
  subjectId,
}: ResultScreenProps) {
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  const total = questions.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const wrong = questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== q.answer);

  const verdict =
    pct >= 80 ? "Exam-ready! 🎉" : pct >= 60 ? "Getting there — review the misses." : "Keep studying — revisit these lessons.";

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{verdict}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold">
            {correct}
            <span className="text-2xl text-muted-foreground">/{total}</span>
          </p>
          <p className="mt-1 text-lg text-muted-foreground">{pct}% correct</p>
          {best && (
            <p className="mt-2 text-sm text-muted-foreground">
              Best: {best.correct}/{best.total} ({Math.round((best.correct / best.total) * 100)}%)
            </p>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={onRetry}>
              <RotateCcw className="h-4 w-4" /> Try again
            </Button>
            <Button asChild variant="outline">
              <Link to={subjectId ? `/subject/${subjectId}` : "/"}>
                <Home className="h-4 w-4" /> Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {wrong.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold">Review your {wrong.length} miss{wrong.length > 1 ? "es" : ""}</h3>
          <div className="space-y-3">
            {wrong.map(({ q, i }) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">{q.week === 0 ? mockLabel : `${unitLabel} ${q.week}`}</Badge>
                    <Badge variant="outline">{q.topic}</Badge>
                  </div>
                  <p className="mb-2 font-medium">{q.question}</p>
                  <p className="mb-1 flex items-start gap-2 text-sm">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>
                      Your answer:{" "}
                      <span className="text-destructive">
                        {answers[i] !== null ? q.options[answers[i] as number] : "—"}
                      </span>
                    </span>
                  </p>
                  <p className="mb-2 flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>
                      Correct: <span className="text-success">{q.options[q.answer]}</span>
                    </span>
                  </p>
                  <p className={cn("rounded-lg bg-muted/60 p-3 text-sm text-foreground/90")}>
                    {q.explanation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
