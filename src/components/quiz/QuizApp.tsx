import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Question } from "@/subjects/types";
import { shuffle } from "@/lib/utils";
import {
  getBestScore,
  saveBestScore,
  isSoundEnabled,
  setSoundEnabled,
  getVolume,
  setVolume,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard, type PreparedQuestion } from "./QuestionCard";
import { ResultScreen } from "./ResultScreen";
import { StreakCard } from "./StreakCard";
import { useQuizSounds } from "./useQuizSounds";

interface QuizAppProps {
  subjectId: string;
  /** Stable key identifying this mode/week for best-score storage. */
  modeKey: string;
  questions: Question[];
  /** Shuffle question order (off for the fixed mock exam). */
  shuffleQuestions?: boolean;
  /** Label for the unit of organization, e.g. "Week" or "Lecture". */
  unitLabel?: string;
  /** Label for the week-0 set, e.g. "Mock exam" or "Sample exam". */
  mockLabel?: string;
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

export function QuizApp({
  subjectId,
  modeKey,
  questions,
  shuffleQuestions = true,
  unitLabel,
  mockLabel,
}: QuizAppProps) {
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
  const [streak, setStreak] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled);
  const [volume, setVol] = React.useState(getVolume);

  const { playCorrect, playWrong, playMilestone } = useQuizSounds(soundOn, volume);

  // Reset when the question set or seed changes.
  React.useEffect(() => {
    setIdx(0);
    setAnswers(prepared.map(() => null));
    setRevealed(prepared.map(() => false));
    setFinished(false);
    setStreak(0);
    setBestStreak(0);
  }, [prepared]);

  const total = prepared.length;
  const q = prepared[idx];
  const isRevealed = !!revealed[idx];
  const isLast = idx === total - 1;

  const select = React.useCallback(
    (i: number) => {
      if (revealed[idx]) return;
      setAnswers((a) => {
        const next = [...a];
        next[idx] = i;
        return next;
      });
    },
    [idx, revealed]
  );

  const check = React.useCallback(() => {
    const picked = answers[idx];
    if (picked === null || picked === undefined || revealed[idx]) return;
    setRevealed((r) => {
      const next = [...r];
      next[idx] = true;
      return next;
    });
    const correct = picked === prepared[idx].answer;
    if (correct) {
      setStreak((s) => {
        const ns = s + 1;
        if (ns % 5 === 0) playMilestone();
        else playCorrect();
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      playWrong();
      setStreak(0);
    }
  }, [answers, idx, revealed, prepared, playCorrect, playWrong, playMilestone]);

  const goNext = React.useCallback(
    () => setIdx((i) => Math.min(total - 1, i + 1)),
    [total]
  );
  const goPrev = React.useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);

  const skip = React.useCallback(() => {
    setStreak(0);
    if (idx === total - 1) setFinished(true);
    else goNext();
  }, [idx, total, goNext]);

  const toggleSound = React.useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      setSoundEnabled(next);
      return next;
    });
  }, []);

  const updateVolume = React.useCallback((v: number) => {
    setVol(v);
    setVolume(v);
    if (v > 0) {
      setSoundOn(true);
      setSoundEnabled(true);
    }
  }, []);

  const muted = !soundOn || volume === 0;

  // Keyboard control: arrows navigate / choose, Enter continues, S skips.
  React.useEffect(() => {
    if (finished || total === 0) return;
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement)?.isContentEditable) {
        return;
      }
      const optCount = prepared[idx]?.options.length ?? 0;
      const picked = answers[idx];
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowDown":
          if (!revealed[idx] && optCount) {
            e.preventDefault();
            select(picked === null || picked === undefined ? 0 : (picked + 1) % optCount);
          }
          break;
        case "ArrowUp":
          if (!revealed[idx] && optCount) {
            e.preventDefault();
            select(
              picked === null || picked === undefined
                ? optCount - 1
                : (picked - 1 + optCount) % optCount
            );
          }
          break;
        case "Enter":
          e.preventDefault();
          if (!revealed[idx]) {
            if (picked !== null && picked !== undefined) check();
          } else if (isLast) {
            setFinished(true);
          } else {
            goNext();
          }
          break;
        case "s":
        case "S":
          e.preventDefault();
          skip();
          break;
        default: {
          // 1-4 or a-d select an option
          const n = "1234".indexOf(e.key);
          const a = "abcd".indexOf(e.key.toLowerCase());
          const pick = n >= 0 ? n : a;
          if (pick >= 0 && pick < optCount && !revealed[idx]) {
            e.preventDefault();
            select(pick);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finished, total, idx, answers, revealed, prepared, isLast, check, select, skip, goNext, goPrev]);

  if (total === 0) {
    return (
      <p className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
        No questions available for this selection yet.
      </p>
    );
  }

  const answeredCount = revealed.filter(Boolean).length;
  const score = prepared.reduce((n, qq, i) => n + (answers[i] === qq.answer ? 1 : 0), 0);

  if (finished) {
    saveBestScore(subjectId, modeKey, score, total);
    const best = getBestScore(subjectId, modeKey);
    return (
      <ResultScreen
        questions={prepared}
        answers={answers}
        best={best}
        bestStreak={bestStreak}
        onRetry={() => setSeed((s) => s + 1)}
        unitLabel={unitLabel}
        mockLabel={mockLabel}
        subjectId={subjectId}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            Question {idx + 1} of {total}
          </span>
          <div className="flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              {streak > 0 && (
                <motion.span
                  key={streak}
                  initial={{ scale: 0.6, opacity: 0, y: 6 }}
                  animate={{ scale: [1.35, 1], opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 font-semibold text-orange-600 dark:text-orange-400"
                >
                  <Flame className="h-3.5 w-3.5" /> {streak}
                </motion.span>
              )}
            </AnimatePresence>
            <span>
              Score: {score}/{answeredCount}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute sounds" : "Mute sounds"}
                title={muted ? "Unmute sounds" : "Mute sounds"}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => updateVolume(Number(e.target.value))}
                aria-label="Sound volume"
                title="Volume"
                className="h-1 w-16 cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
        <Progress value={((idx + (isRevealed ? 1 : 0)) / total) * 100} />
      </div>

      <div className="relative">
        <QuestionCard
          q={q}
          selected={answers[idx]}
          revealed={isRevealed}
          onSelect={select}
          unitLabel={unitLabel}
          mockLabel={mockLabel}
        />
        {/* Streak card — sits next to the question card on wide screens. */}
        <div className="absolute top-0 right-0 hidden translate-x-[calc(100%+1.5rem)] xl:block">
          <StreakCard streak={streak} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={goPrev} disabled={idx === 0}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          {!isRevealed && (
            <Button variant="ghost" onClick={skip} title="Skip (S)">
              <SkipForward className="h-4 w-4" /> Skip
            </Button>
          )}

          {!isRevealed ? (
            <Button onClick={check} disabled={answers[idx] === null || answers[idx] === undefined}>
              <Check className="h-4 w-4" /> Check answer
            </Button>
          ) : isLast ? (
            <Button variant="success" onClick={() => setFinished(true)}>
              See results
            </Button>
          ) : (
            <Button onClick={goNext}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> navigate ·{" "}
        <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> choose ·{" "}
        <kbd className="font-sans">Enter</kbd> continue · <kbd className="font-sans">S</kbd> skip
      </p>
    </div>
  );
}
