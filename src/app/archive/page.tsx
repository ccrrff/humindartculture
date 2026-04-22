import ArchiveClient from '@/components/ArchiveClient';
import { videos } from '@/data/videos';

export default function ArchivePage() {
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));
  return <ArchiveClient videos={sorted} />;
}
