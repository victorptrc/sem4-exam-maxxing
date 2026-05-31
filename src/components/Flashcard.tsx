import * as React from "react";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

/** A single click-to-flip flashcard. */
export function Flashcard({ front, back }: FlashcardProps) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className={cn("flashcard h-40 w-full text-left", flipped && "is-flipped")}
      aria-pressed={flipped}
    >
      <div className="flashcard-inner rounded-xl">
        <div className="flashcard-face rounded-xl border bg-card p-4 shadow-sm">
          <div className="w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Term</p>
            <p className="text-center text-lg font-semibold">{front}</p>
            <p className="mt-3 text-center text-xs text-muted-foreground">Click to flip</p>
          </div>
        </div>
        <div className="flashcard-face flashcard-back rounded-xl border border-primary/40 bg-primary/5 p-4 shadow-sm">
          <div className="w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Definition</p>
            <p className="text-center text-sm leading-relaxed">{back}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

interface FlashcardDeckProps {
  cards: { front: React.ReactNode; back: React.ReactNode }[];
}

/** A responsive grid of flashcards. */
export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  return (
    <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <Flashcard key={i} front={c.front} back={c.back} />
      ))}
    </div>
  );
}
