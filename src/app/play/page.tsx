import Link from 'next/link';
import { Gamepad2, Sparkles } from 'lucide-react';

import { SectionHeading } from '@/components/shared/section-heading';
import { GameCard, games } from '@/features/play';

export default function PlayPage() {
  const featuredGame = games.find((game) => game.status === 'available');

  const otherGames = games.filter((game) => game.title !== featuredGame?.title);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Play World"
        title="Play something."
        description="Short games and tiny challenges for when you want a break, a little competition, or simply something fun to do."
      />

      {featuredGame ? (
        <section className="mt-12 overflow-hidden rounded-3xl border border-border bg-foreground text-background">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-background/10">
                <Gamepad2 className="size-6" aria-hidden="true" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
                Featured game
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                {featuredGame.title}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-background/60">
                {featuredGame.description}
              </p>

              <Link
                href={featuredGame.href}
                className="mt-8 inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-85"
              >
                Play now
              </Link>
            </div>

            <div className="relative hidden min-h-72 items-center justify-center overflow-hidden bg-background/5 lg:flex">
              <div className="absolute size-56 rounded-full border border-background/10" />
              <div className="absolute size-40 rounded-full border border-background/10" />
              <div className="absolute size-24 rounded-full bg-background/10" />

              <Sparkles
                className="relative size-10 text-background/70"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Game library
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Pick your kind of fun.
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Fast reflexes, memory, visual attention, or typing speed. Every game
            is built to start instantly.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherGames.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The idea
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Tiny experiences. Zero friction.
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            WonderBox Play is built around experiences that take seconds to
            understand. No tutorial, no complicated setup — just open something
            and play.
          </p>
        </div>
      </section>
    </main>
  );
}
