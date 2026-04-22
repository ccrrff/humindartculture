import VideoShowcase from '@/components/VideoShowcase';
import AboutCard from '@/components/AboutCard';
import BusinessList from '@/components/BusinessList';
import { videos } from '@/data/videos';

export default function Home() {
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <VideoShowcase videos={sorted} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AboutCard />
        <BusinessList />
      </div>
    </>
  );
}
