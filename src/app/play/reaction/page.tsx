import { GameHeader, ReactionTest } from '@/features/play';

export default function ReactionPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <GameHeader
        category="Reaction"
        title="Reaction Test"
        description="Wait for the signal, then react as quickly as you can."
      />

      <ReactionTest />
    </main>
  );
}
