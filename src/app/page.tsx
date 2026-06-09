'use client';
import { useState } from 'react';
import LayoutD from '@/components/heroes/LayoutD';
import VideoShowcase from '@/components/VideoShowcase';
import IntroSplash from '@/components/IntroSplash';
import { videos } from '@/data/videos';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {!introComplete && <IntroSplash onDone={() => setIntroComplete(true)} />}
      <LayoutD />
      <VideoShowcase videos={sorted} />
    </>
  );
}
