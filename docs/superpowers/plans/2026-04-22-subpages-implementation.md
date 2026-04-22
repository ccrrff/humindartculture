# 아트컴퍼니 하위 페이지 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** /about, /archive, /business, /news, /contact 5개 하위 페이지를 Liquid Glass 디자인으로 완성한다.

**Architecture:** 각 페이지는 Server Component로 작성하고, 클라이언트 상태(필터, 모달)가 필요한 부분만 Client Component로 분리한다. 콘텐츠 데이터는 `src/data/` TypeScript 파일로 관리하며 기존 `videos.ts` 패턴을 따른다.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, react-youtube (VideoModal), Next.js Image

---

## 파일 구조

```
src/
├── app/
│   ├── about/page.tsx          수정 (기존 플레이스홀더 교체)
│   ├── archive/page.tsx        수정
│   ├── business/page.tsx       수정
│   ├── news/page.tsx           수정
│   └── contact/page.tsx        수정
├── components/
│   ├── ArchiveClient.tsx        생성 (카테고리 필터 + 영상 그리드, Client)
│   └── BusinessVideos.tsx       생성 (카테고리별 관련 영상 + VideoModal, Client)
└── data/
    ├── about.ts                 생성
    ├── business.ts              생성
    ├── news.ts                  생성
    └── contact.ts               생성

__tests__/
└── components/
    ├── ArchiveClient.test.tsx   생성
    ├── BusinessVideos.test.tsx  생성
    ├── AboutPage.test.tsx       생성
    ├── NewsPage.test.tsx        생성
    └── ContactPage.test.tsx     생성
```

---

## Task 1: 데이터 파일 4개 생성

**Files:**
- Create: `src/data/about.ts`
- Create: `src/data/business.ts`
- Create: `src/data/news.ts`
- Create: `src/data/contact.ts`

- [ ] **Step 1: about.ts 작성**

```typescript
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
```

- [ ] **Step 2: business.ts 작성**

```typescript
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
```

- [ ] **Step 3: news.ts 작성**

```typescript
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
```

- [ ] **Step 4: contact.ts 작성**

```typescript
// src/data/contact.ts
export const contactInfo = {
  phone: '02-000-0000',
  email: 'artcompany@example.com',
  address: '서울특별시 종로구 문화예술로 1길',
  hours: '평일 09:00 – 18:00',
  mapSrc:
    'https://maps.google.com/maps?q=서울특별시+종로구&t=&z=15&ie=UTF8&iwloc=&output=embed',
};
```

- [ ] **Step 5: 커밋**

```bash
git add src/data/about.ts src/data/business.ts src/data/news.ts src/data/contact.ts
git commit -m "feat: add data files for sub-pages"
```

---

## Task 2: ArchiveClient 컴포넌트

**Files:**
- Create: `src/components/ArchiveClient.tsx`
- Create: `__tests__/components/ArchiveClient.test.tsx`

- [ ] **Step 1: 테스트 작성**

```typescript
// __tests__/components/ArchiveClient.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ArchiveClient from '@/components/ArchiveClient';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'aaa', title: '공연 영상', category: '공연기획', date: '2024.10' },
  { id: 'bbb', title: '전시 영상', category: '전시기획', date: '2024.09' },
  { id: 'ccc', title: '행사 영상', category: '문화행사', date: '2024.08' },
];

describe('ArchiveClient', () => {
  it('기본 상태에서 전체 영상을 렌더링한다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.getByText('전시 영상')).toBeInTheDocument();
    expect(screen.getByText('행사 영상')).toBeInTheDocument();
  });

  it('공연기획 탭 클릭 시 해당 영상만 표시된다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    fireEvent.click(screen.getByRole('button', { name: '공연기획' }));
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.queryByText('전시 영상')).not.toBeInTheDocument();
    expect(screen.queryByText('행사 영상')).not.toBeInTheDocument();
  });

  it('전체 탭 클릭 시 모든 영상이 다시 표시된다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    fireEvent.click(screen.getByRole('button', { name: '공연기획' }));
    fireEvent.click(screen.getByRole('button', { name: '전체' }));
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.getByText('전시 영상')).toBeInTheDocument();
    expect(screen.getByText('행사 영상')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest ArchiveClient --no-coverage 2>&1 | tail -5
```
Expected: FAIL — "Cannot find module '@/components/ArchiveClient'"

- [ ] **Step 3: ArchiveClient 구현**

