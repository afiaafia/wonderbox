import { RotateCcw, Trophy } from 'lucide-react';

type GameResultProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  bestLabel?: string;
  bestValue?: string | number | null;
};

export function GameResult({
  eyebrow,
  title,
  description,
  primaryLabel,
  onPrimary,
  bestLabel,
  bestValue,
}: GameResultProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background">
      <div className="p-6 text-center sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {bestLabel ? (
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
              <Trophy className="size-4" aria-hidden="true" />

              <span className="text-muted-foreground">{bestLabel}</span>

              <span className="font-semibold">{bestValue ?? '—'}</span>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onPrimary}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            <RotateCcw className="size-4" aria-hidden="true" />

            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
