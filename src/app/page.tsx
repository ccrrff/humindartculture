'use client';
import { useState } from 'react';
import LayoutD from '@/components/heroes/LayoutD';
import VideoShowcase from '@/components/VideoShowcase';
import IntroSplash from '@/components/IntroSplash';
import { videos } from '@/data/videos';

export default function Home() {
  const [introPhase, setIntroPhase] = useState<'splash' | 'splitting' | 'done'>('splash');
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {introPhase !== 'done' && (
        <IntroSplash
          onSplitting={() => setIntroPhase('splitting')}
          onDone={() => setIntroPhase('done')}
        />
      )}
      <div style={introPhase === 'splash' ? { visibility: 'hidden' } : undefined}>
        <LayoutD />
        <VideoShowcase videos={sorted} />
      </div>
    </>
  );
}
