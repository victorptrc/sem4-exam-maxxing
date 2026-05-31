import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import type { WeekMeta } from "@/subjects/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonLayoutProps {
  subjectId: string;
  meta: WeekMeta;
  prev?: WeekMeta;
  next?: WeekMeta;
  children: React.ReactNode;
}

/** Standard chrome around a lesson's content: header, breadcrumb, prev/next nav. */
export function LessonLayout({ subjectId, meta, prev, next, children }: LessonLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/subject/${subjectId}`}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <span>/</span>
        <span>Week {meta.week}</span>
      </div>

      <header className="mb-8">
        <Badge variant="accent" className="mb-3">
          <BookOpen className="mr-1 h-3 w-3" /> Week {meta.week}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{meta.summary}</p>
      </header>

      <article className="lesson-prose">{children}</article>

      <div className="mt-12 flex justify-between gap-3 border-t pt-6">
        {prev ? (
          <Button asChild variant="outline">
            <Link to={`/lesson/${subjectId}/${prev.week}`}>
              <ArrowLeft className="h-4 w-4" /> Week {prev.week}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <Button asChild variant="outline">
          <Link to={`/quiz/${subjectId}?week=${meta.week}`}>
            <GraduationCap className="h-4 w-4" /> Practice this week
          </Link>
        </Button>
        {next ? (
          <Button asChild variant="outline">
            <Link to={`/lesson/${subjectId}/${next.week}`}>
              Week {next.week} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

interface LessonSectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

/** A titled section within a lesson. Week pages compose several of these. */
export function LessonSection({ title, icon: Icon, children }: LessonSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold tracking-tight">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        {title}
      </h2>
      {children}
    </section>
  );
}
