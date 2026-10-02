import { SectionHeading } from '@/components/shared/section-heading';
import { TapChallenge } from '@/features/play';

export default function PlayPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-5xl px-6 py-14 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Play World"
        title="10-Second Tap Challenge"
        description="How fast can you tap? You have ten seconds to set a score and beat your personal best."
      />

      <div className="mt-10 sm:mt-12">
        <TapChallenge />
      </div>
    </main>
  );
}
