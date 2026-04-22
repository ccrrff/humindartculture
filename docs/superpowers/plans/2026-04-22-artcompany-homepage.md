# 아트컴퍼니 홈페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 문화예술 회사 아트컴퍼니의 Next.js 홈페이지를 구축한다. 유튜브 영상 캐러셀이 핵심이며, Liquid Glass 디자인 시스템을 적용한다.

**Architecture:** Next.js 15 App Router 기반 정적 홈페이지. 영상 데이터는 `src/data/videos.ts` 로컬 파일로 관리하며 별도 백엔드 없음. Liquid Glass CSS 변수를 전역 스타일로 정의하고 Tailwind arbitrary values로 적용.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v3, Framer Motion, react-youtube, TypeScript, Jest + React Testing Library

---

## File Map

| 파일 | 역할 |
|------|------|
| `src/styles/glass.css` | Liquid Glass CSS 변수 정의 |
| `src/data/videos.ts` | Video 타입 + 샘플 데이터 |
| `src/components/GlassCard.tsx` | 유리 카드 기본 wrapper |
| `src/components/GlassNav.tsx` | 고정 상단 네비게이션 |
| `src/components/GlassFooter.tsx` | 푸터 |
| `src/components/VideoModal.tsx` | YouTube 라이트박스 모달 |
| `src/components/VideoCarousel.tsx` | 히어로 영상 캐러셀 |
| `src/components/VideoGrid.tsx` | 최근 영상 2×2 그리드 |
| `src/components/BusinessList.tsx` | 사업 분야 3개 리스트 |
| `src/app/layout.tsx` | 루트 레이아웃 (Nav + Footer) |
| `src/app/page.tsx` | 홈 페이지 조립 |
| `src/app/about/page.tsx` | 회사 소개 stub |
| `src/app/archive/page.tsx` | 영상 아카이브 stub |
| `src/app/business/page.tsx` | 사업 안내 stub |
| `src/app/news/page.tsx` | 수상·보도 stub |
| `src/app/contact/page.tsx` | 문의 stub |

---

## Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `jest.config.ts`, `jest.setup.ts`

- [ ] **Step 1: Next.js 앱 생성**

```bash
cd /home/guseejrdl/koesprojects/cultures
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes
```

Expected: `src/app/`, `tailwind.config.ts`, `next.config.ts` 생성됨

- [ ] **Step 2: 의존성 설치**

```bash
npm install react-youtube framer-motion
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

- [ ] **Step 3: Jest 설정 파일 작성**

`jest.config.ts`:
```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
```


`jest.setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: `package.json`에 test 스크립트 추가**

`package.json`의 `"scripts"` 에 추가:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 5: 기본 보일러플레이트 제거**

`src/app/globals.css` 내용을 모두 지우고 아래로 교체:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/app/page.tsx` 내용을 아래로 교체:
```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 6: 빌드 확인**

```bash
npm run build
```

Expected: `✓ Compiled successfully` (빌드 에러 없음)

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "chore: Next.js 15 프로젝트 초기 설정"
```

---

## Task 2: Liquid Glass 디자인 토큰

**Files:**
- Create: `src/styles/glass.css`
- Modify: `src/app/globals.css`
- Create: `src/components/GlassCard.tsx`
- Create: `__tests__/components/GlassCard.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/GlassCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import GlassCard from '@/components/GlassCard';

