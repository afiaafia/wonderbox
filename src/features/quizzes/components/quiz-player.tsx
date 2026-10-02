'use client';

import { useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Share2,
  Sparkles,
  Trophy,
} from 'lucide-react';

import type { PersonalityQuizDefinition, QuizDefinition } from '../types';

type QuizPlayerProps = {
  quiz: QuizDefinition;
};

type AnswerMap = Record<string, string>;

function getPersonalityResult(
  quiz: PersonalityQuizDefinition,
  answers: AnswerMap
) {
  const counts = Object.values(answers).reduce<Record<string, number>>(
    (accumulator, resultKey) => {
      accumulator[resultKey] = (accumulator[resultKey] ?? 0) + 1;

      return accumulator;
    },
    {}
  );

  const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!winner) {
    return null;
  }

  return quiz.results[winner];
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<AnswerMap>({});

  const [finished, setFinished] = useState(false);

  const [shareMessage, setShareMessage] = useState('');

  const currentQuestion = quiz.questions[currentIndex];

  const totalQuestions = quiz.questions.length;

  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const personalityResult =
    quiz.type === 'personality' ? getPersonalityResult(quiz, answers) : null;

  const triviaScore = useMemo(() => {
    if (quiz.type !== 'trivia') {
      return 0;
    }

    return quiz.questions.reduce(
      (score, question) =>
        score + (answers[question.id] === question.correctOptionId ? 1 : 0),
      0
    );
  }, [answers, quiz]);

  function selectAnswer(answerId: string) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: answerId,
    }));

    setShareMessage('');
  }

  function goNext() {
    if (!selectedAnswer) {
      return;
    }

    if (currentIndex === totalQuestions - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((current) => current + 1);
  }

  function goBack() {
    setShareMessage('');

    setCurrentIndex((current) => Math.max(0, current - 1));
  }

  function restart() {
    setCurrentIndex(0);
    setAnswers({});
    setFinished(false);
    setShareMessage('');
  }

  async function shareResult() {
    let resultText = '';

    if (quiz.type === 'personality' && personalityResult) {
      resultText =
        `I got "${personalityResult.title}" on ` +
        `WonderBox's "${quiz.title}" quiz.`;
    }

    if (quiz.type === 'trivia') {
      resultText =
        `I scored ${triviaScore}/${totalQuestions} ` +
        `on WonderBox's "${quiz.title}" quiz.`;
    }

    const shareText =
      `${resultText} Can you beat my result? ` + `${window.location.href}`;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: quiz.title,
          text: shareText,
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
      await navigator.clipboard.writeText(shareText);

      setShareMessage('Result copied to your clipboard.');
    } catch {
      setShareMessage('Clipboard access is unavailable in this browser.');
    }
  }

  if (finished) {
    return (
      <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="p-6 sm:p-10">
          {quiz.type === 'personality' && personalityResult ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted text-3xl">
                {personalityResult.emoji}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Your result
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                {personalityResult.title}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {personalityResult.description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Try again
                </button>

                <button
                  type="button"
                  onClick={shareResult}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <Share2 aria-hidden="true" className="size-4" />
                  Share result
                </button>
              </div>
            </div>
          ) : null}

          {quiz.type === 'trivia' ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
                <Trophy aria-hidden="true" className="size-7" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Final score
              </p>

              <p className="mt-2 text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
                {triviaScore}
                <span className="text-2xl text-muted-foreground">
                  /{totalQuestions}
                </span>
              </p>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {triviaScore === totalQuestions
                  ? 'Perfect score. You cleared the whole set.'
                  : triviaScore >= Math.ceil(totalQuestions * 0.7)
                    ? 'Strong round. There is always another score to chase.'
                    : 'Good start. Run it again and see what changes.'}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Try again
                </button>

                <button
                  type="button"
                  onClick={shareResult}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
                >
                  <Share2 aria-hidden="true" className="size-4" />
                  Share score
                </button>
              </div>
            </div>
          ) : null}

          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-5 text-center text-xs text-muted-foreground"
          >
            {shareMessage}
          </p>
        </div>
      </section>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4 sm:px-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="flex size-8 items-center justify-center rounded-full bg-muted">
              <Sparkles aria-hidden="true" className="size-4" />
            </span>
            Question {currentIndex + 1}
          </div>

          <span className="text-xs font-medium text-muted-foreground">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {currentQuestion.prompt}
          </h2>

          <div className="mt-7 grid gap-3">
            {currentQuestion.options.map((option) => {
              const selected = selectedAnswer === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectAnswer(option.id)}
                  aria-pressed={selected}
                  className={[
                    'flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border px-4 text-left text-sm font-medium transition-colors sm:px-5',
                    selected
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background hover:bg-muted',
                    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50',
                  ].join(' ')}
                >
                  <span>{option.label}</span>

                  {selected ? (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                      <Check aria-hidden="true" className="size-4" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!selectedAnswer}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50"
            >
              {currentIndex === totalQuestions - 1 ? 'See result' : 'Next'}

              {currentIndex === totalQuestions - 1 ? (
                <Trophy aria-hidden="true" className="size-4" />
              ) : (
                <ChevronRight aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
