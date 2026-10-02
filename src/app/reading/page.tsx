import Link from 'next/link';
import { BookOpen, Newspaper, Sparkles, Search, X } from 'lucide-react';

import { ReadingGrid } from '@/features/reading';
import { getReadingItems } from '@/server/reading/reading.service';

const filters = [
  { label: 'All', value: '' },
  { label: 'Books', value: 'book' },
  { label: 'Stories', value: 'story' },
  { label: 'Poems', value: 'poem' },
  { label: 'Novels', value: 'novel' },
  { label: 'News', value: 'news' },
  { label: 'Articles', value: 'article' },
  { label: 'PDFs', value: 'pdf' },
  { label: 'Daily Updates', value: 'daily-update' },
] as const;

const filterIcons = {
  book: BookOpen,
  story: Sparkles,
  novel: Sparkles,
  news: Newspaper,
} as const;

type ReadingPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
  }>;
};

export default async function ReadingPage({ searchParams }: ReadingPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() ?? '';
  const selectedType = params.type?.trim().toLowerCase() ?? '';

  const readingItems = await getReadingItems();

  const filteredItems = readingItems.filter((item) => {
    const matchesType =
      !selectedType || item.type.toLowerCase() === selectedType;

    const searchText = [
      item.title,
      item.description,
      item.author,
      item.source,
      item.type,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch = !query || searchText.includes(query.toLowerCase());

    return matchesType && matchesSearch;
  });

  const featuredItems =
    !query && !selectedType && filteredItems.length > 0
      ? filteredItems.slice(0, 1)
      : [];

  const otherItems = featuredItems.length
    ? filteredItems.slice(1)
    : filteredItems;

  const hasFilters = Boolean(query || selectedType);

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

        <form
          action="/reading"
          method="GET"
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          {selectedType ? (
            <input type="hidden" name="type" value={selectedType} />
          ) : null}

          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search books, stories, news..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            className="h-12 rounded-xl bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon =
              filter.value in filterIcons
                ? filterIcons[filter.value as keyof typeof filterIcons]
                : null;

            const isActive =
              filter.value === selectedType || (!filter.value && !selectedType);

            const href = filter.value
              ? `/reading?type=${filter.value}${query ? `&q=${encodeURIComponent(query)}` : ''}`
              : query
                ? `/reading?q=${encodeURIComponent(query)}`
                : '/reading';

            return (
              <Link
                key={filter.label}
                href={href}
                className={[
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:bg-muted',
                ].join(' ')}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {filter.label}
              </Link>
            );
          })}
        </div>

        {hasFilters ? (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'result' : 'results'}
              {query ? ` for "${query}"` : ''}
            </span>

            <Link
              href="/reading"
              className="inline-flex items-center gap-1.5 text-foreground transition-opacity hover:opacity-70"
            >
              Clear filters
              <X className="size-3.5" />
            </Link>
          </div>
        ) : null}
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
            {hasFilters ? 'Results' : 'Library'}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {hasFilters ? 'Matching reading.' : 'Explore the reading world.'}
          </h2>
        </div>

        {otherItems.length > 0 ? (
          <ReadingGrid items={otherItems} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-lg font-medium">Nothing found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or clear the filters.
            </p>

            <Link
              href="/reading"
              className="mt-6 inline-flex rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              View all reading
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
