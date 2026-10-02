import Link from 'next/link';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

type GameHeaderProps = {
  category: string;
  title: string;
  description: string;
};

export function GameHeader({ category, title, description }: GameHeaderProps) {
  return (
    <header className="mb-10">
      <Link
        href="/play"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Play
      </Link>

      <div className="mt-8 flex items-start gap-4">
        <div className="hidden size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card sm:flex">
          <Gamepad2 className="size-5" aria-hidden="true" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Play / {category}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
