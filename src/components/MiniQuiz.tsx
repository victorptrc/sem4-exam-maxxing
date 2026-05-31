import * as React from "react";
import { Check, X } from "lucide-react";
import type { Question } from "@/subjects/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface MiniQuizProps {
  questions: Question[];
  title?: string;
}

/** A lightweight in-lesson quiz: pick an answer, get instant feedback + explanation. */
export function MiniQuiz({ questions, title = "Quick check" }: MiniQuizProps) {
  return (
    <div className="my-6">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <MiniQuizItem key={i} index={i} q={q} />
        ))}
      </div>
    </div>
  );
}

function MiniQuizItem({ q, index }: { q: Question; index: number }) {
  const [picked, setPicked] = React.useState<number | null>(null);
  const answered = picked !== null;
  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-3 font-medium">
          <span className="mr-2 text-muted-foreground">{index + 1}.</span>
          {q.question}
        </p>
        <div className="grid gap-2">
          {q.options.map((opt, oi) => {
            const isCorrect = oi === q.answer;
            const isPicked = oi === picked;
            return (
              <button
                key={oi}
                type="button"
                disabled={answered}
                onClick={() => setPicked(oi)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                  !answered && "hover:border-primary hover:bg-primary/5",
                  answered && isCorrect && "border-success bg-success/10",
                  answered && isPicked && !isCorrect && "border-destructive bg-destructive/10",
                  answered && !isCorrect && !isPicked && "opacity-60"
                )}
              >
                <span>{opt}</span>
                {answered && isCorrect && <Check className="h-4 w-4 text-success" />}
                {answered && isPicked && !isCorrect && <X className="h-4 w-4 text-destructive" />}
              </button>
            );
          })}
        </div>
        {answered && (
          <p className="mt-3 rounded-lg bg-muted/60 p-3 text-sm text-foreground/90">
            <span className="font-semibold">
              {picked === q.answer ? "Correct! " : "Not quite. "}
            </span>
            {q.explanation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
