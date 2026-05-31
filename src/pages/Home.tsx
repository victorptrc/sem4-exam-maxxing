import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, CalendarDays } from "lucide-react";
import { subjects } from "@/subjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
          <GraduationCap className="h-4 w-4" /> Exam Maxxing
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pick a subject</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Interactive exam prep — lessons (where available) and big practice-question banks with
          instant feedback and saved scores.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((s) => {
          const practiceCount = s.questions.filter((q) => q.week > 0).length;
          return (
            <Link key={s.id} to={`/subject/${s.id}`}>
              <Card className="group h-full transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <Badge variant="secondary">{practiceCount} questions</Badge>
                    {s.examDate && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3 w-3" /> {s.examDate}
                      </span>
                    )}
                  </div>
                  <CardTitle className="flex items-center gap-1.5 text-xl leading-snug">
                    {s.title}
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{s.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        Built for exam prep · content derived from the course lecture material.
      </footer>
    </div>
  );
}
