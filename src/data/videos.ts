export interface Video {
  id: string;
  title: string;
  category: '오케스트라' | '국제교류' | '크루즈' | '설치예술';
  date: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: '7S1LJ8ic02E',
    title: '유퀴즈온더블럭 — 춤추는 지휘자 백윤학 & 서울 페스타 필하모닉',
    category: '오케스트라',
    date: '2024.01',
    featured: true,
  },
  {
    id: 'L-cZXdbAgmQ',
    title: "오펜바흐 '천국과 지옥' 캉캉 — 서울 페스타 필하모닉",
    category: '오케스트라',
    date: '2025.03',
    featured: true,
  },
  {
    id: 'WRddSpJjx40',
    title: "비제 '카르멘' 서곡 — 서울 페스타 필하모닉",
    category: '오케스트라',
    date: '2025.03',
    featured: true,
  },
  {
    id: 'IaS8bUca_Nk',
    title: 'RADWIMPS 꿈의 등불 오케스트라 ver. — 서울 페스타 필하모닉',
    category: '오케스트라',
    date: '2024.11',
  },
  {
    id: 'NlnZpfC1bIg',
    title: "SBS 커튼콜 — '춤추는 지휘자' 백윤학 인터뷰",
    category: '오케스트라',
    date: '2024.06',
  },
  {
    id: 'wWl270EjCz4',
    title: '[공연실황] 산책 さんぽ — 지브리 & 디즈니 OST FESTA',
    category: '오케스트라',
    date: '2025.01',
  },
  {
    id: 'Gj0xPOjrzIU',
    title: '한불수교 140주년 기념 연주회 Highlight — France en Corée',
    category: '국제교류',
    date: '2024.07',
    featured: true,
  },
  {
    id: 'kfp6ASdNjLM',
    title: '네덜란드 헤이그서 이준 열사 순국 112주년 추모식 — YTN',
    category: '국제교류',
    date: '2024.07',
  },
  {
    id: 'B9OnWindzhg',
    title: 'Berlin Music Video Awards 2025 Highlights — BMVA',
    category: '국제교류',
    date: '2025.05',
  },
  {
    id: '_OZVY9uXp1I',
    title: 'Berlin Music Video Awards 2024 Highlights — BMVA',
    category: '국제교류',
    date: '2024.05',
  },
  {
    id: 'wkMDYkZM3Fk',
    title: 'Berlin Music Video Awards 2025 Recap — BMVA',
    category: '국제교류',
    date: '2025.05',
  },
  {
    id: '4Ci6o1d-qdk',
    title: 'Coldplay — Viva La Vida 오케스트라 버전',
    category: '크루즈',
    date: '2024.08',
  },
  {
    id: '47E2E95cON4',
    title: '[공연실황] 기쿠지로의 여름 SUMMER — 지브리 & 디즈니 OST FESTA',
    category: '설치예술',
    date: '2025.01',
  },
  {
    id: '-0smRywUr0Y',
    title: '케디헌 골든 — 서울 페스타 필하모닉 롯데콘서트홀',
    category: '오케스트라',
    date: '2025.09',
  },
  {
    id: 'NAe8eG2o7c0',
    title: '이충주 — Arabian Night 오케스트라 공연',
    category: '오케스트라',
    date: '2024.12',
  },
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
