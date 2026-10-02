import { GameHeader, MemoryMatch } from '@/features/play';

export default function MemoryPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <GameHeader
        category="Memory"
        title="Memory Match"
        description="Flip the cards, remember their positions, and match every pair using as few moves as possible."
      />

      <MemoryMatch />
    </main>
  );
}
