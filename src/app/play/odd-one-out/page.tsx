import { GameHeader, OddOneOut } from '@/features/play';

export default function OddOneOutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <GameHeader
        category="Visual"
        title="Odd One Out"
        description="One tile is different. Find it before the clock reaches zero."
      />

      <OddOneOut />
    </main>
  );
}
