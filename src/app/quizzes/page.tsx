'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const questions = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    answer: 'Mars',
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    answer: '7',
  },
  {
    question: 'Which language runs directly in most web browsers?',
    options: ['Python', 'C++', 'JavaScript', 'Rust'],
    answer: 'JavaScript',
  },
];

export default function QuizzesPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[current];
  const finished = current === questions.length - 1 && selected !== null;

  function select(option: string) {
    if (selected) return;

    setSelected(option);

    if (option === question.answer) {
      setScore((value) => value + 1);
    }
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Quiz World
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Quick Trivia
      </h1>

      <p className="mt-5 text-lg text-muted-foreground">
        Test yourself with a few quick questions.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
        {finished ? (
          <div className="py-10 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Quiz complete
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {score}/{questions.length}
            </h2>

            <button
              type="button"
              onClick={restart}
              className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>

            <h2 className="mt-8 text-2xl font-semibold sm:text-3xl">
              {question.question}
            </h2>

            <div className="mt-8 grid gap-3">
              {question.options.map((option) => {
                const isSelected = selected === option;
                const isCorrect = selected && option === question.answer;
                const isWrong = isSelected && option !== question.answer;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => select(option)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-medium ${
                      isCorrect
                        ? 'border-foreground bg-muted'
                        : isWrong
                          ? 'border-border bg-muted'
                          : 'border-border hover:bg-muted'
                    }`}
                  >
                    {option}

                    {isCorrect && <CheckCircle2 className="size-5" />}
                    {isWrong && <XCircle className="size-5" />}
                  </button>
                );
              })}
            </div>

            {selected && (
              <button
                type="button"
                onClick={next}
                className="mt-8 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
              >
                Next question
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
