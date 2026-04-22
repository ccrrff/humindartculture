// src/data/business.ts
import type { Video } from './videos';

export interface BusinessItem {
  id: '공연기획' | '전시기획' | '문화행사';
  icon: string;
  title: string;
  description: string;
  keywords: string[];
}

export const businessItems: BusinessItem[] = [
  {
    id: '공연기획',
    icon: '🎭',
    title: '공연 기획',
    description:
      '클래식 음악회, 현대무용, 연극 등 다양한 공연을 기획·제작합니다. 소규모 살롱 콘서트부터 대형 공연까지 폭넓게 다룹니다.',
    keywords: ['클래식 음악회', '현대무용', '연극', '살롱 콘서트'],
  },
  {
    id: '전시기획',
    icon: '🎨',
    title: '전시 기획',
    description:
      '현대미술, 사진전, 설치미술 등 다양한 전시를 기획합니다. 신진 작가 발굴부터 기획전까지 폭넓게 진행합니다.',
    keywords: ['현대미술', '사진전', '설치미술', '신진 작가'],
  },
  {
    id: '문화행사',
    icon: '🎪',
    title: '문화 행사',
    description:
      '지역 축제, 문화포럼, 커뮤니티 행사를 기획합니다. 시민이 직접 참여하는 참여형 행사를 중심으로 진행합니다.',
    keywords: ['지역 축제', '문화포럼', '커뮤니티 행사'],
  },
];

export function getVideosByCategory(
  videos: Video[],
  category: BusinessItem['id']
): Video[] {
  return videos.filter((v) => v.category === category);
}
