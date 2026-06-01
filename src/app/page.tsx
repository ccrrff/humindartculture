import LayoutD from '@/components/heroes/LayoutD';
import VideoShowcase from '@/components/VideoShowcase';
import { videos } from '@/data/videos';

export default function Home() {
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <LayoutD />
      <VideoShowcase videos={sorted} />
    </>
  );
}
