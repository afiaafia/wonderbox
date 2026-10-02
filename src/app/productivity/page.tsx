'use client';

import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const FOCUS_TIME = 25 * 60;

export default function ProductivityPage() {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  function reset() {
    setRunning(false);
    setSeconds(FOCUS_TIME);
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Productivity World
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Focus mode.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        A simple 25-minute focus timer. Start a session, stay with one task, and
        take a break when the timer ends.
      </p>

      <section className="mt-12 flex flex-col items-center rounded-3xl border border-border bg-card px-6 py-12">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {running
            ? 'Focus session'
            : seconds === 0
              ? 'Session complete'
              : 'Ready'}
        </p>

        <p className="mt-6 text-7xl font-semibold tabular-nums tracking-tight sm:text-8xl">
          {String(minutes).padStart(2, '0')}:
          {String(remainingSeconds).padStart(2, '0')}
        </p>

        <div className="mt-10 flex gap-3">
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            disabled={seconds === 0}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background disabled:opacity-50"
          >
            {running ? (
              <>
                <Pause className="size-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="size-4" />
                Start
              </>
            )}
          </button>

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
