import 'server-only';

import { db } from '../../../prisma/db';

const PUBLISHED_STATUS = 'PUBLISHED' as const;

export async function getPublishedReadingItems() {
  return db.orm.public.ContentItem.where({ status: PUBLISHED_STATUS })
    .orderBy((content) => content.createdAt.desc())
    .select(
      'id',
      'title',
      'slug',
      'description',
      'type',
      'author',
      'sourceName',
      'sourceUrl',
      'coverImage',
      'publishedAt'
    )
    .all();
}
