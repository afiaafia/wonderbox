'use client';

import { useState } from 'react';
import { Shuffle } from 'lucide-react';

const discoveries = [
  {
    category: 'Space',
    title: 'A day on Venus is longer than its year.',
    description:
      'Venus rotates so slowly that one rotation takes longer than its trip around the Sun.',
  },
  {
    category: 'Nature',
    title: 'Bananas are botanically berries.',
    description:
      'Botanical definitions of berries differ from everyday usage, creating some surprising examples.',
  },
  {
    category: 'Technology',
    title: 'The first computer mouse had a wooden casing.',
    description:
      'An early computer mouse prototype used a wooden housing and wheels to track movement.',
  },
  {
    category: 'Ocean',
    title: 'The deep ocean is still difficult to explore.',
    description:
      'Extreme pressure, darkness, and distance make deep-sea exploration technically challenging.',
  },
  {
    category: 'Language',
    title: 'Some languages have no direct equivalent for common English words.',
    description:
      'Languages divide concepts differently, so translation often depends on context rather than one-to-one word matching.',
  },
  {
    category: 'History',
    title: 'Libraries have existed for thousands of years.',
    description:
      'Ancient civilizations created organized collections of written records long before modern public libraries.',
  },
  {
    category: 'Physics',
    title: 'Light travels extremely fast, but not infinitely fast.',
    description:
      'Light in a vacuum travels at approximately 300,000 kilometers per second.',
  },
  {
    category: 'Animals',
    title: 'Octopuses have three hearts.',
    description:
      'Two hearts pump blood toward the gills while another circulates it through the rest of the body.',
  },
  {
    category: 'Earth',
    title: 'Earth is not a perfect sphere.',
    description:
      'Its rotation causes the planet to bulge slightly around the equator.',
  },
  {
    category: 'Mathematics',
    title: 'Zero is an important number and a concept in its own right.',
    description:
      'Zero serves both as a number and as a positional placeholder in our number system.',
  },
];

export default function ExplorePage() {
  const [index, setIndex] = useState(0);

  const discovery = discoveries[index];

  function randomize() {
    let next = Math.floor(Math.random() * discoveries.length);

    if (next === index) {
      next = (next + 1) % discoveries.length;
    }

    setIndex(next);
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
        Facts, ideas, discoveries, and small pieces of knowledge worth knowing.
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
