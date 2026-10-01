import { ArrowRight, BookOpen, Gamepad2, Sparkles } from 'lucide-react';

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
    title: 'Discover',
    description:
      'Interesting facts, random discoveries, experiments, and unexpected things.',
    icon: Sparkles,
    href: '/explore',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
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
            <a
              href="#explore"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Start exploring
              <ArrowRight className="size-4" />
            </a>

            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              What is WonderBox?
            </a>
          </div>
        </div>

        <div id="explore" className="mt-24 grid gap-4 md:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <a
                key={area.title}
                href={area.href}
                className="group rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <div className="mb-8 flex size-11 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-5" />
                </div>

                <h2 className="text-xl font-semibold">{area.title}</h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {area.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>

        <section id="about" className="mt-24 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            The idea
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            There should always be something interesting to do.
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            WonderBox is being built as a growing collection of useful,
            entertaining, curious, and meaningful digital experiences. The goal
            is simple: open WonderBox and find something worth your time.
          </p>
        </section>
      </section>
    </main>
  );
}
