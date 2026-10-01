import type { ReadingItem } from './types';

export const readingItems: ReadingItem[] = [
  {
    id: 'reading-001',
    title: 'A Story Waiting to Be Read',
    description:
      'A quiet fictional story for readers looking for something immersive and thoughtful.',
    type: 'story',
    author: 'WonderBox',
    href: '/reading/story/a-story-waiting-to-be-read',
    featured: true,
  },
  {
    id: 'reading-002',
    title: 'The Art of Curiosity',
    description:
      'An article about questions, exploration, and why curiosity keeps us learning.',
    type: 'article',
    author: 'WonderBox',
    href: '/reading/article/the-art-of-curiosity',
  },
  {
    id: 'reading-003',
    title: 'A Poem About Ordinary Days',
    description: 'A short poem about finding meaning in familiar moments.',
    type: 'poem',
    author: 'WonderBox',
    href: '/reading/poem/ordinary-days',
  },
  {
    id: 'reading-004',
    title: 'Today Around the World',
    description:
      'A compact collection of notable events and updates from Bangladesh and around the world.',
    type: 'daily-update',
    source: 'WonderBox Daily',
    href: '/reading/daily-update/today-around-the-world',
  },
  {
    id: 'reading-005',
    title: 'The Long Road Home',
    description:
      'A long-form fictional work designed for an uninterrupted reading experience.',
    type: 'novel',
    author: 'WonderBox',
    href: '/reading/novel/the-long-road-home',
  },
  {
    id: 'reading-006',
    title: 'World News Brief',
    description:
      'A reading-friendly collection of selected international news and context.',
    type: 'news',
    source: 'WonderBox News',
    href: '/reading/news/world-news-brief',
  },
  {
    id: 'reading-007',
    title: "The Beginner's Reading Guide",
    description:
      'A practical PDF resource for discovering different kinds of books and reading styles.',
    type: 'pdf',
    source: 'WonderBox Library',
    href: '/reading/pdf/beginners-reading-guide',
  },
  {
    id: 'reading-008',
    title: 'Understanding Modern Books',
    description:
      'A book-length introduction to themes, genres, and modern reading culture.',
    type: 'book',
    author: 'WonderBox',
    href: '/reading/book/understanding-modern-books',
  },
];
