import VideoCarousel from '@/components/VideoCarousel';
import VideoGrid from '@/components/VideoGrid';
import AboutCard from '@/components/AboutCard';
import BusinessList from '@/components/BusinessList';
import { getFeaturedVideos, getRecentVideos } from '@/data/videos';

export default function Home() {
  const featured = getFeaturedVideos();
  const recent = getRecentVideos(4);

  return (
    <>
      <VideoCarousel videos={featured} />
      <VideoGrid videos={recent} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <AboutCard />
        <BusinessList />
      </div>
    </>
  );
}
