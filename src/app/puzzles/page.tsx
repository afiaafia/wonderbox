'use client';

import { useState } from 'react';
import { Check, Lightbulb, RotateCcw } from 'lucide-react';

const riddles = [
  {
    question: 'What has keys but cannot open locks?',
    answer: 'A piano.',
  },
  {
    question: 'What gets wetter the more it dries?',
    answer: 'A towel.',
  },
  {
    question: 'What has a face and two hands but no arms or legs?',
    answer: 'A clock.',
  },
  {
    question: 'What can travel around the world while staying in one corner?',
    answer: 'A stamp.',
  },
  {
    question: 'What has many teeth but cannot bite?',
    answer: 'A comb.',
  },
  {
    question: 'What has a neck but no head?',
    answer: 'A bottle.',
  },
  {
    question: 'What comes down but never goes up?',
    answer: 'Rain.',
  },
  {
    question: 'What has one eye but cannot see?',
    answer: 'A needle.',
  },
];

export default function PuzzlesPage() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [solved, setSolved] = useState(0);

  const puzzle = riddles[index];
  const complete = index === riddles.length - 1 && revealed;

  function reveal() {
    if (!revealed) {
      setRevealed(true);
      setSolved((value) => value + 1);
    }
  }

  function next() {
    if (index < riddles.length - 1) {
      setIndex((value) => value + 1);
      setRevealed(false);
    }
  }

  function restart() {
    setIndex(0);
    setRevealed(false);
    setSolved(0);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Puzzle World
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Think twice.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Riddles and brain teasers for curious minds.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
        {complete ? (
          <div className="py-12 text-center">
            <Check className="mx-auto size-10" />

            <p className="mt-5 text-sm uppercase tracking-widest text-muted-foreground">
              Puzzle session complete
            </p>

            <h2 className="mt-3 text-5xl font-semibold">
              {solved}/{riddles.length}
            </h2>

            <button
              type="button"
              onClick={restart}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
            >
              <RotateCcw className="size-4" />
              Start again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lightbulb className="size-5" />
                Puzzle {index + 1} of {riddles.length}
              </div>

              <span className="text-sm text-muted-foreground">
                Solved: {solved}
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-foreground transition-all"
                style={{
                  width: `${((index + 1) / riddles.length) * 100}%`,
                }}
              />
            </div>

            <h2 className="mt-10 max-w-3xl text-2xl font-semibold leading-relaxed sm:text-3xl">
              {puzzle.question}
            </h2>

            {revealed ? (
              <div className="mt-8 rounded-2xl bg-muted p-5">
                <p className="text-sm text-muted-foreground">Answer</p>
                <p className="mt-2 text-xl font-semibold">{puzzle.answer}</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={reveal}
                className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
              >
                Reveal answer
              </button>
            )}

            {revealed && index < riddles.length - 1 && (
              <button
                type="button"
                onClick={next}
                className="mt-6 rounded-full border border-border px-6 py-3 text-sm font-semibold"
              >
                Next puzzle
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
