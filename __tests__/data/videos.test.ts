import { videos, getFeaturedVideos, getRecentVideos } from '@/data/videos';
import type { Video } from '@/data/videos';

describe('videos 데이터', () => {
  it('Video 타입을 만족하는 항목만 포함한다', () => {
    videos.forEach((v: Video) => {
      expect(typeof v.id).toBe('string');
      expect(typeof v.title).toBe('string');
      expect(['공연기획', '전시기획', '문화행사']).toContain(v.category);
      expect(typeof v.date).toBe('string');
    });
  });

  it('getFeaturedVideos는 featured: true 항목만 반환한다', () => {
    const featured = getFeaturedVideos();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((v) => expect(v.featured).toBe(true));
  });

  it('getRecentVideos는 n개를 최신순으로 반환한다', () => {
    const recent = getRecentVideos(4);
    expect(recent.length).toBe(4);
  });
});
