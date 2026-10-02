import {
  Brain,
  Clock3,
  Eye,
  Gamepad2,
  Grid2X2,
  Keyboard,
  MousePointer2,
} from 'lucide-react';

import type { GameCardData } from './types';

export const games: GameCardData[] = [
  {
    title: '10-Second Tap Challenge',
    description: 'How many taps can you make before the clock runs out?',
    category: 'Reflex',
    href: '/play',
    icon: MousePointer2,
    status: 'available',
  },
  {
    title: 'Memory Match',
    description:
      'Flip the cards, remember the positions, and match every pair.',
    category: 'Memory',
    href: '/play/memory',
    icon: Grid2X2,
    status: 'available',
  },
  {
    title: 'Reaction Test',
    description: 'Wait for the signal and react as quickly as possible.',
    category: 'Reaction',
    href: '/play/reaction',
    icon: Clock3,
    status: 'available',
  },
  {
    title: 'Odd One Out',
    description: 'Find the tiny visual difference before the clock runs out.',
    category: 'Visual',
    href: '/play/odd-one-out',
    icon: Eye,
    status: 'available',
  },
  {
    title: 'Word Sprint',
    description: 'Think quickly, type quickly, and keep your streak alive.',
    category: 'Words',
    href: '/play/word-sprint',
    icon: Keyboard,
    status: 'available',
  },
  {
    title: 'Brain Blitz',
    description: 'A rapid-fire collection of tiny logic challenges.',
    category: 'Brain',
    href: '/puzzles',
    icon: Brain,
    status: 'coming-soon',
  },
  {
    title: 'Mini Arcade',
    description: 'Small games with one simple rule: keep playing.',
    category: 'Arcade',
    href: '/play',
    icon: Gamepad2,
    status: 'coming-soon',
  },
];
