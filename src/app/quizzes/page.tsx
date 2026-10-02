import Link from 'next/link';
import { ArrowUpRight, Brain, Sparkles, Trophy } from 'lucide-react';

import { SectionHeading } from '@/components/shared/section-heading';
import { quizzes } from '@/features/quizzes';

export default function QuizzesPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-5xl px-6 py-14 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Quiz World"
        title="Ask a question. Get a result."
        description="Quick personality tests, trivia, and playful challenges built for one more round."
      />

      <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2">
        {quizzes.map((quiz) => {
          const isPersonality = quiz.type === 'personality';

          return (
            <Link
              key={quiz.slug}
              href={`/quizzes/${quiz.slug}`}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                  {isPersonality ? (
                    <Brain aria-hidden="true" className="size-5" />
                  ) : (
                    <Trophy aria-hidden="true" className="size-5" />
                  )}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {quiz.eyebrow}
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {quiz.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {quiz.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {quiz.questions.length} questions
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-muted/30 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          WonderBox rule
        </p>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          These quizzes are designed as entertainment and self-reflection, not
          scientific assessments or predictions.
        </p>
      </div>
    </main>
  );
}