```typescript
// src/components/ArchiveClient.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from './VideoModal';

type Category = '전체' | '공연기획' | '전시기획' | '문화행사';
const TABS: Category[] = ['전체', '공연기획', '전시기획', '문화행사'];

interface ArchiveClientProps {
  videos: Video[];
}

export default function ArchiveClient({ videos }: ArchiveClientProps) {
  const [active, setActive] = useState<Category>('전체');
  const [modalId, setModalId] = useState<string | null>(null);

  const filtered = active === '전체' ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <div className="glass p-7 rounded-[28px]">
        <div className="flex gap-1 mb-6 bg-white/30 rounded-[99px] p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-[99px] text-[12px] transition-all ${
                active === tab
                  ? 'bg-white/65 border border-white/80 font-semibold text-[var(--text-main)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="glass rounded-xl overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <div className="relative aspect-video">
                <Image
                  src={getYoutubeThumbnail(video.id)}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <button
                  aria-label={`${video.title} 재생`}
                  onClick={() => setModalId(video.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/25 backdrop-blur border border-white/35 flex items-center justify-center text-white text-sm">
                    ▶
                  </span>
                </button>
              </div>
              <div className="p-3 bg-white/55 backdrop-blur border-t border-white/50">
                <h4 className="text-[13px] font-medium text-[var(--text-main)] truncate">{video.title}</h4>
                <span className="text-[11px] text-[var(--text-secondary)]">
                  {video.category} · {video.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoId={modalId} onClose={() => setModalId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest ArchiveClient --no-coverage 2>&1 | tail -5
```
Expected: PASS — 3 tests passing

- [ ] **Step 5: 커밋**

```bash
git add src/components/ArchiveClient.tsx __tests__/components/ArchiveClient.test.tsx
git commit -m "feat: add ArchiveClient with category filter"
```

---

## Task 3: /archive 페이지

**Files:**
- Modify: `src/app/archive/page.tsx`

- [ ] **Step 1: archive/page.tsx 교체**

```typescript
// src/app/archive/page.tsx
import ArchiveClient from '@/components/ArchiveClient';
import { videos } from '@/data/videos';

export default function ArchivePage() {
  const sorted = [...videos].sort((a, b) => b.date.localeCompare(a.date));
  return <ArchiveClient videos={sorted} />;
}
```

- [ ] **Step 2: 브라우저 확인**

`http://localhost:3000/archive` 방문 — 영상 4열 그리드와 카테고리 탭이 보여야 함.

- [ ] **Step 3: 커밋**

```bash
git add src/app/archive/page.tsx
git commit -m "feat: implement /archive page with category filter"
```

---

## Task 4: BusinessVideos 컴포넌트 + /business 페이지

**Files:**
- Create: `src/components/BusinessVideos.tsx`
- Create: `__tests__/components/BusinessVideos.test.tsx`
- Modify: `src/app/business/page.tsx`

- [ ] **Step 1: 테스트 작성**

```typescript
// __tests__/components/BusinessVideos.test.tsx
import { render, screen } from '@testing-library/react';
import BusinessVideos from '@/components/BusinessVideos';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'aaa', title: '클래식 공연', category: '공연기획', date: '2024.10' },
  { id: 'bbb', title: '전시 오프닝', category: '전시기획', date: '2024.09' },
];

describe('BusinessVideos', () => {
  it('해당 카테고리의 영상만 렌더링한다', () => {
    render(<BusinessVideos videos={mockVideos} category="공연기획" />);
    expect(screen.getByText('클래식 공연')).toBeInTheDocument();
    expect(screen.queryByText('전시 오프닝')).not.toBeInTheDocument();
  });

  it('영상이 없으면 아무것도 렌더링하지 않는다', () => {
    render(<BusinessVideos videos={mockVideos} category="문화행사" />);
    expect(screen.queryByText('클래식 공연')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest BusinessVideos --no-coverage 2>&1 | tail -5
```
Expected: FAIL — "Cannot find module '@/components/BusinessVideos'"

- [ ] **Step 3: BusinessVideos 구현**

```typescript
// src/components/BusinessVideos.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import type { BusinessItem } from '@/data/business';
import VideoModal from './VideoModal';

interface BusinessVideosProps {
  videos: Video[];
  category: BusinessItem['id'];
}

export default function BusinessVideos({ videos, category }: BusinessVideosProps) {
  const [modalId, setModalId] = useState<string | null>(null);
  const filtered = videos.filter((v) => v.category === category);

  if (filtered.length === 0) return null;

  return (
    <>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-widest">관련 영상</span>
        <div className="flex gap-2 overflow-x-auto">
          {filtered.map((video) => (
            <button
              key={video.id}
              aria-label={`${video.title} 재생`}
              onClick={() => setModalId(video.id)}
              className="relative w-[100px] h-[60px] rounded-lg overflow-hidden shrink-0 hover:scale-105 transition-transform"
            >
              <Image
                src={getYoutubeThumbnail(video.id)}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-white/30 border border-white/50 flex items-center justify-center text-white text-[8px]">▶</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <VideoModal videoId={modalId} onClose={() => setModalId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest BusinessVideos --no-coverage 2>&1 | tail -5
```
Expected: PASS — 2 tests passing

