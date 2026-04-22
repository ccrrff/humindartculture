# 아트컴퍼니 하위 페이지 디자인 스펙

**날짜:** 2026-04-22
**프로젝트:** cultures
**대상:** /about, /archive, /business, /news, /contact 5개 페이지

---

## 1. 공통 사항

- 디자인 시스템: Liquid Glass (기존 `.glass` 클래스, CSS 변수 그대로 사용)
- 레이아웃: 루트 레이아웃(`max-w-[1400px] mx-auto px-8`)에 포함
- 데이터: `src/data/` 폴더에 TypeScript 파일로 관리 (videos.ts 패턴 동일하게)
- 모든 페이지는 Server Component (인터랙션 필요한 부분만 Client Component 분리)

---

## 2. /about — 회사 소개

### 섹션 순서
1. 대표 인사말
2. 비전·미션
3. 연혁
4. 팀 소개

### 2.1 대표 인사말
- 레이아웃: 좌측 대표 사진(120×120px, 원형) + 우측 인사말 텍스트
- 사진: `public/images/ceo.jpg` (없을 경우 placeholder 원형 div)
- 인사말: `data/about.ts`에서 가져옴

### 2.2 비전·미션
- `grid-cols-2` 카드 2장
- Vision 카드: 슬로건 텍스트
- Mission 카드: 미션 텍스트

### 2.3 연혁
- 세로 타임라인 리스트
- 각 항목: 연도(bold) + 사건 텍스트
- 데이터: `data/about.ts`의 `history` 배열

### 2.4 팀 소개
- `grid-cols-2 md:grid-cols-4` 그리드
- 각 카드: 사진(72×72px, 원형 또는 rounded-xl) + 이름 + 직책
- 데이터: `data/about.ts`의 `team` 배열

### 데이터 구조
```typescript
// src/data/about.ts
export interface TeamMember { name: string; role: string; image?: string; }
export interface HistoryItem { year: string; description: string; }
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
```

---

## 3. /archive — 영상 아카이브

### 레이아웃
- 상단: 카테고리 필터 탭 (전체 / 공연기획 / 전시기획 / 문화행사)
- 하단: 영상 그리드 (`grid-cols-2 lg:grid-cols-4`)

### 필터 동작
- Client Component (`ArchiveClient.tsx`)로 분리
- 선택된 카테고리에 해당하는 영상만 표시
- "전체" 선택 시 모든 영상 표시
- 기본 선택: "전체"

### 영상 카드
- 썸네일: `aspect-video`, YouTube thumbnail API
- 하단: 제목 + 카테고리 배지 + 날짜
- 클릭 시 VideoModal 열림

### 데이터
- 기존 `src/data/videos.ts`의 `videos` 배열 사용
- 날짜 내림차순 정렬

---

## 4. /business — 사업 안내

### 레이아웃
- 사업 3개를 각각 풀 너비 섹션으로 세로 배치

### 각 사업 섹션 구성
- 아이콘 + 사업명 (헤더)
- 설명 텍스트 (2~3줄)
- 키워드 태그 (pill badge, 2~4개)
- 관련 영상 썸네일 가로 스크롤 목록 (클릭 → VideoModal)

### 관련 영상 연결
- `data/videos.ts`의 `category` 필드로 매칭
- 공연기획 섹션 → `category === '공연기획'` 영상
- 전시기획 섹션 → `category === '전시기획'` 영상
- 문화행사 섹션 → `category === '문화행사'` 영상

### 데이터 구조
```typescript
// src/data/business.ts
export interface BusinessItem {
  id: '공연기획' | '전시기획' | '문화행사';
  icon: string;
  title: string;
  description: string;
  keywords: string[];
}
```

---

## 5. /news — 수상·보도

### 레이아웃
1. 수상 내역 섹션
2. 언론 보도 섹션 (스크롤로 이어짐)

### 5.1 수상 내역
- 각 항목: 트로피 아이콘 + 수상명 + 연도 + 수여기관
- 카드 스타일 (`bg-white/45 border border-white/65`)

### 5.2 언론 보도
- 각 항목: 기사 제목 + 매체명 + 날짜 + 외부 링크 (→)
- 링크: `target="_blank" rel="noopener"`
- 링크 없으면 → 미표시

### 데이터 구조
```typescript
// src/data/news.ts
export interface AwardItem { title: string; year: string; organization: string; }
export interface PressItem { title: string; outlet: string; date: string; url?: string; }
```

---

## 6. /contact — 문의

### 레이아웃
- `grid-cols-1 md:grid-cols-2`
- 좌: 연락처 정보 카드
- 우: 카카오맵 또는 Google Maps iframe embed (주소 기반)

### 연락처 정보
- 전화번호
- 이메일 (`mailto:` 링크)
- 주소
- 운영시간

### 지도
- Google Maps `<iframe>` embed (API 키 불필요한 공개 embed URL 사용)
- 주소: 서울특별시 종로구 문화예술로 1길 (플레이스홀더 좌표 사용)
- `border-0 rounded-[16px] w-full h-[240px]`

### 데이터
- `data/contact.ts`에 연락처 정보 상수로 관리

---

## 7. 파일 구조

```
src/
├── app/
│   ├── about/page.tsx          # Server Component
│   ├── archive/page.tsx        # Server Component (ArchiveClient 포함)
│   ├── business/page.tsx       # Server Component (BusinessVideos 포함)
│   ├── news/page.tsx           # Server Component
│   └── contact/page.tsx        # Server Component
├── components/
│   ├── ArchiveClient.tsx       # 카테고리 필터 + 영상 그리드 (Client)
│   └── BusinessVideos.tsx      # 사업별 관련 영상 + VideoModal (Client)
└── data/
    ├── about.ts
    ├── business.ts
    ├── news.ts
    └── contact.ts
```

---

## 8. 범위 외

- 검색 기능
- 페이지네이션 (영상 6개로 불필요)
- 문의 폼 전송 기능
- 다국어
- 관리자 페이지
