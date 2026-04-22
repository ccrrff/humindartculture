// src/data/news.ts
export interface AwardItem {
  title: string;
  year: string;
  organization: string;
}

export interface PressItem {
  title: string;
  outlet: string;
  date: string;
  url?: string;
}

export const awards: AwardItem[] = [
  { title: '서울시 우수 문화기획사', year: '2022', organization: '서울특별시' },
  { title: '문화체육관광부 장관상', year: '2020', organization: '문화체육관광부' },
  { title: '한국문화예술교육진흥원 우수단체', year: '2018', organization: '한국문화예술교육진흥원' },
];

export const pressItems: PressItem[] = [
  {
    title: '한강공원 독서문화 행사 성료…3천명 참여',
    outlet: '한국일보',
    date: '2024.09.15',
  },
  {
    title: '아트컴퍼니, 청년예술가 쇼케이스 개최',
    outlet: '문화일보',
    date: '2024.06.20',
  },
  {
    title: '현대미술 전시 기획의 새로운 지평',
    outlet: '아트인사이트',
    date: '2024.08.05',
  },
  {
    title: '지역 문화 교류 행사로 주목받는 아트컴퍼니',
    outlet: '서울신문',
    date: '2024.07.10',
  },
];
