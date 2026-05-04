import type { Video } from './videos';

export interface BusinessItem {
  id: '오케스트라' | '국제교류' | '크루즈' | '설치예술';
  title: string;
  description: string;
  keywords: string[];
}

export const businessItems: BusinessItem[] = [
  {
    id: '오케스트라',
    title: '오케스트라 운영',
    description:
      '서울 페스타 필하모닉 오케스트라를 운영합니다. 정기연주회, 기획 공연, 해외 초청 공연까지 수준 높은 클래식 음악을 국내외 무대에서 선보입니다.',
    keywords: ['서울 페스타 필하모닉', '정기연주회', '클래식', '해외 초청 공연'],
  },
  {
    id: '국제교류',
    title: '국제문화교류',
    description:
      '민간 국제문화교류 사업을 수행합니다. 프랑스 한불수교 기념 공연, 네덜란드 이준열사 기념 행사, 독일 BMVA 어워즈 등 유럽 무대에서 한국 문화예술의 가치를 알립니다.',
    keywords: ['민간 국제교류', '한불수교', '이준열사', 'BMVA'],
  },
  {
    id: '크루즈',
    title: '크루즈 문화사업',
    description:
      '문화교류 사업의 일환으로 크루즈를 활용한 문화 프로그램을 운영합니다. 선상 클래식 공연, 예술 여행 패키지를 통해 새로운 형태의 문화 경험을 제공합니다.',
    keywords: ['문화크루즈', '선상 공연', '예술 여행', '클래식 항해'],
  },
  {
    id: '설치예술',
    title: '설치예술',
    description:
      '도심 공공장소와 실내 공간에 설치예술 작품을 기획·제작합니다. 일상 속에서 예술을 만나는 경험을 통해 문화예술의 저변을 넓힙니다.',
    keywords: ['공공미술', '설치미술', '도심 예술', '공간 기획'],
  },
];

export function getVideosByCategory(
  videos: Video[],
  category: BusinessItem['id']
): Video[] {
  return videos.filter((v) => v.category === category);
}
