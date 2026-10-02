import 'server-only';

import { db } from '../../../prisma/db';

const PUBLISHED_STATUS = 'PUBLISHED' as const;

const readingSelect = [
  'id',
  'title',
  'slug',
  'description',
  'type',
  'author',
  'sourceName',
  'sourceUrl',
  'coverImage',
  'publishedAt',
] as const;

export async function getPublishedReadingItems() {
  return db.orm.public.ContentItem.where({ status: PUBLISHED_STATUS })
    .orderBy((content) => content.createdAt.desc())
    .select(...readingSelect)
    .all();
}

export async function getPublishedReadingItemBySlug(slug: string) {
  return db.orm.public.ContentItem.where({
    slug,
    status: PUBLISHED_STATUS,
  })
    .select(...readingSelect)
    .first();
}
