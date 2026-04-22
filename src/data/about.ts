// src/data/about.ts
export interface TeamMember {
  name: string;
  role: string;
}

export interface HistoryItem {
  year: string;
  description: string;
}

export interface AboutData {
  ceoName: string;
  ceoRole: string;
  greeting: string;
  vision: string;
  mission: string;
  history: HistoryItem[];
  team: TeamMember[];
}

export const aboutData: AboutData = {
  ceoName: '홍길동',
  ceoRole: '대표이사',
  greeting:
    '"아트컴퍼니는 일상 속 예술의 가치를 발견하고 나누는 일을 합니다. 2010년부터 공연, 전시, 문화행사를 통해 더 풍요로운 문화 생활을 만들어가고 있습니다."',
  vision: '"사소한 일상의 숨겨진 아름다움을 발견합니다"',
  mission: '예술과 일상의 경계를 허물고, 누구나 문화를 누리는 사회를 만든다',
  history: [
    { year: '2024', description: '책읽는 한강공원 프로젝트 · 가을 문화축제 기획' },
    { year: '2022', description: '서울시 우수 문화기획사 선정' },
    { year: '2018', description: '전시기획팀 신설 · 현대미술 전시 시리즈 런칭' },
    { year: '2015', description: '문화체육관광부 장관상 수상' },
    { year: '2010', description: '아트컴퍼니 설립' },
  ],
  team: [
    { name: '홍길동', role: '대표이사' },
    { name: '김예술', role: '공연기획팀장' },
    { name: '이전시', role: '전시기획팀장' },
    { name: '박문화', role: '행사기획팀장' },
  ],
};
