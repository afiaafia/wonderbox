import { GameHeader, WordSprint } from '@/features/play';

export default function WordSprintPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
      <GameHeader
        category="Words"
        title="Word Sprint"
        description="Type the displayed words as quickly and accurately as possible."
      />

      <WordSprint />
    </main>
  );
}
