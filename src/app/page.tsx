import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Gamepad2,
  Sparkles,
  Wrench,
} from 'lucide-react';

const areas = [
  {
    title: 'Reading',
    description:
      'Stories, books, poems, news, novels, PDFs, and things worth reading.',
    icon: BookOpen,
    href: '/reading',
  },
  {
    title: 'Play',
    description:
      'Games, reactions, memory challenges, trivia, and interactive experiences.',
    icon: Gamepad2,
    href: '/play',
  },
  {
    title: 'Puzzles',
    description:
      'Logic problems, riddles, brain teasers, and challenges for curious minds.',
    icon: Brain,
    href: '/puzzles',
  },
  {
    title: 'Quizzes',
    description:
      'Trivia, personality, compatibility, IQ-style challenges, and more.',
    icon: Sparkles,
    href: '/quizzes',
  },
  {
    title: 'Productivity',
    description:
      'Small tools and useful experiences designed to help you get things done.',
    icon: Wrench,
    href: '/productivity',
  },
  {
    title: 'Explore',
    description:
      'Interesting facts, unexpected discoveries, random experiences, and more.',
    icon: Sparkles,
    href: '/explore',
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Welcome to WonderBox
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-8xl">
            An internet
            <br />
            playground.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Read something. Play something. Discover something. Solve something.
            WonderBox brings different kinds of digital experiences together in
            one place.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#explore"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Start exploring
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Discover WonderBox
            </Link>
          </div>
        </div>
      </section>

      <section id="explore" className="border-t border-border bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find something to do.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => {
              const Icon = area.icon;

              return (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="mb-8 flex size-11 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="text-xl font-semibold">{area.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {area.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            The idea
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            There should always be something interesting to do.
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            WonderBox is being built as a growing collection of useful,
            entertaining, curious, and meaningful digital experiences. The goal
            is simple: open WonderBox and find something worth your time.
          </p>
        </div>
      </section>
    </main>
  );
}
