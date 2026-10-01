import type { ReadingItem } from '../types';

import { ReadingCard } from './reading-card';

type ReadingGridProps = {
  items: ReadingItem[];
};

export function ReadingGrid({ items }: ReadingGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ReadingCard key={item.id} item={item} />
      ))}
    </div>
  );
}
