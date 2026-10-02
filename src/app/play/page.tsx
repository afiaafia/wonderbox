import { SectionHeading } from '@/components/shared/section-heading';
import { TapChallenge } from '@/features/play';

export default function PlayPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Play World"
        title="Play something."
        description="Short interactive experiences designed for a quick break, a little competition, or just some fun."
      />

      <div className="mt-10">
        <TapChallenge />
      </div>
    </main>
  );
}
