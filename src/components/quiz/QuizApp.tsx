import * as React from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Question } from "@/subjects/types";
import { shuffle } from "@/lib/utils";
import { getBestScore, saveBestScore } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard, type PreparedQuestion } from "./QuestionCard";
import { ResultScreen } from "./ResultScreen";

interface QuizAppProps {
  subjectId: string;
  /** Stable key identifying this mode/week for best-score storage. */
  modeKey: string;
  questions: Question[];
  /** Shuffle question order (off for the fixed mock exam). */
  shuffleQuestions?: boolean;
}

function prepare(questions: Question[], shuffleQuestions: boolean): PreparedQuestion[] {
  const ordered = shuffleQuestions ? shuffle(questions) : questions;
  return ordered.map((q) => {
    const opts = q.options.map((text, idx) => ({ text, correct: idx === q.answer }));
    const shuffled = shuffle(opts);
    return {
      week: q.week,
      topic: q.topic,
      question: q.question,
      options: shuffled.map((o) => o.text),
      answer: shuffled.findIndex((o) => o.correct),
      explanation: q.explanation,
    };
  });
}

export function QuizApp({ subjectId, modeKey, questions, shuffleQuestions = true }: QuizAppProps) {
  const [seed, setSeed] = React.useState(0);
  const prepared = React.useMemo(
    () => prepare(questions, shuffleQuestions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, shuffleQuestions, seed]
  );

  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [revealed, setRevealed] = React.useState<boolean[]>(() => questions.map(() => false));
  const [finished, setFinished] = React.useState(false);

  // Reset when the question set or seed changes.
  React.useEffect(() => {
    setIdx(0);
    setAnswers(prepared.map(() => null));
    setRevealed(prepared.map(() => false));
    setFinished(false);
  }, [prepared]);

  const total = prepared.length;
  const answeredCount = revealed.filter(Boolean).length;
  const score = prepared.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);

  if (total === 0) {
    return (
      <p className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
        No questions available for this selection yet.
      </p>
    );
  }

  if (finished) {
    saveBestScore(subjectId, modeKey, score, total);
    const best = getBestScore(subjectId, modeKey);
    return (
      <ResultScreen
        questions={prepared}
        answers={answers}
        best={best}
        onRetry={() => setSeed((s) => s + 1)}
      />
    );
  }

  const q = prepared[idx];
  const isRevealed = revealed[idx];
  const isLast = idx === total - 1;

  const select = (i: number) => {
    if (isRevealed) return;
    setAnswers((a) => {
      const next = [...a];
      next[idx] = i;
      return next;
    });
  };

  const check = () => {
    if (answers[idx] === null) return;
    setRevealed((r) => {
      const next = [...r];
      next[idx] = true;
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {idx + 1} of {total}
          </span>
          <span>
            Score: {score}/{answeredCount}
          </span>
        </div>
        <Progress value={((idx + (isRevealed ? 1 : 0)) / total) * 100} />
      </div>

      <QuestionCard q={q} selected={answers[idx]} revealed={isRevealed} onSelect={select} />

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {!isRevealed ? (
          <Button onClick={check} disabled={answers[idx] === null}>
            <Check className="h-4 w-4" /> Check answer
          </Button>
        ) : isLast ? (
          <Button variant="success" onClick={() => setFinished(true)}>
            See results
          </Button>
        ) : (
          <Button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
