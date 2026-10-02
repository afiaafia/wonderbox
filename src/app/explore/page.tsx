'use client';

import { useState } from 'react';
import { Shuffle } from 'lucide-react';

const discoveries = [
  {
    category: 'Space',
    title: 'A day on Venus is longer than its year.',
    description:
      'Venus rotates so slowly that one rotation takes longer than one trip around the Sun.',
  },
  {
    category: 'Nature',
    title: 'Bananas are botanically berries.',
    description:
      'Botanical definitions classify berries by how they develop from a flower, which makes some familiar fruits surprising examples.',
  },
  {
    category: 'Technology',
    title: 'The first computer mouse was made of wood.',
    description:
      'An early computer mouse prototype used a wooden casing and a pair of wheels to track movement.',
  },
  {
    category: 'Ocean',
    title: 'Most of the ocean remains unexplored.',
    description:
      'Large portions of the deep ocean are difficult to observe because of extreme pressure, darkness, and distance.',
  },
];

export default function ExplorePage() {
  const [index, setIndex] = useState(0);

  const discovery = discoveries[index];

  function randomize() {
    setIndex((current) => (current + 1) % discoveries.length);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Discovery World
      </p>

      <h1 className="mt-4 text-5xl font-semibold tracking-tight">
        Find something unexpected.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        Interesting facts, unexpected discoveries, and things you did not know
        you wanted to explore.
      </p>

      <section className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {discovery.category}
        </p>

        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {discovery.title}
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          {discovery.description}
        </p>

        <button
          type="button"
          onClick={randomize}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
        >
          <Shuffle className="size-4" />
          Discover another
        </button>
      </section>
    </main>
  );
}
