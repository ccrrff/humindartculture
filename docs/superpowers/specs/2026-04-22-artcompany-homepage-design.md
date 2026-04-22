# 아트컴퍼니 홈페이지 디자인 스펙

**날짜:** 2026-04-22  
**프로젝트:** cultures  
**회사명:** 아트컴퍼니 (문화예술 전문 기업)

---

## 1. 목적 및 범위

문화예술 회사 아트컴퍼니의 홈페이지. **유튜브 영상이 핵심 콘텐츠**이며, 방문자가 회사의 공연·전시·행사 영상을 직접 탐색할 수 있는 구조. 로그인 기능 없음. 정적 정보 제공 + 영상 아카이브 중심.

---

## 2. 기술 스택

- **프레임워크:** Next.js (App Router)
- **스타일링:** Tailwind CSS + Liquid Glass 커스텀 CSS 변수 (beobin2 디자인 시스템 기반)
- **애니메이션:** Framer Motion
- **영상 임베드:** `react-youtube` (Client Component로 사용)
- **배포:** Vercel

### Liquid Glass 디자인 토큰

```css
--glass-base: rgba(255, 255, 255, 0.42);
--glass-blur: blur(24px);
--glass-border: 1px solid rgba(255, 255, 255, 0.65);
--shadow-outer: 8px 12px 24px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.7);
--shadow-inner: inset 1px 2px 4px rgba(255,255,255,0.9), inset -1px -2px 4px rgba(0,0,0,0.03);
--body-bg: #c8cdd4;
--text-main: #1a1a1c;
--text-secondary: #6b6b72;
```

---

## 3. 페이지 구조

### 3.1 라우팅

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | 홈 | 영상 캐러셀 + 그리드 + 소개 |
| `/about` | 회사 소개 | 대표인사말, 연혁, 팀 |
| `/archive` | 영상 아카이브 | 카테고리별 영상 전체 목록 |
| `/business` | 사업 안내 | 공연기획 / 전시기획 / 문화행사 |
| `/news` | 수상·보도 | 수상 내역 + 언론보도 |
| `/contact` | 문의 | 문의 양식 + 오시는 길 |

### 3.2 공통 컴포넌트

- **`<GlassNav>`** — 고정 상단 네비게이션. 스크롤 시 `backdrop-filter` blur 강도 증가 (16px → 28px)
- **`<GlassCard>`** — 유리 카드 기본 컴포넌트 (border-radius: 20px)
- **`<VideoModal>`** — 유튜브 영상 라이트박스 모달. 배경 클릭 시 닫힘
- **`<GlassFooter>`** — 회사 정보 + SNS 링크

---

## 4. 홈페이지 (`/`) 섹션 상세

### 4.1 네비게이션 (`<GlassNav>`)

- 높이 56px, border-radius 28px (pill shape)
- 좌측: 로고 텍스트 "아트컴퍼니"
- 우측: 회사 소개 / 영상 아카이브 / 사업 안내 / 수상·보도 / 문의
- 현재 페이지 메뉴 항목 강조 (font-weight 600, color: --text-main)
- 모바일: 햄버거 메뉴로 전환

### 4.2 히어로 영상 캐러셀 (`<VideoCarousel>`)

- **레이아웃:** 중앙 메인 카드(320×190px) + 좌우 사이드 카드(180×108px, opacity 0.55, scale 0.92)
- **동작:**
  - 좌우 화살표 버튼 또는 키보드 `←` `→` 로 탐색
  - 모바일 스와이프 지원 (사이드 카드 숨김, 카드 1장씩 표시)
  - 자동 재생 없음 (사용자 인터랙션에만 반응)
- **클릭:** 카드 클릭 시 `<VideoModal>` 열림 → YouTube IFrame 임베드
- **하단:** 페이지 인디케이터 dot (현재 위치 표시)
- **영상 데이터:** `data/videos.ts` 에 YouTube Video ID 목록으로 관리

### 4.3 최근 영상 그리드 (`<VideoGrid>`)

- 2×2 그리드 (모바일: 1×4)
- 각 카드: 썸네일(YouTube thumbnail API) + 제목 + 카테고리 + 날짜
- 우상단 "전체 보기 →" → `/archive` 링크
- 카드 hover: `translateY(-2px)` 애니메이션

### 4.4 소개 + 사업 안내 (나란히, `grid-cols-2`)

**소개 카드:**
- ABOUT 태그 (pill badge)
- 슬로건: "사소한 일상의 숨겨진 아름다움을 발견합니다"
- 2~3줄 회사 소개 텍스트
- "회사 소개 보기 →" 버튼 → `/about`

**사업 안내 카드:**
- 섹션 타이틀 "사업 안내"
- 3개 항목 리스트 (아이콘 + 제목 + 부제):
  - 🎭 공연 기획 — 클래식·무용·연극 기획 및 제작
  - 🎨 전시 기획 — 현대미술·사진·설치 전시 기획
  - 🎪 문화 행사 — 축제·문화포럼·커뮤니티 행사
- 각 항목 클릭 → `/business`

### 4.5 푸터 (`<GlassFooter>`)

- 좌: 로고 + 회사 정보 (대표, 사업자번호, 주소, 전화, 이메일)
- 우: SNS 아이콘 (YouTube, Instagram, Facebook)

---

## 5. 영상 데이터 구조

```typescript
// data/videos.ts
export interface Video {
  id: string;          // YouTube Video ID
  title: string;
  category: '공연기획' | '전시기획' | '문화행사';
  date: string;        // 'YYYY.MM'
  featured?: boolean;  // 히어로 캐러셀 노출 여부
}

export const videos: Video[] = [
  { id: 'dQw4w9WgXcQ', title: '2024 책읽는 한강공원', category: '문화행사', date: '2024.09', featured: true },
  // ...
];
```

---

## 6. 컴포넌트 파일 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (GlassNav + GlassFooter)
│   ├── page.tsx            # 홈 (/)
│   ├── about/page.tsx
│   ├── archive/page.tsx
│   ├── business/page.tsx
│   ├── news/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── GlassNav.tsx
│   ├── GlassCard.tsx
│   ├── GlassFooter.tsx
│   ├── VideoCarousel.tsx
│   ├── VideoGrid.tsx
│   ├── VideoModal.tsx
│   └── BusinessList.tsx
├── data/
│   └── videos.ts
└── styles/
    └── glass.css           # Liquid Glass CSS 변수
```

---

## 7. 반응형 브레이크포인트

| 브레이크포인트 | 변경 사항 |
|---|---|
| `< 768px` (모바일) | 네비 → 햄버거, 캐러셀 사이드 카드 숨김, 그리드 1열, 소개+사업 1열 |
| `768px~` (태블릿) | 그리드 2열, 소개+사업 나란히 |
| `1024px~` (데스크톱) | 최대 너비 900px, 여백 확보 |

---

## 8. 범위 외 (이번 스펙에서 제외)

- 로그인 / 회원가입
- CMS / 관리자 페이지
- 검색 기능
- 다국어(i18n)
- 서브 페이지 상세 디자인 (about, archive, business, news, contact) — 별도 스펙으로 분리
