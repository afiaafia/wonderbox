import type { LucideIcon } from 'lucide-react';

export type GameStatus = 'available' | 'coming-soon';

export type GameCardData = {
  title: string;
  description: string;
  category: string;
  href: string;
  icon: LucideIcon;
  status: GameStatus;
};