- [ ] **Step 5: /business 페이지 구현**

```typescript
// src/app/business/page.tsx
import BusinessVideos from '@/components/BusinessVideos';
import { businessItems } from '@/data/business';
import { videos } from '@/data/videos';

export default function BusinessPage() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <h1 className="text-[20px] font-bold text-[var(--text-main)]">사업 안내</h1>
      {businessItems.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded-[20px] bg-white/45 border border-white/65 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <h2 className="text-[17px] font-semibold text-[var(--text-main)]">{item.title}</h2>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
          <div className="flex gap-2 flex-wrap">
            {item.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] bg-white/50 border border-white/70 rounded-full px-3 py-0.5 text-[var(--text-secondary)]"
              >
                {kw}
              </span>
            ))}
          </div>
          <BusinessVideos videos={videos} category={item.id} />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: 브라우저 확인**

`http://localhost:3000/business` — 3개 사업 섹션과 각 카테고리 관련 영상 썸네일이 보여야 함.

- [ ] **Step 7: 커밋**

```bash
git add src/components/BusinessVideos.tsx __tests__/components/BusinessVideos.test.tsx src/app/business/page.tsx
git commit -m "feat: implement /business page with category videos"
```

---

## Task 5: /about 페이지

**Files:**
- Modify: `src/app/about/page.tsx`
- Create: `__tests__/components/AboutPage.test.tsx`

- [ ] **Step 1: 테스트 작성**

```typescript
// __tests__/components/AboutPage.test.tsx
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('대표 인사말 섹션이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('대표 인사말')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });

  it('비전과 미션이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
  });

  it('연혁 항목이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('아트컴퍼니 설립')).toBeInTheDocument();
  });

  it('팀 구성원이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('김예술')).toBeInTheDocument();
    expect(screen.getByText('공연기획팀장')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest AboutPage --no-coverage 2>&1 | tail -5
```
Expected: FAIL — 인사말 섹션 없음

- [ ] **Step 3: /about 페이지 구현**

```typescript
// src/app/about/page.tsx
import { aboutData } from '@/data/about';

export default function AboutPage() {
  const { ceoName, ceoRole, greeting, vision, mission, history, team } = aboutData;

  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-8">
      {/* 대표 인사말 */}
      <section>
        <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-3 py-1 mb-5">
          대표 인사말
        </span>
        <div className="flex gap-6 items-start">
          <div className="w-[96px] h-[96px] rounded-full bg-white/40 border border-white/60 shrink-0 flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <p className="text-[15px] text-[var(--text-main)] leading-relaxed mb-3">{greeting}</p>
            <p className="text-[13px] text-[var(--text-secondary)]">
              {ceoName} · {ceoRole}
            </p>
          </div>
        </div>
      </section>

      {/* 비전·미션 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-[16px] bg-white/45 border border-white/65">
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Vision</p>
          <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{vision}</p>
        </div>
        <div className="p-5 rounded-[16px] bg-white/45 border border-white/65">
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Mission</p>
          <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{mission}</p>
        </div>
      </section>

      {/* 연혁 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">연혁</p>
        <div className="flex flex-col divide-y divide-black/5">
          {history.map((item) => (
            <div key={item.year} className="flex gap-6 py-3">
              <span className="text-[13px] font-bold text-[var(--text-secondary)] w-10 shrink-0">{item.year}</span>
              <span className="text-[13px] text-[var(--text-main)]">{item.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 팀 소개 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">팀 소개</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2">
              <div className="w-[72px] h-[72px] rounded-xl bg-white/40 border border-white/60 flex items-center justify-center text-2xl">
                👤
              </div>
              <p className="text-[13px] font-semibold text-[var(--text-main)]">{member.name}</p>
              <p className="text-[11px] text-[var(--text-secondary)]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest AboutPage --no-coverage 2>&1 | tail -5
```
Expected: PASS — 4 tests passing

- [ ] **Step 5: 브라우저 확인**

`http://localhost:3000/about` — 4개 섹션(인사말, 비전/미션, 연혁, 팀)이 모두 보여야 함.

- [ ] **Step 6: 커밋**

```bash
git add src/app/about/page.tsx __tests__/components/AboutPage.test.tsx
git commit -m "feat: implement /about page with 4 sections"
```

---

## Task 6: /news 페이지

**Files:**
- Modify: `src/app/news/page.tsx`
- Create: `__tests__/components/NewsPage.test.tsx`

- [ ] **Step 1: 테스트 작성**

