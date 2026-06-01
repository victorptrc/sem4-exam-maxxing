import useSound from "use-sound";
import correctSfx from "@/assets/sounds/correct.wav";
import wrongSfx from "@/assets/sounds/wrong.wav";
import milestoneSfx from "@/assets/sounds/milestone.wav";

/**
 * Quiz sound effects via `use-sound` (wraps Howler). `enabled` mirrors the mute
 * preference and `volume` (0..1) the volume slider — both update the underlying
 * Howl reactively.
 */
export function useQuizSounds(enabled: boolean, volume: number) {
  const opts = { volume, soundEnabled: enabled };
  const [playCorrect] = useSound(correctSfx, opts);
  const [playWrong] = useSound(wrongSfx, opts);
  const [playMilestone] = useSound(milestoneSfx, { ...opts, volume: Math.min(1, volume * 1.1) });
  return { playCorrect, playWrong, playMilestone };
}
