'use client';

import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const FOCUS_TIME = 25 * 60;

export default function ProductivityPage() {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          setSessions((count) => count + 1);
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  function reset() {
    setRunning(false);
    setSeconds(FOCUS_TIME);
  }

  function startNewSession() {
    setSeconds(FOCUS_TIME);
    setRunning(true);
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const progress = ((FOCUS_TIME - seconds) / FOCUS_TIME) * 100;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Productivity World
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Focus mode.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        One task. Twenty-five minutes. No distractions.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {seconds === 0
              ? 'Session complete'
              : running
                ? 'Focus session'
                : 'Ready'}
          </p>

          <p className="mt-6 text-7xl font-semibold tabular-nums tracking-tight sm:text-8xl">
            {String(minutes).padStart(2, '0')}:
            {String(remainingSeconds).padStart(2, '0')}
          </p>

          <div className="mt-8 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-foreground transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-10 flex justify-center gap-3">
            {seconds === 0 ? (
              <button
                type="button"
                onClick={startNewSession}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
              >
                <Play className="size-4" />
                Start another
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setRunning((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
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
            )}

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Completed sessions: {sessions}
          </p>
        </div>
      </section>
    </main>
  );
}
