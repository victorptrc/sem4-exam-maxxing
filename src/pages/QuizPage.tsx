import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, Layers, Shuffle } from "lucide-react";
import { getSubject } from "@/subjects";
import { questionsForWeek, weeksInBank } from "@/lib/questionBank";
import { getBestScore } from "@/lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuizApp } from "@/components/quiz/QuizApp";
import { NotFound } from "./NotFound";

export function QuizPage() {
  const { subjectId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const subject = getSubject(subjectId);

  const initialWeek = searchParams.get("week");
  const initialMode = searchParams.get("mode");
  const [tab, setTab] = React.useState(
    initialWeek ? "practice" : initialMode === "mock" ? "mock" : initialMode === "full" ? "full" : "practice"
  );
  const [selectedWeek, setSelectedWeek] = React.useState<number | null>(
    initialWeek ? Number(initialWeek) : null
  );

  if (!subject) return <NotFound />;

  const weeks = weeksInBank(subject.questions);
  const mockQuestions = questionsForWeek(subject.questions, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <span>/</span>
        <span>Quiz</span>
      </div>

      <h1 className="mb-1 text-3xl font-bold tracking-tight">Practice quiz</h1>
      <p className="mb-6 text-muted-foreground">{subject.title}</p>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice">
            <Layers className="mr-1.5 h-4 w-4" /> By week
          </TabsTrigger>
          <TabsTrigger value="full">
            <Shuffle className="mr-1.5 h-4 w-4" /> Full exam
          </TabsTrigger>
          <TabsTrigger value="mock">
            <ClipboardList className="mr-1.5 h-4 w-4" /> Mock exam
          </TabsTrigger>
        </TabsList>

        {/* Practice by week */}
        <TabsContent value="practice">
          {selectedWeek === null ? (
            <WeekPicker
              subjectId={subjectId}
              weeks={weeks}
              counts={subject.questions}
              titles={Object.fromEntries(subject.weeks.map((w) => [w.week, w.title]))}
              onPick={setSelectedWeek}
            />
          ) : (
            <div>
              <Button variant="ghost" className="mb-3" onClick={() => setSelectedWeek(null)}>
                <ArrowLeft className="h-4 w-4" /> All weeks
              </Button>
              <h2 className="mb-4 text-lg font-semibold">
                Week {selectedWeek}:{" "}
                {subject.weeks.find((w) => w.week === selectedWeek)?.title}
              </h2>
              <QuizApp
                key={`week-${selectedWeek}`}
                subjectId={subjectId}
                modeKey={`practice-week-${selectedWeek}`}
                questions={questionsForWeek(subject.questions, selectedWeek)}
              />
            </div>
          )}
        </TabsContent>

        {/* Full exam */}
        <TabsContent value="full">
          <p className="mb-4 text-sm text-muted-foreground">
            All {subject.questions.filter((q) => q.week > 0).length} practice questions from every
            week, shuffled — closest to the real exam experience.
          </p>
          <QuizApp
            key="full"
            subjectId={subjectId}
            modeKey="full"
            questions={subject.questions.filter((q) => q.week > 0)}
          />
        </TabsContent>

        {/* Mock exam */}
        <TabsContent value="mock">
          <p className="mb-4 text-sm text-muted-foreground">
            The official {mockQuestions.length}-question mock exam, in order.
          </p>
          <QuizApp
            key="mock"
            subjectId={subjectId}
            modeKey="mock"
            questions={mockQuestions}
            shuffleQuestions={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WeekPicker({
  subjectId,
  weeks,
  counts,
  titles,
  onPick,
}: {
  subjectId: string;
  weeks: number[];
  counts: { week: number }[];
  titles: Record<number, string>;
  onPick: (w: number) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {weeks.map((w) => {
        const n = counts.filter((q) => q.week === w).length;
        const best = getBestScore(subjectId, `practice-week-${w}`);
        return (
          <button key={w} type="button" onClick={() => onPick(w)} className="text-left">
            <Card className="transition-colors hover:border-primary">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">Week {w}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{titles[w]}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary">{n} Q</Badge>
                  {best && (
                    <span className="text-xs text-muted-foreground">
                      best {Math.round((best.correct / best.total) * 100)}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
