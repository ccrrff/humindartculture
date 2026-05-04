export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface HistoryItem {
  year: string;
  description: string;
}

export interface AboutData {
  ceoName: string;
  ceoRole: string;
  ceoImage?: string;
  greeting: string;
  vision: string;
  mission: string;
  history: HistoryItem[];
  team: TeamMember[];
}

export const aboutData: AboutData = {
  ceoName: '대표',
  ceoRole: '대표이사',
  greeting:
    '"휴마인드 아트컬쳐는 예술이 국경을 넘는 힘을 믿습니다. 서울 페스타 필하모닉 오케스트라를 중심으로 오케스트라·국제교류·크루즈·설치예술의 네 축을 통해 세계 무대에서 한국 문화예술의 가능성을 열어가겠습니다."',
  vision: '"예술로 세계를, 세계로 문화를"',
  mission: '오케스트라·국제교류·크루즈·설치예술을 통해 한국 문화예술을 세계 무대에 알린다',
  history: [
    { year: '2025', description: '서울 페스타 필하모닉 지브리&디즈니 OST FESTA 전국 투어' },
    { year: '2024', description: 'tvN 유퀴즈온더블럭 — 춤추는 지휘자 백윤학 출연' },
    { year: '2024', description: '한불수교 기념 오케스트라 공연 (파리) · 이준열사 기념 공연 (헤이그)' },
    { year: '2024', description: '민간 국제문화교류 사업 수행기관 선정 · SBS 커튼콜 인터뷰' },
    { year: '2023', description: '독일 BMVA 세계영상어워즈 수상 · 크루즈 문화사업 런칭' },
    { year: '2022', description: '서울 페스타 필하모닉 오케스트라 창단' },
    { year: '2020', description: '휴마인드 아트컬쳐 설립' },
  ],
  team: [
    { name: '대표', role: '대표이사' },
    { name: '백윤학', role: '수석 지휘자' },
    { name: '공연기획팀', role: '오케스트라 · 국제교류' },
    { name: '사업팀', role: '크루즈 · 설치예술' },
  ],
};