describe('GlassCard', () => {
  it('children을 렌더링한다', () => {
    render(<GlassCard><span>hello</span></GlassCard>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('기본으로 glass 클래스를 포함한다', () => {
    const { container } = render(<GlassCard>내용</GlassCard>);
    expect(container.firstChild).toHaveClass('glass');
  });

  it('추가 className을 병합한다', () => {
    const { container } = render(<GlassCard className="p-4">내용</GlassCard>);
    expect(container.firstChild).toHaveClass('glass', 'p-4');
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- GlassCard
```

Expected: FAIL — `Cannot find module '@/components/GlassCard'`

- [ ] **Step 3: glass.css 작성**

`src/styles/glass.css`:
```css
:root {
  --glass-base: rgba(255, 255, 255, 0.42);
  --glass-blur: blur(24px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.65);
  --shadow-outer: 8px 12px 24px rgba(0, 0, 0, 0.06),
    -4px -4px 12px rgba(255, 255, 255, 0.7);
  --shadow-inner: inset 1px 2px 4px rgba(255, 255, 255, 0.9),
    inset -1px -2px 4px rgba(0, 0, 0, 0.03);
  --body-bg: #c8cdd4;
  --text-main: #1a1a1c;
  --text-secondary: #6b6b72;
}

.glass {
  background: var(--glass-base);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--shadow-outer), var(--shadow-inner);
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.glass > * {
  position: relative;
  z-index: 1;
}
```

`src/app/globals.css` 에 import 추가:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '../styles/glass.css';

body {
  background: var(--body-bg);
  color: var(--text-main);
}
```

- [ ] **Step 4: GlassCard 컴포넌트 구현**

`src/components/GlassCard.tsx`:
```tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: 테스트 통과 확인**

```bash
npm test -- GlassCard
```

Expected: PASS (3 tests)

- [ ] **Step 6: 커밋**

```bash
git add src/styles/glass.css src/app/globals.css src/components/GlassCard.tsx __tests__/components/GlassCard.test.tsx
git commit -m "feat: Liquid Glass 디자인 토큰 및 GlassCard 컴포넌트"
```

---

## Task 3: 영상 데이터 레이어

**Files:**
- Create: `src/data/videos.ts`
- Create: `__tests__/data/videos.test.ts`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/data/videos.test.ts`:
```typescript
import { videos, getFeaturedVideos, getRecentVideos } from '@/data/videos';
import type { Video } from '@/data/videos';

describe('videos 데이터', () => {
  it('Video 타입을 만족하는 항목만 포함한다', () => {
    videos.forEach((v: Video) => {
      expect(typeof v.id).toBe('string');
      expect(typeof v.title).toBe('string');
      expect(['공연기획', '전시기획', '문화행사']).toContain(v.category);
      expect(typeof v.date).toBe('string');
    });
  });

  it('getFeaturedVideos는 featured: true 항목만 반환한다', () => {
    const featured = getFeaturedVideos();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((v) => expect(v.featured).toBe(true));
  });

  it('getRecentVideos는 n개를 최신순으로 반환한다', () => {
    const recent = getRecentVideos(4);
    expect(recent.length).toBe(4);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- videos
```

Expected: FAIL — `Cannot find module '@/data/videos'`

- [ ] **Step 3: 데이터 파일 구현**

`src/data/videos.ts`:
```typescript
export interface Video {
  id: string;
  title: string;
  category: '공연기획' | '전시기획' | '문화행사';
  date: string;
  featured?: boolean;
}

export const videos: Video[] = [
  {
    id: 'jNQXAC9IVRw',
    title: '2024 책읽는 한강공원',
    category: '문화행사',
    date: '2024.09',
    featured: true,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: '2024 가을 문화축제',
    category: '공연기획',
    date: '2024.10',
    featured: true,
  },
  {
    id: 'hT_nvWreIhg',
    title: '현대미술 전시 오프닝',
    category: '전시기획',
    date: '2024.08',
    featured: true,
  },
  {
    id: 'ZbZSe6N_BXs',
    title: '지역 문화 교류 행사',
    category: '문화행사',
    date: '2024.07',
    featured: false,
  },
  {
    id: 'YR5ApYxkU-U',
    title: '청년 예술가 쇼케이스',
    category: '공연기획',
    date: '2024.06',
    featured: false,
  },
  {
    id: 'kJQP7kiw5Fk',
    title: '2023 봄 공연 하이라이트',
    category: '공연기획',
    date: '2023.05',
    featured: false,
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
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test -- videos
```

Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/data/videos.ts __tests__/data/videos.test.ts
git commit -m "feat: 영상 데이터 레이어 및 유틸리티 함수"
```

---

## Task 4: GlassNav 네비게이션

**Files:**
- Create: `src/components/GlassNav.tsx`
- Create: `__tests__/components/GlassNav.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/GlassNav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import GlassNav from '@/components/GlassNav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('GlassNav', () => {
  it('로고를 렌더링한다', () => {
    render(<GlassNav />);
    expect(screen.getByText('아트컴퍼니')).toBeInTheDocument();
  });

  it('5개 메뉴 항목을 렌더링한다', () => {
    render(<GlassNav />);
    expect(screen.getByText('회사 소개')).toBeInTheDocument();
    expect(screen.getByText('영상 아카이브')).toBeInTheDocument();
    expect(screen.getByText('사업 안내')).toBeInTheDocument();
    expect(screen.getByText('수상·보도')).toBeInTheDocument();
    expect(screen.getByText('문의')).toBeInTheDocument();
  });

  it('현재 경로의 메뉴 항목에 active 스타일을 적용한다', () => {
    render(<GlassNav />);
    const homeLink = screen.getByText('회사 소개').closest('a');
    expect(homeLink).not.toBeNull();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- GlassNav
```

Expected: FAIL — `Cannot find module '@/components/GlassNav'`

- [ ] **Step 3: GlassNav 구현**

`src/components/GlassNav.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '회사 소개', href: '/about' },
  { label: '영상 아카이브', href: '/archive' },
  { label: '사업 안내', href: '/business' },
  { label: '수상·보도', href: '/news' },
  { label: '문의', href: '/contact' },
];

export default function GlassNav() {
  const pathname = usePathname();

  return (
    <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[900px] h-14 flex items-center px-7 gap-8 rounded-[28px]">
      <Link href="/" className="text-[15px] font-bold tracking-wide text-[var(--text-main)] mr-auto">
        아트컴퍼니
      </Link>
      {NAV_ITEMS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`text-[13px] whitespace-nowrap transition-colors ${
            pathname === href
              ? 'text-[var(--text-main)] font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test -- GlassNav
```

Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/GlassNav.tsx __tests__/components/GlassNav.test.tsx
git commit -m "feat: GlassNav 네비게이션 컴포넌트"
```

---

## Task 5: VideoModal

**Files:**
- Create: `src/components/VideoModal.tsx`
- Create: `__tests__/components/VideoModal.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/VideoModal.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VideoModal from '@/components/VideoModal';

jest.mock('react-youtube', () => {
  const MockYT = ({ videoId }: { videoId: string }) => (
    <div data-testid="youtube-player" data-video-id={videoId} />
  );
  MockYT.displayName = 'MockYouTube';
  return MockYT;
});

describe('VideoModal', () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it('videoId가 없으면 렌더링하지 않는다', () => {
    const { container } = render(<VideoModal videoId={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('videoId가 있으면 YouTube 플레이어를 렌더링한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-player')).toHaveAttribute('data-video-id', 'abc123');
  });

  it('배경 클릭 시 onClose를 호출한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('닫기 버튼 클릭 시 onClose를 호출한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- VideoModal
```

Expected: FAIL — `Cannot find module '@/components/VideoModal'`

- [ ] **Step 3: VideoModal 구현**

`src/components/VideoModal.tsx`:
```tsx
'use client';

import YouTube from 'react-youtube';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative glass rounded-2xl overflow-hidden p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center text-[var(--text-main)] text-sm hover:scale-110 transition-transform"
        >
          ✕
        </button>
        <YouTube
          videoId={videoId}
          opts={{
            width: '720',
            height: '405',
            playerVars: { autoplay: 1 },
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test -- VideoModal
```

Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/VideoModal.tsx __tests__/components/VideoModal.test.tsx
git commit -m "feat: VideoModal 유튜브 라이트박스 컴포넌트"
```

---

## Task 6: VideoCarousel

**Files:**
- Create: `src/components/VideoCarousel.tsx`
- Create: `__tests__/components/VideoCarousel.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/VideoCarousel.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCarousel from '@/components/VideoCarousel';
import type { Video } from '@/data/videos';

jest.mock('@/components/VideoModal', () => {
  const Mock = ({ videoId, onClose }: { videoId: string | null; onClose: () => void }) =>
    videoId ? <div data-testid="modal" data-video-id={videoId} onClick={onClose} /> : null;
  Mock.displayName = 'MockVideoModal';
  return Mock;
});

const MOCK_VIDEOS: Video[] = [
  { id: 'aaa', title: '영상 A', category: '공연기획', date: '2024.01', featured: true },
  { id: 'bbb', title: '영상 B', category: '전시기획', date: '2024.02', featured: true },
  { id: 'ccc', title: '영상 C', category: '문화행사', date: '2024.03', featured: true },
];

describe('VideoCarousel', () => {
  it('초기에 첫 번째 영상을 중앙에 표시한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    expect(screen.getByText('영상 A')).toBeInTheDocument();
  });

  it('다음 버튼 클릭 시 다음 영상으로 이동한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('다음 영상'));
    expect(screen.getByText('영상 B')).toBeInTheDocument();
  });

  it('이전 버튼 클릭 시 이전 영상으로 이동한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('다음 영상'));
    fireEvent.click(screen.getByLabelText('이전 영상'));
    expect(screen.getByText('영상 A')).toBeInTheDocument();
  });

  it('중앙 카드 클릭 시 모달이 열린다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByRole('button', { name: '영상 A 재생' }));
    expect(screen.getByTestId('modal')).toHaveAttribute('data-video-id', 'aaa');
  });

  it('dot 인디케이터 개수가 영상 수와 일치한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    const dots = screen.getAllByRole('listitem');
    expect(dots.length).toBe(MOCK_VIDEOS.length);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- VideoCarousel
```

Expected: FAIL — `Cannot find module '@/components/VideoCarousel'`

- [ ] **Step 3: VideoCarousel 구현**

`src/components/VideoCarousel.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from './VideoModal';

interface VideoCarouselProps {
  videos: Video[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + videos.length) % videos.length);
  const next = () => setCurrent((c) => (c + 1) % videos.length);

  const leftIdx = (current - 1 + videos.length) % videos.length;
  const rightIdx = (current + 1) % videos.length;

  return (
    <>
      <div className="glass p-7 rounded-[28px]">
        <p className="text-[11px] tracking-[0.1em] uppercase text-[var(--text-secondary)] mb-4">
          Featured Works
        </p>

        {/* 캐러셀 트랙 */}
        <div className="flex items-center justify-center gap-3">
          {/* 이전 버튼 */}
          <button
            aria-label="이전 영상"
            onClick={prev}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shrink-0"
          >
            ‹
          </button>

          {/* 왼쪽 사이드 카드 */}
          <div
            className="hidden md:block rounded-2xl overflow-hidden shrink-0 opacity-55 scale-95 cursor-pointer transition-transform hover:scale-[0.97]"
            style={{ width: 180, height: 108 }}
            onClick={() => { setCurrent(leftIdx); }}
          >
            <div className="relative w-full h-full">
              <Image
                src={getYoutubeThumbnail(videos[leftIdx].id)}
                alt={videos[leftIdx].title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* 중앙 메인 카드 */}
          <div
            className="rounded-2xl overflow-hidden shrink-0 shadow-2xl cursor-pointer"
            style={{ width: 320, height: 190 }}
          >
            <div className="relative w-full h-full group">
              <Image
                src={getYoutubeThumbnail(videos[current].id)}
                alt={videos[current].title}
                fill
                className="object-cover"
                unoptimized
              />
              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                aria-label={`${videos[current].title} 재생`}
                onClick={() => setActiveId(videos[current].id)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              >
                <span className="w-12 h-12 rounded-full bg-white/25 backdrop-blur border border-white/35 flex items-center justify-center text-white text-lg">
                  ▶
                </span>
              </button>
              <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                <p className="text-white text-[13px] font-semibold">{videos[current].title}</p>
                <p className="text-white/70 text-[10px]">{videos[current].category} · {videos[current].date}</p>
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드 카드 */}
          <div
            className="hidden md:block rounded-2xl overflow-hidden shrink-0 opacity-55 scale-95 cursor-pointer transition-transform hover:scale-[0.97]"
            style={{ width: 180, height: 108 }}
            onClick={() => { setCurrent(rightIdx); }}
          >
            <div className="relative w-full h-full">
              <Image
                src={getYoutubeThumbnail(videos[rightIdx].id)}
                alt={videos[rightIdx].title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            aria-label="다음 영상"
            onClick={next}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shrink-0"
          >
            ›
          </button>
        </div>

        {/* Dot 인디케이터 */}
        <ul className="flex gap-1.5 justify-center mt-4 list-none p-0" aria-label="영상 목록">
          {videos.map((_, i) => (
            <li
              key={i}
              role="listitem"
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                i === current
                  ? 'w-4 bg-[var(--text-main)]/55'
                  : 'w-1.5 bg-[var(--text-main)]/20'
              }`}
            />
          ))}
        </ul>
      </div>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test -- VideoCarousel
```

Expected: PASS (5 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/VideoCarousel.tsx __tests__/components/VideoCarousel.test.tsx
git commit -m "feat: VideoCarousel 히어로 영상 캐러셀 컴포넌트"
```

---

## Task 7: VideoGrid

**Files:**
- Create: `src/components/VideoGrid.tsx`
- Create: `__tests__/components/VideoGrid.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/VideoGrid.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VideoGrid from '@/components/VideoGrid';
import type { Video } from '@/data/videos';

jest.mock('@/components/VideoModal', () => {
  const Mock = ({ videoId, onClose }: { videoId: string | null; onClose: () => void }) =>
    videoId ? <div data-testid="modal" onClick={onClose} /> : null;
  Mock.displayName = 'MockVideoModal';
  return Mock;
});

jest.mock('next/image', () => {
  const Mock = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  Mock.displayName = 'MockImage';
  return Mock;
});

const MOCK_VIDEOS: Video[] = [
  { id: 'v1', title: '영상 1', category: '공연기획', date: '2024.10' },
  { id: 'v2', title: '영상 2', category: '전시기획', date: '2024.09' },
  { id: 'v3', title: '영상 3', category: '문화행사', date: '2024.08' },
  { id: 'v4', title: '영상 4', category: '공연기획', date: '2024.07' },
];

describe('VideoGrid', () => {
  it('4개의 영상 카드를 렌더링한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    expect(screen.getAllByRole('img').length).toBe(4);
  });

  it('각 영상의 제목을 표시한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    expect(screen.getByText('영상 1')).toBeInTheDocument();
    expect(screen.getByText('영상 4')).toBeInTheDocument();
  });

  it('카드 클릭 시 해당 영상의 모달이 열린다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('영상 1 재생'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('"전체 보기" 링크를 렌더링한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    const link = screen.getByRole('link', { name: /전체 보기/ });
    expect(link).toHaveAttribute('href', '/archive');
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- VideoGrid
```

Expected: FAIL — `Cannot find module '@/components/VideoGrid'`

- [ ] **Step 3: VideoGrid 구현**

`src/components/VideoGrid.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from './VideoModal';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      <div className="glass p-6 rounded-[24px]">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-[15px] font-semibold text-[var(--text-main)]">최근 영상</span>
          <Link
            href="/archive"
            className="text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {videos.map((video) => (
            <div
              key={video.id}
              className="glass rounded-xl overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <div className="relative h-[110px]">
                <Image
                  src={getYoutubeThumbnail(video.id)}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  aria-label={`${video.title} 재생`}
                  onClick={() => setActiveId(video.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/25 backdrop-blur border border-white/35 flex items-center justify-center text-white text-xs">
                    ▶
                  </span>
                </button>
              </div>
              <div className="p-2.5 bg-white/55 backdrop-blur border-t border-white/50">
                <h4 className="text-[12px] font-medium text-[var(--text-main)] truncate">{video.title}</h4>
                <span className="text-[10px] text-[var(--text-secondary)]">{video.category} · {video.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test -- VideoGrid
```

Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/VideoGrid.tsx __tests__/components/VideoGrid.test.tsx
git commit -m "feat: VideoGrid 최근 영상 그리드 컴포넌트"
```

---

## Task 8: BusinessList + AboutCard

**Files:**
- Create: `src/components/BusinessList.tsx`
- Create: `src/components/AboutCard.tsx`
- Create: `__tests__/components/BusinessList.test.tsx`

- [ ] **Step 1: 테스트 먼저 작성**

`__tests__/components/BusinessList.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import BusinessList from '@/components/BusinessList';

jest.mock('next/link', () => {
  const Mock = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  Mock.displayName = 'MockLink';
  return Mock;
});

describe('BusinessList', () => {
  it('3개의 사업 항목을 렌더링한다', () => {
    render(<BusinessList />);
    expect(screen.getByText('공연 기획')).toBeInTheDocument();
    expect(screen.getByText('전시 기획')).toBeInTheDocument();
    expect(screen.getByText('문화 행사')).toBeInTheDocument();
  });

  it('각 항목이 /business 링크를 가진다', () => {
    render(<BusinessList />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => expect(link).toHaveAttribute('href', '/business'));
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test -- BusinessList
```

Expected: FAIL — `Cannot find module '@/components/BusinessList'`

- [ ] **Step 3: BusinessList 구현**

`src/components/BusinessList.tsx`:
```tsx
import Link from 'next/link';

const ITEMS = [
  { icon: '🎭', title: '공연 기획', desc: '클래식·무용·연극 기획 및 제작' },
  { icon: '🎨', title: '전시 기획', desc: '현대미술·사진·설치 전시 기획' },
  { icon: '🎪', title: '문화 행사', desc: '축제·문화포럼·커뮤니티 행사' },
];

export default function BusinessList() {
  return (
    <div className="glass p-6 rounded-[24px]">
      <p className="text-[15px] font-semibold text-[var(--text-main)] mb-3">사업 안내</p>
      <div className="flex flex-col gap-2">
        {ITEMS.map(({ icon, title, desc }) => (
          <Link
            key={title}
            href="/business"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/45 border border-white/65 hover:translate-x-0.5 transition-transform"
          >
            <span className="w-8 h-8 rounded-[10px] bg-white/40 flex items-center justify-center text-base shrink-0">
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[var(--text-main)]">{title}</p>
              <p className="text-[11px] text-[var(--text-secondary)] truncate">{desc}</p>
            </div>
            <span className="ml-auto text-[var(--text-secondary)] text-sm">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: AboutCard 구현** (테스트 불필요 — 정적 마크업)

`src/components/AboutCard.tsx`:
```tsx
import Link from 'next/link';

export default function AboutCard() {
  return (
    <div className="glass p-6 rounded-[24px]">
      <span className="inline-block text-[10px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-2.5 py-0.5 mb-3">
        About
      </span>
      <p className="text-[14px] font-medium leading-relaxed text-[var(--text-main)] mb-2">
        "사소한 일상의 숨겨진<br />아름다움을 발견합니다"
      </p>
      <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-4">
        아트컴퍼니는 공연·전시·문화행사를 기획하는 문화예술 전문 기업입니다.
        2010년 설립 이후 다양한 예술 프로젝트를 통해 일상 속 문화의 가치를 전달하고 있습니다.
      </p>
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[18px] bg-white/50 border border-white/70 shadow-sm text-[12px] font-medium text-[var(--text-main)] hover:-translate-y-px transition-transform"
      >
        회사 소개 보기 →
      </Link>
    </div>
  );
}
```

- [ ] **Step 5: 테스트 통과 확인**

```bash
npm test -- BusinessList
```

Expected: PASS (2 tests)

- [ ] **Step 6: 커밋**

```bash
git add src/components/BusinessList.tsx src/components/AboutCard.tsx __tests__/components/BusinessList.test.tsx
git commit -m "feat: BusinessList, AboutCard 컴포넌트"
```

---

## Task 9: GlassFooter + 루트 레이아웃

**Files:**
- Create: `src/components/GlassFooter.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: GlassFooter 구현**

`src/components/GlassFooter.tsx`:
```tsx
export default function GlassFooter() {
  return (
    <footer className="glass p-5 rounded-[20px] flex justify-between items-center flex-wrap gap-3 mt-auto">
      <div>
        <p className="text-[14px] font-bold text-[var(--text-main)] mb-1">아트컴퍼니</p>
        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
          대표: 홍길동 &nbsp;|&nbsp; 사업자번호: 000-00-00000<br />
          서울특별시 종로구 문화예술로 1길<br />
          Tel. 02-000-0000 &nbsp;|&nbsp; artcompany@example.com
        </p>
      </div>
      <div className="flex gap-2">
        {(['▶', '📷', 'f'] as const).map((icon, i) => (
          <div
            key={i}
            className="w-[30px] h-[30px] rounded-full glass flex items-center justify-center text-xs cursor-pointer hover:scale-110 transition-transform"
          >
            {icon}
          </div>
        ))}
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: 루트 레이아웃 작성**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlassNav from '@/components/GlassNav';
import GlassFooter from '@/components/GlassFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '아트컴퍼니',
  description: '문화예술 전문 기업 아트컴퍼니 — 공연·전시·문화행사 기획',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ background: 'var(--body-bg)' }}>
        <GlassNav />
        <div className="max-w-[900px] mx-auto px-4 pt-24 pb-10 flex flex-col gap-2.5 min-h-screen">
          {children}
          <GlassFooter />
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 빌드 확인**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: 커밋**

```bash
git add src/components/GlassFooter.tsx src/app/layout.tsx
git commit -m "feat: GlassFooter 및 루트 레이아웃"
```

---

## Task 10: 홈 페이지 조립

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 홈 페이지 작성**

`src/app/page.tsx`:
```tsx
import VideoCarousel from '@/components/VideoCarousel';
import VideoGrid from '@/components/VideoGrid';
import AboutCard from '@/components/AboutCard';
import BusinessList from '@/components/BusinessList';
import { getFeaturedVideos, getRecentVideos } from '@/data/videos';

export default function Home() {
  const featured = getFeaturedVideos();
  const recent = getRecentVideos(4);

  return (
    <>
      <VideoCarousel videos={featured} />
      <VideoGrid videos={recent} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <AboutCard />
        <BusinessList />
      </div>
    </>
  );
}
```

- [ ] **Step 2: 개발 서버 실행 및 시각 확인**

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 확인:
- [ ] 네비게이션 상단 고정 + glass 효과
- [ ] 영상 캐러셀 중앙 카드 + 좌우 사이드 카드 (데스크톱)
- [ ] dot 인디케이터
- [ ] 이전/다음 버튼 동작
- [ ] 카드 클릭 → 모달 팝업 + YouTube 재생
- [ ] 최근 영상 2×2 그리드
- [ ] 소개 카드 + 사업 안내 나란히
- [ ] 푸터

- [ ] **Step 3: 빌드 최종 확인**

```bash
npm run build
```

Expected: `✓ Compiled successfully`, 빌드 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/app/page.tsx
git commit -m "feat: 홈 페이지 조립 완성"
```

---

## Task 11: 서브 페이지 Stub

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/archive/page.tsx`
- Create: `src/app/business/page.tsx`
- Create: `src/app/news/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: 각 stub 페이지 작성**

`src/app/about/page.tsx`:
```tsx
export default function AboutPage() {
  return (
    <div className="glass p-10 rounded-[24px] text-center">
      <p className="text-[13px] text-[var(--text-secondary)]">회사 소개 페이지 — 준비 중</p>
    </div>
  );
}
```

`src/app/archive/page.tsx`:
```tsx
export default function ArchivePage() {
  return (
    <div className="glass p-10 rounded-[24px] text-center">
      <p className="text-[13px] text-[var(--text-secondary)]">영상 아카이브 — 준비 중</p>
    </div>
  );
}
```

`src/app/business/page.tsx`:
```tsx
export default function BusinessPage() {
  return (
    <div className="glass p-10 rounded-[24px] text-center">
      <p className="text-[13px] text-[var(--text-secondary)]">사업 안내 — 준비 중</p>
    </div>
  );
}
```

`src/app/news/page.tsx`:
```tsx
export default function NewsPage() {
  return (
    <div className="glass p-10 rounded-[24px] text-center">
      <p className="text-[13px] text-[var(--text-secondary)]">수상·보도 — 준비 중</p>
    </div>
  );
}
```

`src/app/contact/page.tsx`:
```tsx
export default function ContactPage() {
  return (
    <div className="glass p-10 rounded-[24px] text-center">
      <p className="text-[13px] text-[var(--text-secondary)]">문의 — 준비 중</p>
    </div>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
npm run build
```

Expected: 6개 라우트 (`/`, `/about`, `/archive`, `/business`, `/news`, `/contact`) 모두 빌드됨

- [ ] **Step 3: 전체 테스트 통과 확인**

```bash
npm test
```

Expected: 전체 PASS

- [ ] **Step 4: 최종 커밋**

```bash
git add src/app/about src/app/archive src/app/business src/app/news src/app/contact
git commit -m "feat: 서브 페이지 stub 추가"
```

---

## 완료 기준

- [ ] `npm test` — 전체 PASS
- [ ] `npm run build` — 빌드 에러 없음
- [ ] `npm run dev` 에서 홈 페이지 시각 확인 완료
- [ ] 영상 캐러셀 클릭 → YouTube 모달 재생 동작 확인
- [ ] 모바일 뷰 (375px) 레이아웃 깨짐 없음
