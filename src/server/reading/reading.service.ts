import 'server-only';

import {
  getPublishedReadingItemBySlug,
  getPublishedReadingItems,
} from './reading.repository';

import type { ReadingContentType, ReadingItem } from '@/features/reading/types';

const typeMap: Record<string, ReadingContentType> = {
  BOOK: 'book',
  STORY: 'story',
  POEM: 'poem',
  NOVEL: 'novel',
  NEWS: 'news',
  ARTICLE: 'article',
  PDF: 'pdf',
  DAILY_UPDATE: 'daily-update',
};

function mapReadingItem(row: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  type: string;
  author: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  coverImage: string | null;
}) {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    type: typeMap[row.type] ?? 'article',
    author: row.author ?? undefined,
    source: row.sourceName ?? undefined,
    coverImage: row.coverImage ?? undefined,
    href: `/reading/${row.slug}`,
    featured: false,
    sourceUrl: row.sourceUrl ?? undefined,
  } satisfies ReadingItem & { sourceUrl?: string };
}

export async function getReadingItems(): Promise<ReadingItem[]> {
  const rows = await getPublishedReadingItems();

  return rows.map(mapReadingItem);
}

export async function getReadingItemBySlug(slug: string) {
  const row = await getPublishedReadingItemBySlug(slug);

  if (!row) {
    return null;
  }

  return mapReadingItem(row);
}
