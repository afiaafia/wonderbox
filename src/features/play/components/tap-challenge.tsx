'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { RotateCcw, Share2, Sparkles, Timer, Trophy } from 'lucide-react';

const CHALLENGE_DURATION_MS = 10_000;
const PERSONAL_BEST_KEY = 'wonderbox:play:tap-challenge:personal-best';
const PERSONAL_BEST_EVENT = 'wonderbox:tap-challenge-personal-best-change';

type ChallengePhase = 'idle' | 'running' | 'finished';

function getPersonalBest() {
  try {
    const savedBest = Number(window.localStorage.getItem(PERSONAL_BEST_KEY));

    return Number.isSafeInteger(savedBest) && savedBest > 0 ? savedBest : 0;
  } catch {
    return 0;
  }
}

function getServerSnapshot() {
  return 0;
}

function subscribeToPersonalBest(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(PERSONAL_BEST_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(PERSONAL_BEST_EVENT, onChange);
  };
}

function savePersonalBest(score: number) {
  if (score <= getPersonalBest()) {
    return;
  }

  try {
    window.localStorage.setItem(PERSONAL_BEST_KEY, String(score));

    window.dispatchEvent(new Event(PERSONAL_BEST_EVENT));
  } catch {
    // The round remains playable when browser storage is unavailable.
  }
}

