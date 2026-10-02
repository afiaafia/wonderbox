'use client';

import { useEffect, useState } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

import { GameResult } from './game-result';

type PuzzleCell = {
  id: number;
  isOdd: boolean;
};

const GRID_SIZE = 25;
const STARTING_TIME = 30;

function createBoard(): PuzzleCell[] {
  const oddIndex = Math.floor(Math.random() * GRID_SIZE);

  return Array.from({ length: GRID_SIZE }, (_, index) => ({
    id: index,
    isOdd: index === oddIndex,
  }));
}

function getStoredBest() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem('wonderbox-odd-one-out-best');

  if (!stored) {
    return null;
  }

  const value = Number(stored);

  return Number.isFinite(value) ? value : null;
}

export function OddOneOut() {
  const [board, setBoard] = useState<PuzzleCell[]>(() => createBoard());

  const [phase, setPhase] = useState<'idle' | 'playing' | 'finished'>('idle');

  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);

  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [bestScore, setBestScore] = useState<number | null>(getStoredBest);

  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          setPhase('finished');

          if (bestScore === null || score > bestScore) {
            window.localStorage.setItem(
              'wonderbox-odd-one-out-best',
              String(score)
            );

            setBestScore(score);
          }

          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [phase, bestScore, score]);

  function startGame() {
    setBoard(createBoard());
    setScore(0);
    setMistakes(0);
    setTimeLeft(STARTING_TIME);
    setPhase('playing');
  }

  function handleCellClick(cell: PuzzleCell) {
    if (phase !== 'playing') {
      return;
    }

    if (cell.isOdd) {
      setScore((currentScore) => currentScore + 1);

      setBoard(createBoard());
      return;
    }

    setMistakes((currentMistakes) => currentMistakes + 1);
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Time: <span className="font-semibold">{timeLeft}s</span>
        </div>

        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Score: <span className="font-semibold">{score}</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <Trophy className="size-4" aria-hidden="true" />
          Best: <span className="font-semibold">{bestScore ?? '—'}</span>
        </div>

        <button
          type="button"
          onClick={startGame}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {phase === 'playing' ? 'Restart' : 'Start'}
        </button>
      </div>

      <div className="mx-auto mt-8 grid max-w-xl grid-cols-5 gap-2 sm:gap-3">
        {board.map((cell) => (
          <button
            key={cell.id}
            type="button"
            disabled={phase !== 'playing'}
            onClick={() => handleCellClick(cell)}
            className="aspect-square rounded-2xl border border-border bg-background p-2 transition-transform duration-150 hover:scale-[1.03] hover:bg-muted disabled:cursor-default disabled:hover:scale-100"
            aria-label="Find the odd tile"
          >
            <span className="flex h-full items-center justify-center">
              {cell.isOdd ? (
                <span className="size-5 rounded-full bg-foreground sm:size-7" />
              ) : (
                <span className="size-7 rounded-full border-[3px] border-foreground sm:size-9" />
              )}
            </span>
          </button>
        ))}
      </div>

      {phase === 'idle' ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Find as many odd tiles as possible in {STARTING_TIME} seconds.
        </p>
      ) : null}

      {phase === 'finished' ? (
        <GameResult
          eyebrow="Time's up"
          title={`Score: ${score}`}
          description={`You found ${score} odd tiles and made ${mistakes} incorrect clicks.`}
          primaryLabel="Play again"
          onPrimary={startGame}
          bestLabel="Best score"
          bestValue={bestScore}
        />
      ) : null}
    </section>
  );
}
