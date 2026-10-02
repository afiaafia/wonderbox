'use client';

import { useState } from 'react';
import { Lightbulb, RotateCcw } from 'lucide-react';

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
];

export default function PuzzlesPage() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const riddle = riddles[index];

  function nextRiddle() {
    setIndex((current) => (current + 1) % riddles.length);
    setShowAnswer(false);
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
        Logic problems, riddles, brain teasers, and small challenges for curious
        minds.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="flex items-center gap-3 text-sm font-medium">
          <Lightbulb className="size-5" />
          Riddle {index + 1} of {riddles.length}
        </div>

        <h2 className="mt-8 max-w-3xl text-2xl font-semibold leading-relaxed sm:text-3xl">
          {riddle.question}
        </h2>

        {showAnswer ? (
          <div className="mt-8 rounded-2xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">Answer</p>
            <p className="mt-2 text-lg font-semibold">{riddle.answer}</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
          >
            Reveal answer
          </button>
        )}

        <button
          type="button"
          onClick={nextRiddle}
          className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-4" />
          Next riddle
        </button>
      </section>
    </main>
  );
}
