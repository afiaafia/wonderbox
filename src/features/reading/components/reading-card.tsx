import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';

import type { ReadingItem } from '../types';

type ReadingCardProps = {
  item: ReadingItem;
};

const typeLabels: Record<ReadingItem['type'], string> = {
  book: 'Book',
  story: 'Story',
  poem: 'Poem',
  novel: 'Novel',
  news: 'News',
  article: 'Article',
  pdf: 'PDF',
  'daily-update': 'Daily Update',
};

export function ReadingCard({ item }: ReadingCardProps) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          <BookOpen className="size-4" />
        </div>

        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
          {typeLabels[item.type]}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="text-xs text-muted-foreground">
          {item.author ?? item.source ?? 'WonderBox'}
        </div>

        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
