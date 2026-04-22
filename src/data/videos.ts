export interface Video {
  id: string;
  title: string;
  category: '공연기획' | '전시기획' | '문화행사';
  date: string;
  featured?: boolean;
}

export const videos: Video[] = [
  { id: 'jNQXAC9IVRw', title: '2024 책읽는 한강공원', category: '문화행사', date: '2024.09', featured: true },
  { id: 'dQw4w9WgXcQ', title: '2024 가을 문화축제', category: '공연기획', date: '2024.10', featured: true },
  { id: 'hT_nvWreIhg', title: '현대미술 전시 오프닝', category: '전시기획', date: '2024.08', featured: true },
  { id: 'ZbZSe6N_BXs', title: '지역 문화 교류 행사', category: '문화행사', date: '2024.07', featured: false },
  { id: 'YR5ApYxkU-U', title: '청년 예술가 쇼케이스', category: '공연기획', date: '2024.06', featured: false },
  { id: 'kJQP7kiw5Fk', title: '2023 봄 공연 하이라이트', category: '공연기획', date: '2023.05', featured: false },
];

export function getFeaturedVideos(): Video[] {
  return videos.filter((v) => v.featured === true);
}

export function getRecentVideos(n: number): Video[] {
  return [...videos]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}

export function getYoutubeThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
