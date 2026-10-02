'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Share2, Sparkles, Timer, Trophy } from 'lucide-react';

const DURATION = 10_000;
const STORAGE_KEY = 'wonderbox:tap-best';

type Phase = 'idle' | 'running' | 'finished';

function getBestScore() {
  if (typeof window === 'undefined') return 0;

  const value = Number(window.localStorage.getItem(STORAGE_KEY));
  return Number.isSafeInteger(value) && value > 0 ? value : 0;
}

export function TapChallenge() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [remaining, setRemaining] = useState(DURATION);
  const [shared, setShared] = useState('');

  const startedAt = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    setBest(getBestScore());
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      const next = Math.max(0, DURATION - elapsed);

      setRemaining(next);

      if (next === 0) {
        const finalScore = scoreRef.current;
        const currentBest = getBestScore();

        setScore(finalScore);
        setBest(Math.max(currentBest, finalScore));

        if (finalScore > currentBest) {
          window.localStorage.setItem(STORAGE_KEY, String(finalScore));
        }

        setPhase('finished');
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [phase]);

  function start() {
    scoreRef.current = 0;
    startedAt.current = Date.now();

    setScore(0);
    setRemaining(DURATION);
    setShared('');
    setPhase('running');
  }

  function tap() {
    if (phase !== 'running') return;

    if (Date.now() - startedAt.current >= DURATION) {
      setRemaining(0);
      setPhase('finished');
      return;
    }

    scoreRef.current += 1;
    setScore(scoreRef.current);
  }

  async function share() {
    const text = `I scored ${score} taps in WonderBox's 10-Second Tap Challenge. Can you beat me? ${window.location.origin}/play`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'WonderBox Tap Challenge',
          text,
        });
        setShared('Shared successfully.');
      } else {
        await navigator.clipboard.writeText(text);
        setShared('Result copied to clipboard.');
      }
    } catch {
      setShared('Sharing was cancelled or unavailable.');
    }
  }

  const seconds = Math.ceil(remaining / 1000);

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4" />
          Quick reflexes, big score
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Timer className="size-4" />
          10 seconds
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_18rem]">
        <div className="flex flex-col items-center bg-muted/20 px-6 py-10 text-center">
          <div className="flex size-28 flex-col items-center justify-center rounded-full border-8 border-background bg-background shadow-sm">
            <span className="text-4xl font-bold tabular-nums">{seconds}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              seconds
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {phase === 'idle'
              ? 'Ready, set, tap.'
              : phase === 'running'
                ? 'Keep it going!'
                : "Time's up!"}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {phase === 'idle'
              ? 'Press start and tap as fast as you can.'
              : phase === 'running'
                ? 'Every tap counts.'
                : `You scored ${score} ${score === 1 ? 'tap' : 'taps'}.`}
          </p>

          <button
            type="button"
            onClick={tap}
            disabled={phase !== 'running'}
            className="mt-8 flex aspect-square w-full max-w-xs flex-col items-center justify-center rounded-full border-[10px] border-lime-100 bg-lime-300 text-zinc-950 transition-transform hover:bg-lime-200 active:scale-95 disabled:cursor-not-allowed disabled:border-muted disabled:bg-muted disabled:text-muted-foreground"
          >
            <span className="text-5xl font-black uppercase">
              {phase === 'running' ? 'Tap!' : 'Tap'}
            </span>

            <span className="mt-1 text-xs font-semibold uppercase tracking-widest">
              {phase === 'running' ? 'Tap fast' : '10 seconds'}
            </span>
          </button>

          {phase === 'idle' && (
            <button
              type="button"
              onClick={start}
              className="mt-7 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
            >
              Start challenge
            </button>
          )}

          {phase === 'finished' && (
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
              >
                <RotateCcw className="size-4" />
                Play again
              </button>

              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold"
              >
                <Share2 className="size-4" />
                Share result
              </button>
            </div>
          )}

          <p className="mt-4 min-h-5 text-xs text-muted-foreground">{shared}</p>
        </div>

        <aside className="border-t border-border p-6 md:border-l md:border-t-0">
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <Trophy className="size-4" />
              Personal best
            </div>

            <p className="mt-4 text-4xl font-bold tabular-nums">{best}</p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Your best score is saved on this device.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
