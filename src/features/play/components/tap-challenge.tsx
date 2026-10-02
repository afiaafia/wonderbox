'use client';

import { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';

import { GameResult } from './game-result';

const DURATION = 10;

type Phase = 'idle' | 'running' | 'finished';

function getStoredBest() {
  if (typeof window === 'undefined') {
    return 0;
  }

  const saved = Number(window.localStorage.getItem('wonderbox-tap-best'));

  return Number.isFinite(saved) ? saved : 0;
}

export function TapChallenge() {
  const [phase, setPhase] = useState<Phase>('idle');

  const [timeLeft, setTimeLeft] = useState(DURATION);

  const [score, setScore] = useState(0);

  const [best, setBest] = useState<number>(getStoredBest);

  const scoreRef = useRef(0);

  useEffect(() => {
    if (phase !== 'running') {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);

          const finalScore = scoreRef.current;

          setScore(finalScore);
          setPhase('finished');

          setBest((currentBest) => {
            if (finalScore <= currentBest) {
              return currentBest;
            }

            window.localStorage.setItem(
              'wonderbox-tap-best',
              String(finalScore)
            );

            return finalScore;
          });

          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  function start() {
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(DURATION);
    setPhase('running');
  }

  function tap() {
    if (phase !== 'running') {
      return;
    }

    scoreRef.current += 1;
    setScore(scoreRef.current);
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Reflex Game
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            10-Second Tap Challenge
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <Trophy className="size-4" aria-hidden="true" />
          Best: <strong>{best}</strong>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          {phase === 'idle'
            ? 'Ready? Tap as fast as you can.'
            : phase === 'running'
              ? 'Keep tapping!'
              : 'Time is up.'}
        </p>

        <div className="mt-6 flex justify-center gap-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Time
            </p>

            <p className="mt-1 text-4xl font-semibold tabular-nums">
              {timeLeft}s
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Score
            </p>

            <p className="mt-1 text-4xl font-semibold tabular-nums">{score}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={tap}
          disabled={phase !== 'running'}
          className="mx-auto mt-10 flex aspect-square w-64 items-center justify-center rounded-full border-8 border-lime-200 bg-lime-300 text-4xl font-black uppercase tracking-tight text-zinc-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {phase === 'running' ? 'Tap!' : 'Tap'}
        </button>

        {phase === 'idle' ? (
          <button
            type="button"
            onClick={start}
            className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
          >
            Start challenge
          </button>
        ) : null}

        {phase === 'finished' ? (
          <div className="mt-8">
            <GameResult
              eyebrow="Challenge complete"
              title={`${score} taps`}
              description="Run it again and try to beat your personal best."
              primaryLabel="Play again"
              onPrimary={start}
              bestLabel="Best score"
              bestValue={best}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
