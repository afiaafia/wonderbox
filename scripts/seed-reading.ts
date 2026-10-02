import 'dotenv/config';

import { Temporal } from 'temporal-polyfill';

import { db } from '../prisma/db';

const categories = [
  {
    name: 'Reading',
    slug: 'reading',
    description: 'Books, stories, poetry, articles, news, and more.',
  },
  {
    name: 'News',
    slug: 'news',
    description: 'Daily updates and news from Bangladesh and around the world.',
  },
  {
    name: 'Literature',
    slug: 'literature',
    description: 'Stories, poems, novels, and other literary works.',
  },
];

const readingItems = [
  {
    title: 'A Story Waiting to Be Read',
    slug: 'a-story-waiting-to-be-read',
    description:
      'A quiet fictional story for readers looking for something immersive and thoughtful.',
    type: 'STORY',
    author: 'WonderBox',
    categorySlug: 'literature',
  },
  {
    title: 'The Art of Curiosity',
    slug: 'the-art-of-curiosity',
    description:
      'An article about questions, exploration, and why curiosity keeps us learning.',
    type: 'ARTICLE',
    author: 'WonderBox',
    categorySlug: 'reading',
  },
  {
    title: 'A Poem About Ordinary Days',
    slug: 'ordinary-days',
    description: 'A short poem about finding meaning in familiar moments.',
    type: 'POEM',
    author: 'WonderBox',
    categorySlug: 'literature',
  },
  {
    title: 'Today Around the World',
    slug: 'today-around-the-world',
    description:
      'A compact collection of notable events and updates from Bangladesh and around the world.',
    type: 'DAILY_UPDATE',
    sourceName: 'WonderBox Daily',
    categorySlug: 'news',
  },
  {
    title: 'The Long Road Home',
    slug: 'the-long-road-home',
    description:
      'A long-form fictional work designed for an uninterrupted reading experience.',
    type: 'NOVEL',
    author: 'WonderBox',
    categorySlug: 'literature',
  },
  {
    title: 'World News Brief',
    slug: 'world-news-brief',
    description:
      'A reading-friendly collection of selected international news and context.',
    type: 'NEWS',
    sourceName: 'WonderBox News',
    categorySlug: 'news',
  },
  {
    title: "The Beginner's Reading Guide",
    slug: 'beginners-reading-guide',
    description:
      'A practical PDF resource for discovering different kinds of books and reading styles.',
    type: 'PDF',
    sourceName: 'WonderBox Library',
    categorySlug: 'reading',
  },
  {
    title: 'Understanding Modern Books',
    slug: 'understanding-modern-books',
    description:
      'A book-length introduction to themes, genres, and modern reading culture.',
    type: 'BOOK',
    author: 'WonderBox',
    categorySlug: 'reading',
  },
] as const;

async function main() {
  const categoryIds = new Map<string, string>();

  for (const category of categories) {
    const saved = await db.orm.public.Category.upsert({
      create: category,
      update: {
        name: category.name,
        description: category.description,
      },
      conflictOn: {
        slug: category.slug,
      },
    });

    categoryIds.set(category.slug, saved.id);
  }

  for (const item of readingItems) {
    const categoryId = categoryIds.get(item.categorySlug);

    if (!categoryId) {
      throw new Error(`Missing category for reading item: ${item.slug}`);
    }

    const data = {
      title: item.title,
      slug: item.slug,
      description: item.description,
      type: item.type,
      status: 'PUBLISHED' as const,
      author: 'author' in item ? item.author : undefined,
      sourceName: 'sourceName' in item ? item.sourceName : undefined,
      categoryId,
      publishedAt: Temporal.Instant.fromEpochMilliseconds(Date.now()),
    };

    await db.orm.public.ContentItem.upsert({
      create: data,
      update: data,
      conflictOn: {
        slug: item.slug,
      },
    });
  }

  console.log(
    `Seeded ${categories.length} categories and ${readingItems.length} reading items.`
  );
}

main()
  .catch((error) => {
    console.error('Reading seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.close();
  });
