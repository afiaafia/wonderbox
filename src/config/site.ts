export const siteConfig = {
  name: 'WonderBox',
  description:
    'An internet playground for reading, games, puzzles, productivity, discovery, and more.',
  url: 'http://localhost:3000',
};

export const navigation = [
  {
    label: 'Explore',
    href: '/explore',
  },
  {
    label: 'Reading',
    href: '/reading',
  },
  {
    label: 'Play',
    href: '/play',
  },
  {
    label: 'Puzzles',
    href: '/puzzles',
  },
  {
    label: 'Quizzes',
    href: '/quizzes',
  },
  {
    label: 'Productivity',
    href: '/productivity',
  },
] as const;