export function TapChallenge() {
  const [phase, setPhase] = useState<ChallengePhase>('idle');
  const [remainingMs, setRemainingMs] = useState(CHALLENGE_DURATION_MS);
  const [tapCount, setTapCount] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [earnedNewBest, setEarnedNewBest] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  const personalBest = useSyncExternalStore(
    subscribeToPersonalBest,
    getPersonalBest,
    getServerSnapshot
  );

  const startedAt = useRef(0);
  const tapCountRef = useRef(0);

  useEffect(() => {
    if (phase !== 'running') {
      return;
    }

    const tick = () => {
      const nextRemainingMs = Math.max(
        0,
        CHALLENGE_DURATION_MS - (Date.now() - startedAt.current)
      );

      setRemainingMs(nextRemainingMs);

      if (nextRemainingMs === 0) {
        const score = tapCountRef.current;

        setFinalScore(score);
        setEarnedNewBest(score > getPersonalBest());
        savePersonalBest(score);
        setPhase('finished');
      }
    };

    tick();

    const intervalId = window.setInterval(tick, 40);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [phase]);

  function startChallenge() {
    tapCountRef.current = 0;

    setTapCount(0);
    setFinalScore(0);
    setEarnedNewBest(false);
    setRemainingMs(CHALLENGE_DURATION_MS);
    setShareMessage('');

    startedAt.current = Date.now();

    setPhase('running');
  }

  function finishChallenge() {
    const score = tapCountRef.current;

    setRemainingMs(0);
    setFinalScore(score);
    setEarnedNewBest(score > getPersonalBest());
    savePersonalBest(score);
    setPhase('finished');
  }

  function handleTap() {
    if (phase !== 'running') {
      return;
    }

    if (Date.now() - startedAt.current >= CHALLENGE_DURATION_MS) {
      finishChallenge();
      return;
    }

    tapCountRef.current += 1;

    setTapCount(tapCountRef.current);
  }

  async function handleShare() {
    const result =
      `I scored ${finalScore} ${
        finalScore === 1 ? 'tap' : 'taps'
      } in WonderBox's 10-Second Tap Challenge. ` +
      `Can you beat me? ${window.location.origin}/play`;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'My WonderBox Tap Challenge score',
          text: result,
        });

        setShareMessage('Your result is ready to share.');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          setShareMessage('');
        } else {
          setShareMessage('Sharing is unavailable right now.');
        }
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(result);

      setShareMessage('Result copied to your clipboard.');
    } catch {
      setShareMessage('Clipboard access is unavailable in this browser.');
    }
  }

  const secondsLeft = Math.ceil(remainingMs / 1000);

  const progress = (remainingMs / CHALLENGE_DURATION_MS) * 100;

  const isNewBest = phase === 'finished' && earnedNewBest;

  return (
    <section
      aria-labelledby="tap-challenge-title"
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="flex size-8 items-center justify-center rounded-full bg-muted">
            <Sparkles aria-hidden="true" className="size-4" />
          </span>
          Quick reflexes, big score
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <Timer aria-hidden="true" className="size-3.5" />
          10 seconds
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="bg-muted/30 p-5 sm:p-8">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <div
              role="timer"
              aria-label={`${secondsLeft} ${
                secondsLeft === 1 ? 'second' : 'seconds'
              } remaining`}
              aria-live="off"
              className="relative mb-5 flex size-28 items-center justify-center rounded-full border-8 border-background bg-background shadow-sm sm:size-32"
            >
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${(progress / 100) * 289} 289`}
                  strokeLinecap="round"
                  strokeWidth="3"
                  className="text-foreground transition-[stroke-dasharray] duration-100"
                />
              </svg>

              <span className="text-center">
                <span className="block text-4xl font-semibold tabular-nums tracking-tight">
                  {secondsLeft}
                </span>

                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  seconds
                </span>
              </span>
            </div>

            <h2
              id="tap-challenge-title"
              className="text-xl font-semibold tracking-tight"
            >
              {phase === 'idle'
                ? 'Ready, set, tap.'
                : phase === 'running'
                  ? 'Keep it going!'
                  : "Time's up!"}
            </h2>

            <p
              id="tap-challenge-instructions"
              className="mt-2 min-h-6 text-sm text-muted-foreground"
            >
              {phase === 'idle'
                ? 'Press start, then tap the button as fast as you can.'
                : phase === 'running'
                  ? 'Every tap counts. Keep going until the timer ends.'
                  : 'That was quick. See if you can beat your score.'}
            </p>

            <button
              type="button"
              onClick={handleTap}
              disabled={phase !== 'running'}
              aria-describedby="tap-challenge-instructions"
              className={[
                'mt-7 flex aspect-square w-full max-w-[15rem] touch-manipulation select-none flex-col items-center justify-center rounded-full border-[10px] border-lime-100 bg-lime-300 text-zinc-950 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.35)] transition-transform duration-100 sm:max-w-[17rem]',
                phase === 'running'
                  ? 'cursor-pointer hover:bg-lime-200 active:scale-95'
                  : 'cursor-not-allowed border-muted bg-muted text-muted-foreground shadow-none',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/40',
              ].join(' ')}
            >
              <span className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
                {phase === 'running' ? 'Tap!' : 'Tap'}
              </span>

              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                {phase === 'running' ? 'Tap fast' : '10 seconds'}
              </span>
            </button>

            <p className="mt-5 text-sm text-muted-foreground">
              {phase === 'running' ? (
                <>
                  <span className="font-semibold tabular-nums text-foreground">
                    {tapCount}
                  </span>{' '}
                  {tapCount === 1 ? 'tap' : 'taps'} so far
                </>
              ) : phase === 'finished' ? (
                <>
                  You scored{' '}
                  <span className="font-semibold tabular-nums text-foreground">
                    {finalScore}
                  </span>{' '}
                  {finalScore === 1 ? 'tap' : 'taps'}
                </>
              ) : (
                'Your score will appear here.'
              )}
            </p>

            {phase === 'idle' ? (
              <button
                type="button"
                onClick={startChallenge}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
              >
                Start challenge
              </button>
            ) : null}

            {phase === 'finished' ? (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={startChallenge}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Play again
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <Share2 aria-hidden="true" className="size-4" />
                  Share result
                </button>
              </div>
            ) : null}

            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-5 text-xs text-muted-foreground"
            >
              {shareMessage}
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-3 border-t border-border p-5 sm:p-6 md:border-l md:border-t-0">
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <Trophy aria-hidden="true" className="size-4" />
              Personal best
            </div>

            <p className="mt-4 text-4xl font-semibold tabular-nums tracking-tight">
              {personalBest}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {personalBest === 1 ? 'tap' : 'taps'}
              </span>
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Saved on this device, so it’ll be here next time.
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-2xl bg-foreground p-5 text-background">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-background/60">
              {isNewBest ? 'New personal best' : 'Your score'}
            </p>

            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {phase === 'finished'
                ? finalScore
                : phase === 'running'
                  ? tapCount
                  : '—'}
            </p>

            <p className="mt-2 text-xs leading-5 text-background/60">
              {phase === 'finished'
                ? isNewBest
                  ? 'A new record to celebrate.'
                  : 'Every round is a fresh chance.'
                : 'Your round score will show here.'}
            </p>
          </div>
        </aside>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {phase === 'running'
          ? 'Challenge started. Tap as fast as you can.'
          : phase === 'finished'
            ? `Challenge complete. Your score is ${finalScore} ${
                finalScore === 1 ? 'tap' : 'taps'
              }.`
            : 'Challenge ready. Press Start challenge when you are ready.'}
      </p>
    </section>
  );
}