```typescript
// __tests__/components/NewsPage.test.tsx
import { render, screen } from '@testing-library/react';
import NewsPage from '@/app/news/page';

describe('NewsPage', () => {
  it('수상 내역 섹션이 렌더링된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('수상 내역')).toBeInTheDocument();
    expect(screen.getByText('서울시 우수 문화기획사')).toBeInTheDocument();
  });

  it('언론 보도 섹션이 렌더링된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('언론 보도')).toBeInTheDocument();
    expect(screen.getByText('한국일보')).toBeInTheDocument();
  });

  it('수상 연도가 표시된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('2022 · 서울특별시')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest NewsPage --no-coverage 2>&1 | tail -5
```
Expected: FAIL — 수상 내역 없음

- [ ] **Step 3: /news 페이지 구현**

```typescript
// src/app/news/page.tsx
import { awards, pressItems } from '@/data/news';

export default function NewsPage() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-8">
      {/* 수상 내역 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">🏆 수상 내역</p>
        <div className="flex flex-col gap-3">
          {awards.map((award) => (
            <div
              key={award.title}
              className="flex items-center gap-4 p-4 rounded-[16px] bg-white/45 border border-white/65"
            >
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-main)]">{award.title}</p>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  {award.year} · {award.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 언론 보도 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">📰 언론 보도</p>
        <div className="flex flex-col gap-2">
          {pressItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between p-4 rounded-[14px] bg-white/35 border border-white/55"
            >
              <div>
                <p className="text-[13px] font-medium text-[var(--text-main)]">{item.title}</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {item.outlet} · {item.date}
                </p>
              </div>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] text-sm ml-4 shrink-0 hover:text-[var(--text-main)] transition-colors"
                >
                  →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest NewsPage --no-coverage 2>&1 | tail -5
```
Expected: PASS — 3 tests passing

- [ ] **Step 5: 브라우저 확인**

`http://localhost:3000/news` — 수상 카드 3개, 언론보도 목록 4개가 보여야 함.

- [ ] **Step 6: 커밋**

```bash
git add src/app/news/page.tsx __tests__/components/NewsPage.test.tsx
git commit -m "feat: implement /news page with awards and press"
```

---

## Task 7: /contact 페이지

**Files:**
- Modify: `src/app/contact/page.tsx`
- Create: `__tests__/components/ContactPage.test.tsx`

- [ ] **Step 1: 테스트 작성**

```typescript
// __tests__/components/ContactPage.test.tsx
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

describe('ContactPage', () => {
  it('전화번호가 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('02-000-0000')).toBeInTheDocument();
  });

  it('이메일이 mailto 링크로 렌더링된다', () => {
    render(<ContactPage />);
    const link = screen.getByRole('link', { name: /artcompany@example.com/i });
    expect(link).toHaveAttribute('href', 'mailto:artcompany@example.com');
  });

  it('주소가 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('서울특별시 종로구 문화예술로 1길')).toBeInTheDocument();
  });

  it('운영시간이 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('평일 09:00 – 18:00')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest ContactPage --no-coverage 2>&1 | tail -5
```
Expected: FAIL — 전화번호 없음

- [ ] **Step 3: /contact 페이지 구현**

```typescript
// src/app/contact/page.tsx
import { contactInfo } from '@/data/contact';

export default function ContactPage() {
  const { phone, email, address, hours, mapSrc } = contactInfo;

  return (
    <div className="glass p-8 rounded-[28px]">
      <h1 className="text-[20px] font-bold text-[var(--text-main)] mb-6">문의</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 연락처 정보 */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">전화</p>
            <p className="text-[15px] text-[var(--text-main)]">{phone}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">이메일</p>
            <a
              href={`mailto:${email}`}
              className="text-[15px] text-[var(--text-main)] hover:underline"
            >
              {email}
            </a>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">주소</p>
            <p className="text-[15px] text-[var(--text-main)]">{address}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">운영시간</p>
            <p className="text-[15px] text-[var(--text-main)]">{hours}</p>
          </div>
        </div>

        {/* 지도 */}
        <div className="rounded-[16px] overflow-hidden bg-white/30 border border-white/50 min-h-[240px]">
          <iframe
            src={mapSrc}
            className="w-full h-full min-h-[240px] border-0"
            loading="lazy"
            title="오시는 길"
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest ContactPage --no-coverage 2>&1 | tail -5
```
Expected: PASS — 4 tests passing

- [ ] **Step 5: 브라우저 확인**

`http://localhost:3000/contact` — 좌측 연락처 정보, 우측 지도가 보여야 함.

- [ ] **Step 6: 전체 테스트 통과 확인**

```bash
cd /home/guseejrdl/koesprojects/cultures && npx jest --no-coverage 2>&1 | tail -10
```
Expected: 모든 테스트 PASS

- [ ] **Step 7: 커밋**

```bash
git add src/app/contact/page.tsx __tests__/components/ContactPage.test.tsx
git commit -m "feat: implement /contact page with map"
```
