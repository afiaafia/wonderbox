'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MousePointer2 } from 'lucide-react';

import { GameResult } from './game-result';

type ReactionPhase = 'idle' | 'waiting' | 'ready' | 'result' | 'false-start';

function getStoredBest() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem('wonderbox-reaction-best');

  if (!stored) {
    return null;
  }

  const value = Number(stored);

  return Number.isFinite(value) ? value : null;
}

export function ReactionTest() {
  const [phase, setPhase] = useState<ReactionPhase>('idle');

  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const [bestTime, setBestTime] = useState<number | null>(getStoredBest);

  const timerRef = useRef<number | null>(null);

  const readyAtRef = useRef<number | null>(null);

  const startRound = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setReactionTime(null);
    setPhase('waiting');
    readyAtRef.current = null;

    const delay = 1500 + Math.floor(Math.random() * 3000);

    timerRef.current = window.setTimeout(() => {
      readyAtRef.current = performance.now();

      setPhase('ready');
    }, delay);
  }, []);

  const resetGame = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = null;
    readyAtRef.current = null;

    setPhase('idle');
    setReactionTime(null);
  }, []);

  const handleAction = useCallback(() => {
    if (phase === 'idle' || phase === 'result' || phase === 'false-start') {
      startRound();
      return;
    }

    if (phase === 'waiting') {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = null;
      setPhase('false-start');
      return;
    }

    if (phase === 'ready' && readyAtRef.current !== null) {
      const measured = Math.round(performance.now() - readyAtRef.current);

      setReactionTime(measured);
      setPhase('result');

      if (bestTime === null || measured < bestTime) {
        window.localStorage.setItem(
          'wonderbox-reaction-best',
          String(measured)
        );

        setBestTime(measured);
      }
    }
  }, [bestTime, phase, startRound]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  let title = 'Ready when you are.';
  let description =
    'Start the test, wait for the signal, then react immediately.';
  let buttonLabel = 'Start test';

  if (phase === 'waiting') {
    title = 'Wait for it...';
    description = 'Do not click yet.';
    buttonLabel = "Don't click";
  }

  if (phase === 'ready') {
    title = 'CLICK!';
    description = 'The signal appeared. React now.';
    buttonLabel = 'CLICK';
  }

  if (phase === 'result') {
    title = `${reactionTime} ms`;
    description = 'Your measured reaction time is shown above.';
    buttonLabel = 'Try again';
  }

  if (phase === 'false-start') {
    title = 'Too early.';
    description = 'You clicked before the signal appeared.';
    buttonLabel = 'Try again';
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="rounded-full border border-border px-4 py-2 text-sm">
            Best:{' '}
            <span className="font-semibold">
              {bestTime !== null ? `${bestTime} ms` : '—'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Reset
        </button>
      </div>

      <button
        type="button"
        onClick={handleAction}
        className={[
          'mt-7 flex min-h-105 w-full flex-col items-center justify-center rounded-3xl border px-6 text-center transition-all duration-200',
          phase === 'ready'
            ? 'border-foreground bg-foreground text-background'
            : 'border-border bg-background hover:bg-muted',
        ].join(' ')}
      >
        <div className="flex size-16 items-center justify-center rounded-2xl border border-current/20">
          <MousePointer2 className="size-7" aria-hidden="true" />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
          Reaction Test
        </p>

        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}
        </h2>

        <p className="mt-5 max-w-md text-sm leading-7 opacity-60">
          {description}
        </p>

        <span className="mt-8 inline-flex rounded-full border border-current/20 px-6 py-3 text-sm font-semibold">
          {buttonLabel}
        </span>
      </button>

      {phase === 'result' ? (
        <GameResult
          eyebrow="Round complete"
          title={`${reactionTime} ms`}
          description="Run another round and try to improve your personal best."
          primaryLabel="Try again"
          onPrimary={startRound}
          bestLabel="Personal best"
          bestValue={bestTime !== null ? `${bestTime} ms` : '—'}
        />
      ) : null}

      {phase === 'false-start' ? (
        <GameResult
          eyebrow="False start"
          title="Too early."
          description="Wait for the signal before clicking."
          primaryLabel="Try again"
          onPrimary={startRound}
        />
      ) : null}
    </section>
  );
}
