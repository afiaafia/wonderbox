import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getReadingItemBySlug } from '@/server/reading/reading.service';

type ReadingDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const typeLabels = {
  book: 'Book',
  story: 'Story',
  poem: 'Poem',
  novel: 'Novel',
  news: 'News',
  article: 'Article',
  pdf: 'PDF',
  'daily-update': 'Daily Update',
} as const;

export default async function ReadingDetailPage({
  params,
}: ReadingDetailPageProps) {
  const { slug } = await params;

  const item = await getReadingItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const typeLabel = typeLabels[item.type];

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 lg:px-8 lg:py-20">
      <Link
        href="/reading"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Reading
      </Link>

      <article className="mt-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium">
            <BookOpen className="size-3.5" />
            {typeLabel}
          </span>

          {item.source ? (
            <span className="text-sm text-muted-foreground">{item.source}</span>
          ) : null}
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {item.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {item.author ? <span>By {item.author}</span> : null}
          <span>WonderBox Reading</span>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-muted-foreground">
              {item.description}
            </p>
          </div>

          <div className="my-10 h-px bg-border" />

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <h2>About this piece</h2>

            <p>
              This reading entry is part of the WonderBox Reading World — a
              place to discover books, stories, poems, news, articles, and other
              things worth opening.
            </p>

            <p>
              More reading content will be added here as WonderBox grows. The
              catalog, metadata, and reading experience are already connected to
              the WonderBox database.
            </p>
          </div>

          {item.sourceUrl ? (
            <div className="mt-10">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Open original source
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
