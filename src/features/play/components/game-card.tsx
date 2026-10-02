import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { GameCardData } from '../types';

type GameCardProps = GameCardData;

export function GameCard({
  title,
  description,
  category,
  href,
  icon: Icon,
  status,
}: GameCardProps) {
  const available = status === 'available';

  const content = (
    <div
      className={[
        'group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-200',
        available ? 'hover:-translate-y-1 hover:bg-muted/40' : 'opacity-70',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-muted">
          <Icon aria-hidden="true" className="size-5" />
        </span>

        {available ? (
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ) : (
          <span className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Soon
          </span>
        )}
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {category}
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <p className="mt-6 text-sm font-medium">
        {available ? 'Play now →' : 'Coming soon'}
      </p>
    </div>
  );

  if (!available) {
    return <div className="h-full">{content}</div>;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
