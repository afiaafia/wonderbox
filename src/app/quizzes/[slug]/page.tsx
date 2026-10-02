import { notFound } from 'next/navigation';

import { SectionHeading } from '@/components/shared/section-heading';
import { getQuizBySlug, quizzes, QuizPlayer } from '@/features/quizzes';

type QuizPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    return {
      title: 'Quiz Not Found | WonderBox',
    };
  }

  return {
    title: `${quiz.title} | WonderBox`,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-5xl px-6 py-14 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow={quiz.eyebrow}
        title={quiz.title}
        description={quiz.description}
      />

      <div className="mt-10 sm:mt-12">
        <QuizPlayer quiz={quiz} />
      </div>
    </main>
  );
}
