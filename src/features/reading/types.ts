export type ReadingContentType =
  | 'book'
  | 'story'
  | 'poem'
  | 'novel'
  | 'news'
  | 'article'
  | 'pdf'
  | 'daily-update';

export type ReadingItem = {
  id: string;
  title: string;
  description: string;
  type: ReadingContentType;
  author?: string;
  source?: string;
  sourceUrl?: string;
  coverImage?: string;
  href: string;
  featured?: boolean;
};
