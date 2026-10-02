import { BookOpen, Newspaper, Sparkles } from 'lucide-react';

import { ReadingGrid } from '@/features/reading';
import { getReadingItems } from '@/server/reading/reading.service';

const categories = [
  {
    label: 'Books',
    icon: BookOpen,
  },
  {
    label: 'Stories & Novels',
    icon: Sparkles,
  },
  {
    label: 'News & Updates',
    icon: Newspaper,
  },
];

export default async function ReadingPage() {
  const readingItems = await getReadingItems();

  const featuredItems = readingItems.slice(0, 1);
  const otherItems = readingItems.slice(1);

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            WonderBox Reading
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Read something worth your time.
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Books, stories, poems, novels, news, PDFs, daily updates, and other
            things worth opening.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.label}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted"
              >
                <Icon className="size-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {featuredItems.length > 0 ? (
        <section className="border-y border-border bg-muted/20">
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Featured
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Start here.
              </h2>
            </div>

            <ReadingGrid items={featuredItems} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Library
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Explore the reading world.
          </h2>
        </div>

        {otherItems.length > 0 ? (
          <ReadingGrid items={otherItems} />
        ) : (
          <p className="text-muted-foreground">Nothing to read yet.</p>
        )}
      </section>
    </main>
  );
}
