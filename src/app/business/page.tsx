import { videos } from '@/data/videos';
import BusinessPageHeader from '@/components/business/BusinessPageHeader';
import OrchestraSection from '@/components/business/OrchestraSection';
import InternationalSection from '@/components/business/InternationalSection';
import CruiseSection from '@/components/business/CruiseSection';
import InstallationSection from '@/components/business/InstallationSection';

export default function BusinessPage() {
  const orchestraVideos = videos.filter((v) => v.category === '오케스트라');
  const internationalVideos = videos.filter((v) => v.category === '국제교류');

  return (
    <div className="flex flex-col gap-4">
      <BusinessPageHeader />
      <OrchestraSection videos={orchestraVideos} />
      <InternationalSection videos={internationalVideos} />
      <CruiseSection />
      <InstallationSection />
    </div>
  );
}
