import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** A flat, illustrated flame (Duolingo-style) with the streak number on it. */
function FlameSvg({ lit, className }: { lit: boolean; className?: string }) {
  const top = lit ? "#FFB02E" : "#DCE0E6";
  const bot = lit ? "#FF6A00" : "#C2C7CF";
  return (
    <svg viewBox="0 0 100 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameOuter" x1="50" y1="6" x2="50" y2="118" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bot} />
        </linearGradient>
      </defs>
      <path
        d="M50 6 C70 34 90 48 86 78 C82 104 66 118 50 118 C34 118 18 104 14 78 C10 48 30 34 50 6 Z"
        fill="url(#flameOuter)"
      />
    </svg>
  );
}

/**
 * The streak card that sits next to the quiz card — a drawn flame with the
 * current streak count on it. Lit/colored once you're answering correctly,
 * greyed-out at zero. Pops on each increment.
 */
export function StreakCard({ streak }: { streak: number }) {
  const lit = streak > 0;
  const label =
    streak >= 5 ? "On fire!" : streak >= 2 ? "On a roll" : streak === 1 ? "Streak" : "No streak";

  return (
    <div className="flex w-[150px] select-none flex-col items-center rounded-2xl border bg-card p-4 shadow-sm">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Streak
      </p>
      <motion.div
        key={streak}
        initial={{ scale: 0.7 }}
        animate={{ scale: [1.22, 1] }}
        transition={{ type: "spring", stiffness: 480, damping: 16 }}
        className="relative"
      >
        <FlameSvg lit={lit} className={cn("h-24 w-20", lit && "flame-idle")} />
        <span
          className={cn(
            "absolute inset-0 flex items-end justify-center pb-5 text-2xl font-extrabold",
            lit ? "text-white" : "text-muted-foreground"
          )}
          style={lit ? { textShadow: "0 1px 2px rgba(0,0,0,.28)" } : undefined}
        >
          {streak}
        </span>
      </motion.div>
      <p className={cn("mt-1 text-xs font-bold", lit ? "text-orange-500" : "text-muted-foreground")}>
        {label}
      </p>
    </div>
  );
}
