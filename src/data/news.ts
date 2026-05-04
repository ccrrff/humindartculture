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
  { title: 'BMVA 세계영상어워즈', year: '2023', organization: '독일 BMVA (Bundesverband Musikvideo und Audiovisuelle Produktionen)' },
  { title: '한불수교 기념 오케스트라 공연 공식 초청', year: '2024', organization: '주한 프랑스 대사관' },
  { title: '이준열사 기념 특별 공연 초청', year: '2024', organization: '네덜란드 헤이그 한인회' },
  { title: '민간 국제문화교류 사업 수행기관 선정', year: '2024', organization: '서울특별시' },
];

export const pressItems: PressItem[] = [
  {
    title: '유퀴즈온더블럭 — 춤추는 지휘자 백윤학 & 서울 페스타 필하모닉',
    outlet: 'tvN 유퀴즈온더블럭',
    date: '2024.01.01',
    url: 'https://www.youtube.com/watch?v=7S1LJ8ic02E',
  },
  {
    title: "과학고·서울대 공대 나와서 지휘자? '춤추는 지휘자'는 어떻게 탄생했나",
    outlet: 'SBS 커튼콜',
    date: '2024.06.01',
    url: 'https://www.youtube.com/watch?v=NlnZpfC1bIg',
  },
  {
    title: '서울 페스타 필하모닉, 파리서 한불수교 기념 공연 성료',
    outlet: '연합뉴스',
    date: '2024.07.02',
  },
  {
    title: '헤이그 이준열사 기념관, 서울 페스타 필하모닉과 특별 공연',
    outlet: '한국일보',
    date: '2024.09.20',
  },
  {
    title: '독일 BMVA 어워즈 수상 — 한국 민간 문화단체 최초',
    outlet: '문화일보',
    date: '2023.11.15',
  },
];
