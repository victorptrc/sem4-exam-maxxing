import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PreparedQuestion {
  week: number;
  topic: string;
  question: string;
  options: string[];
  answer: number; // index into shuffled options
  explanation: string;
}

interface QuestionCardProps {
  q: PreparedQuestion;
  selected: number | null;
  revealed: boolean;
  onSelect: (i: number) => void;
  unitLabel?: string;
  mockLabel?: string;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuestionCard({
  q,
  selected,
  revealed,
  onSelect,
  unitLabel = "Week",
  mockLabel = "Mock exam",
}: QuestionCardProps) {
  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="secondary">{q.week === 0 ? mockLabel : `${unitLabel} ${q.week}`}</Badge>
          <Badge variant="outline">{q.topic}</Badge>
        </div>
        <p className="mb-5 text-lg font-medium leading-snug">{q.question}</p>
        <div className="grid gap-2.5">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isPicked = i === selected;
            return (
              <button
                key={i}
                type="button"
                disabled={revealed}
                onClick={(e) => {
                  onSelect(i);
                  // Drop the lingering mouse-focus ring so keyboard ↑/↓ navigation
                  // doesn't leave a border on the previously clicked option.
                  e.currentTarget.blur();
                }}
                className={cn(
                  "flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  !revealed && isPicked && "border-primary bg-primary/5",
                  !revealed && !isPicked && "hover:border-primary/60 hover:bg-muted/50",
                  revealed && isCorrect && "border-success bg-success/10",
                  revealed && isPicked && !isCorrect && "border-destructive bg-destructive/10",
                  revealed && !isCorrect && !isPicked && "opacity-60"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    !revealed && isPicked && "border-primary bg-primary text-primary-foreground",
                    revealed && isCorrect && "border-success bg-success text-success-foreground",
                    revealed && isPicked && !isCorrect && "border-destructive bg-destructive text-destructive-foreground"
                  )}
                >
                  {revealed && isCorrect ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : revealed && isPicked && !isCorrect ? (
                    <X className="h-3.5 w-3.5" />
                  ) : (
                    LETTERS[i]
                  )}
                </span>
                <span className="pt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>
        {revealed && (
          <div
            className={cn(
              "mt-4 rounded-lg border p-4 text-sm leading-relaxed",
              selected === q.answer
                ? "border-success/30 bg-success/5"
                : "border-destructive/30 bg-destructive/5"
            )}
          >
            <p className="mb-1 font-semibold">
              {selected === q.answer ? "✓ Correct" : "✗ Incorrect"}
            </p>
            <p className="text-foreground/90">{q.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
