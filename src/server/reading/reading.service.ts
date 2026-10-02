import 'server-only';

import { getPublishedReadingItems } from './reading.repository';

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

export async function getReadingItems(): Promise<ReadingItem[]> {
  const rows = await getPublishedReadingItems();

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    type: typeMap[row.type] ?? 'article',
    author: row.author ?? undefined,
    source: row.sourceName ?? undefined,
    coverImage: row.coverImage ?? undefined,
    href: `/reading/${row.slug}`,
    featured: false,
  }));
}
