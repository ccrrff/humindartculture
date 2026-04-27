# Business Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/business` 페이지를 4개 사업 섹션(오케스트라·국제교류·크루즈·설치예술)으로 완전히 재설계한다.

**Architecture:** 섹션별 독립 컴포넌트를 `src/components/business/` 하위에 배치한다. 영상이 있는 Q1·Q2는 `'use client'` 컴포넌트(VideoModal 상태 필요), 영상이 없는 Q3·Q4는 서버 컴포넌트. 페이지(`src/app/business/page.tsx`)는 서버 컴포넌트로 데이터를 필터링해 각 섹션에 주입한다.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, React 19, Jest + @testing-library/react

---

## 파일 구조

| 경로 | 역할 | 신규/수정 |
|------|------|-----------|
| `src/components/business/BusinessPageHeader.tsx` | 페이지 헤더 카드 | 신규 |
| `src/components/business/OrchestraSection.tsx` | Q1 오케스트라 (use client) | 신규 |
| `src/components/business/InternationalSection.tsx` | Q2 국제교류 (use client) | 신규 |
| `src/components/business/CruiseSection.tsx` | Q3 크루즈 — 여정 스텝 | 신규 |
| `src/components/business/InstallationSection.tsx` | Q4 설치예술 — 2열 그리드 | 신규 |
| `src/app/business/page.tsx` | 조립 페이지 (서버 컴포넌트) | 수정 |
| `__tests__/components/business/BusinessPageHeader.test.tsx` | 헤더 테스트 | 신규 |
| `__tests__/components/business/OrchestraSection.test.tsx` | Q1 테스트 | 신규 |
| `__tests__/components/business/InternationalSection.test.tsx` | Q2 테스트 | 신규 |
| `__tests__/components/business/CruiseSection.test.tsx` | Q3 테스트 | 신규 |
| `__tests__/components/business/InstallationSection.test.tsx` | Q4 테스트 | 신규 |

| `__tests__/components/business/*.test.tsx` (stale 6개) | 구 카테고리명 → 신 카테고리명으로 수정 | 수정 |

---

## Task 0: 기존 테스트 스테일 수정

이전 세션에서 카테고리명이 `'공연기획' | '전시기획' | '문화행사'` → `'오케스트라' | '국제교류' | '크루즈' | '설치예술'`으로 변경되었으나 테스트 파일이 업데이트되지 않았다. 신규 테스트를 추가하기 전에 먼저 수정한다.

**Files:**
- Modify: `__tests__/data/videos.test.ts`
- Modify: `__tests__/components/BusinessVideos.test.tsx`
- Modify: `__tests__/components/ArchiveClient.test.tsx`
- Modify: `__tests__/components/VideoGrid.test.tsx`
- Modify: `__tests__/components/VideoCarousel.test.tsx`
- Modify: `__tests__/components/AboutPage.test.tsx`

- [ ] **Step 1: 현재 실패 테스트 확인**

```bash
npx jest --no-coverage 2>&1 | grep -E "FAIL|PASS" | head -20
```

Expected: 여러 파일 FAIL

- [ ] **Step 2: `__tests__/data/videos.test.ts` 수정**

`expect(['공연기획', '전시기획', '문화행사']).toContain(v.category)` → 아래로 교체:

```ts
expect(['오케스트라', '국제교류', '크루즈', '설치예술']).toContain(v.category);
```

- [ ] **Step 3: `__tests__/components/BusinessVideos.test.tsx` 수정**

`mockVideos` 배열의 `category` 값 교체:

```ts
const mockVideos: Video[] = [
  { id: 'aaa', title: '클래식 공연', category: '오케스트라', date: '2024.10' },
  { id: 'bbb', title: '교류 공연', category: '국제교류', date: '2024.09' },
];
```

`render(<BusinessVideos videos={mockVideos} category="공연기획" />)` 2곳을 아래로 교체:

```ts
// 첫 번째 it
render(<BusinessVideos videos={mockVideos} category="오케스트라" />);
expect(screen.getByText('클래식 공연')).toBeInTheDocument();
expect(screen.queryByText('교류 공연')).not.toBeInTheDocument();

// 두 번째 it
render(<BusinessVideos videos={mockVideos} category="설치예술" />);
expect(screen.queryByText('클래식 공연')).not.toBeInTheDocument();
```

- [ ] **Step 4: `__tests__/components/ArchiveClient.test.tsx`, `VideoGrid.test.tsx`, `VideoCarousel.test.tsx`, `AboutPage.test.tsx` 수정**

각 파일에서 `'공연기획'`, `'전시기획'`, `'문화행사'` 를 아래 중 맥락에 맞는 값으로 교체:
- 단일 카테고리 테스트: `'오케스트라'`
- 전체 목록 테스트: `['오케스트라', '국제교류', '크루즈', '설치예술']`

확인 방법:
```bash
grep -n "공연기획\|전시기획\|문화행사" __tests__/components/ArchiveClient.test.tsx __tests__/components/VideoGrid.test.tsx __tests__/components/VideoCarousel.test.tsx __tests__/components/AboutPage.test.tsx
```

- [ ] **Step 5: 수정된 테스트 통과 확인**

```bash
npx jest --no-coverage
```

Expected: 모든 기존 테스트 PASS (신규 business/ 테스트 아직 없음)

- [ ] **Step 6: 커밋**

```bash
git add __tests__/
git commit -m "fix: update stale tests to use new category names"
```

---

## Task 1: BusinessPageHeader

**Files:**
- Create: `src/components/business/BusinessPageHeader.tsx`
- Create: `__tests__/components/business/BusinessPageHeader.test.tsx`

- [ ] **Step 1: 테스트 디렉터리 생성**

```bash
mkdir -p src/components/business
mkdir -p __tests__/components/business
```

- [ ] **Step 2: 실패 테스트 작성**

`__tests__/components/business/BusinessPageHeader.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import BusinessPageHeader from '@/components/business/BusinessPageHeader';

describe('BusinessPageHeader', () => {
  it('회사 레이블을 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByText(/HUMIND ART CULTURE/i)).toBeInTheDocument();
  });

  it('페이지 제목을 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByRole('heading', { name: '사업 안내' })).toBeInTheDocument();
  });

  it('4개 사업 부제를 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByText(/오케스트라.*국제문화교류.*크루즈.*설치예술/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

```bash
npx jest __tests__/components/business/BusinessPageHeader.test.tsx --no-coverage
```

Expected: `Cannot find module '@/components/business/BusinessPageHeader'`

- [ ] **Step 4: 컴포넌트 구현**

`src/components/business/BusinessPageHeader.tsx`:

```tsx
export default function BusinessPageHeader() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-1.5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        Humind Art Culture
      </span>
      <h1 className="text-[24px] font-bold text-[var(--text-main)]">사업 안내</h1>
      <p className="text-[13px] text-[var(--text-secondary)]">
        오케스트라 · 국제문화교류 · 크루즈 · 설치예술
      </p>
    </div>
  );
}
```

- [ ] **Step 5: 테스트 통과 확인**

```bash
npx jest __tests__/components/business/BusinessPageHeader.test.tsx --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 6: 커밋**

```bash
git add src/components/business/BusinessPageHeader.tsx __tests__/components/business/BusinessPageHeader.test.tsx
git commit -m "feat: add BusinessPageHeader component"
```

---

## Task 2: OrchestraSection

**Files:**
- Create: `src/components/business/OrchestraSection.tsx`
- Create: `__tests__/components/business/OrchestraSection.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/business/OrchestraSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import OrchestraSection from '@/components/business/OrchestraSection';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ alt }: { alt: string }) => <img alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'aaa', title: '유퀴즈 출연 영상', category: '오케스트라', date: '2024.01', featured: true },
  { id: 'bbb', title: '정기연주회 영상', category: '오케스트라', date: '2024.05' },
  { id: 'ccc', title: '캉캉 영상', category: '오케스트라', date: '2024.06' },
];

describe('OrchestraSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByText(/01.*Orchestra/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByRole('heading', { name: '오케스트라 운영' })).toBeInTheDocument();
  });

  it('featured 영상을 히어로 버튼으로 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByLabelText('유퀴즈 출연 영상 재생')).toBeInTheDocument();
  });

  it('나머지 영상을 썸네일 버튼으로 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByLabelText('정기연주회 영상 재생')).toBeInTheDocument();
    expect(screen.getByLabelText('캉캉 영상 재생')).toBeInTheDocument();
  });

  it('유퀴즈 배지를 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByText(/유퀴즈온더블럭/)).toBeInTheDocument();
  });

  it('영상이 없으면 null을 반환한다', () => {
    const { container } = render(<OrchestraSection videos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest __tests__/components/business/OrchestraSection.test.tsx --no-coverage
```

Expected: `Cannot find module '@/components/business/OrchestraSection'`

- [ ] **Step 3: 컴포넌트 구현**

`src/components/business/OrchestraSection.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from '@/components/VideoModal';

interface Props {
  videos: Video[];
}

export default function OrchestraSection({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const hero = videos.find((v) => v.featured) ?? videos[0];
  const thumbs = videos.filter((v) => v.id !== hero?.id);

  if (!hero) return null;

  return (
    <>
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
          01 · Orchestra
        </span>
        <div className="flex gap-8 items-start">
          {/* 좌측 텍스트 */}
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">오케스트라 운영</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              서울 페스타 필하모닉 오케스트라를 운영합니다. 정기연주회, 기획 공연, 해외 초청 공연까지
              수준 높은 클래식을 선보입니다.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['서울 페스타 필하모닉', '정기연주회', '클래식', '해외 초청'].map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] bg-white/50 border border-white/70 rounded-full px-3 py-0.5 text-[var(--text-secondary)]"
                >
                  {kw}
                </span>
              ))}
            </div>
            <span className="self-start text-[11px] px-3 py-1.5 rounded-full bg-[#fff3e0] text-[#e65100]">
              tvN 유퀴즈온더블럭 출연 · SBS 커튼콜 인터뷰
            </span>
          </div>

          {/* 우측 영상 */}
          <div className="flex-1 flex flex-col gap-3">
            <button
              aria-label={`${hero.title} 재생`}
              onClick={() => setActiveId(hero.id)}
              className="relative w-full aspect-video rounded-2xl overflow-hidden"
            >
              <Image
                src={getYoutubeThumbnail(hero.id)}
                alt={hero.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-lg">
                  ▶
                </span>
              </div>
            </button>

            {thumbs.length > 0 && (
              <div className="flex gap-2">
                {thumbs.map((v) => (
                  <button
                    key={v.id}
                    aria-label={`${v.title} 재생`}
                    onClick={() => setActiveId(v.id)}
                    className="relative flex-1 aspect-video rounded-xl overflow-hidden"
                  >
                    <Image
                      src={getYoutubeThumbnail(v.id)}
                      alt={v.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="w-7 h-7 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-[10px]">
                        ▶
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest __tests__/components/business/OrchestraSection.test.tsx --no-coverage
```

Expected: PASS (6 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/business/OrchestraSection.tsx __tests__/components/business/OrchestraSection.test.tsx
git commit -m "feat: add OrchestraSection component"
```

---

## Task 3: InternationalSection

**Files:**
- Create: `src/components/business/InternationalSection.tsx`
- Create: `__tests__/components/business/InternationalSection.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/business/InternationalSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import InternationalSection from '@/components/business/InternationalSection';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ alt }: { alt: string }) => <img alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'xxx', title: 'SBS 커튼콜 인터뷰', category: '국제교류', date: '2024.03', featured: true },
  { id: 'yyy', title: '지브리 교류 공연', category: '국제교류', date: '2024.06' },
];

describe('InternationalSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByText(/02.*International/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByRole('heading', { name: '국제문화교류' })).toBeInTheDocument();
  });

  it('BMVA 키워드 뱃지를 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByText('BMVA 수상')).toBeInTheDocument();
  });

  it('featured 영상을 히어로 버튼으로 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByLabelText('SBS 커튼콜 인터뷰 재생')).toBeInTheDocument();
  });

  it('나머지 영상을 썸네일 버튼으로 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByLabelText('지브리 교류 공연 재생')).toBeInTheDocument();
  });

  it('영상이 없으면 null을 반환한다', () => {
    const { container } = render(<InternationalSection videos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest __tests__/components/business/InternationalSection.test.tsx --no-coverage
```

Expected: `Cannot find module '@/components/business/InternationalSection'`

- [ ] **Step 3: 컴포넌트 구현**

`src/components/business/InternationalSection.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from '@/components/VideoModal';

interface Props {
  videos: Video[];
}

export default function InternationalSection({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const hero = videos.find((v) => v.featured) ?? videos[0];
  const thumbs = videos.filter((v) => v.id !== hero?.id);

  if (!hero) return null;

  return (
    <>
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
          02 · International Exchange
        </span>
        <div className="flex gap-8 items-start">
          {/* 좌측 텍스트 */}
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">국제문화교류</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              민간 국제문화교류 사업을 수행합니다. 프랑스 한불수교 기념 공연, 네덜란드 이준열사 기념
              행사, 독일 BMVA 세계영상어워즈 수상 등 유럽 무대에서 한국 예술을 알립니다.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['민간 국제교류', '한불수교 기념', '이준열사 헤이그', 'BMVA 수상'].map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] bg-white/50 border border-white/70 rounded-full px-3 py-0.5 text-[var(--text-secondary)]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 우측 영상 */}
          <div className="flex-1 flex flex-col gap-3">
            <button
              aria-label={`${hero.title} 재생`}
              onClick={() => setActiveId(hero.id)}
              className="relative w-full aspect-video rounded-2xl overflow-hidden"
            >
              <Image
                src={getYoutubeThumbnail(hero.id)}
                alt={hero.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-lg">
                  ▶
                </span>
              </div>
            </button>

            {thumbs.length > 0 && (
              <div className="flex gap-2">
                {thumbs.map((v) => (
                  <button
                    key={v.id}
                    aria-label={`${v.title} 재생`}
                    onClick={() => setActiveId(v.id)}
                    className="relative flex-1 aspect-video rounded-xl overflow-hidden"
                  >
                    <Image
                      src={getYoutubeThumbnail(v.id)}
                      alt={v.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="w-7 h-7 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-[10px]">
                        ▶
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest __tests__/components/business/InternationalSection.test.tsx --no-coverage
```

Expected: PASS (6 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/business/InternationalSection.tsx __tests__/components/business/InternationalSection.test.tsx
git commit -m "feat: add InternationalSection component"
```

---

## Task 4: CruiseSection

**Files:**
- Create: `src/components/business/CruiseSection.tsx`
- Create: `__tests__/components/business/CruiseSection.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/business/CruiseSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import CruiseSection from '@/components/business/CruiseSection';

describe('CruiseSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText(/03.*Cultural Cruise/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByRole('heading', { name: '크루즈 문화사업' })).toBeInTheDocument();
  });

  it('4개 여정 스텝을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText('항로 기획')).toBeInTheDocument();
    expect(screen.getByText('선상 공연')).toBeInTheDocument();
    expect(screen.getByText('현지 교류')).toBeInTheDocument();
    expect(screen.getByText('예술 패키지')).toBeInTheDocument();
  });

  it('스텝 번호를 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest __tests__/components/business/CruiseSection.test.tsx --no-coverage
```

Expected: `Cannot find module '@/components/business/CruiseSection'`

- [ ] **Step 3: 컴포넌트 구현**

`src/components/business/CruiseSection.tsx`:

```tsx
const STEPS = [
  { num: '01', title: '항로 기획', desc: '유럽·아시아 문화 항로 선정', active: true },
  { num: '02', title: '선상 공연', desc: '오케스트라와 함께하는 항해', active: true },
  { num: '03', title: '현지 교류', desc: '기항지 공연 및 문화 프로그램', active: true },
  { num: '04', title: '예술 패키지', desc: '기획 중', active: false },
];

export default function CruiseSection() {
  return (
    <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        03 · Cultural Cruise
      </span>
      <h2 className="text-[20px] font-bold text-[var(--text-main)]">크루즈 문화사업</h2>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        국제문화교류 사업의 일환으로 크루즈를 활용한 문화 프로그램을 운영합니다. 선상 클래식 공연과
        예술 여행 패키지를 통해 새로운 형태의 문화 경험을 제공합니다.
      </p>

      {/* 여정 스텝 */}
      <div className="relative flex items-start pt-1">
        {/* 연결선 */}
        <div
          aria-hidden="true"
          className="absolute top-4 left-4 right-4 h-px bg-black/10"
        />
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="flex-1 flex flex-col items-center gap-2 relative z-10"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step.active
                  ? 'bg-[var(--text-main)] text-white'
                  : 'bg-white/60 text-[var(--text-secondary)] border border-dashed border-[var(--text-secondary)]/40'
              }`}
            >
              {step.num}
            </div>
            <span
              className={`text-[12px] font-semibold text-center ${
                step.active ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              {step.title}
            </span>
            <span className="text-[11px] text-[var(--text-secondary)] text-center leading-snug">
              {step.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest __tests__/components/business/CruiseSection.test.tsx --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/business/CruiseSection.tsx __tests__/components/business/CruiseSection.test.tsx
git commit -m "feat: add CruiseSection component"
```

---

## Task 5: InstallationSection

**Files:**
- Create: `src/components/business/InstallationSection.tsx`
- Create: `__tests__/components/business/InstallationSection.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/business/InstallationSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import InstallationSection from '@/components/business/InstallationSection';

describe('InstallationSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText(/04.*Installation Art/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByRole('heading', { name: '설치예술' })).toBeInTheDocument();
  });

  it('OUTDOOR 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('OUTDOOR')).toBeInTheDocument();
    expect(screen.getByText('야외 공공미술')).toBeInTheDocument();
  });

  it('INDOOR 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('INDOOR')).toBeInTheDocument();
    expect(screen.getByText('실내 공간 기획')).toBeInTheDocument();
  });

  it('ONGOING·INQUIRY 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('ONGOING')).toBeInTheDocument();
    expect(screen.getByText('INQUIRY')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npx jest __tests__/components/business/InstallationSection.test.tsx --no-coverage
```

Expected: `Cannot find module '@/components/business/InstallationSection'`

- [ ] **Step 3: 컴포넌트 구현**

`src/components/business/InstallationSection.tsx`:

```tsx
const GRID = [
  {
    label: 'OUTDOOR',
    title: '야외 공공미술',
    desc: '도심 광장·공원·거리 대형 조형물 및 미디어 아트',
    active: true,
  },
  {
    label: 'INDOOR',
    title: '실내 공간 기획',
    desc: '갤러리·로비·상업공간 예술 공간 연출',
    active: true,
  },
  {
    label: 'ONGOING',
    title: '신규 프로젝트',
    desc: '지속적으로 새로운 설치예술 프로젝트를 기획 중입니다',
    active: false,
  },
  {
    label: 'INQUIRY',
    title: '협업 문의',
    desc: '공공기관·기업·문화재단 협업 제안 환영합니다',
    active: false,
  },
];

export default function InstallationSection() {
  return (
    <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        04 · Installation Art
      </span>
      <h2 className="text-[20px] font-bold text-[var(--text-main)]">설치예술</h2>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        도심 공공장소와 실내 공간에 설치예술 작품을 기획·제작합니다. 일상 속에서 예술을 만나는
        경험을 통해 문화예술의 저변을 넓힙니다.
      </p>

      {/* 2열 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {GRID.map((item) => (
          <div
            key={item.label}
            className={`p-5 rounded-2xl flex flex-col gap-1.5 ${
              item.active
                ? 'bg-[var(--text-main)]/5 border-l-[3px] border-[var(--text-main)]'
                : 'bg-white/30 border-l-[3px] border-dashed border-[var(--text-secondary)]/30'
            }`}
          >
            <span
              className={`text-[9px] tracking-[2px] font-medium ${
                item.active ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]/50'
              }`}
            >
              {item.label}
            </span>
            <span
              className={`text-[13px] font-semibold ${
                item.active ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)]/60'
              }`}
            >
              {item.title}
            </span>
            <span
              className={`text-[11px] leading-snug ${
                item.active ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]/50'
              }`}
            >
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest __tests__/components/business/InstallationSection.test.tsx --no-coverage
```

Expected: PASS (5 tests)

- [ ] **Step 5: 커밋**

```bash
git add src/components/business/InstallationSection.tsx __tests__/components/business/InstallationSection.test.tsx
git commit -m "feat: add InstallationSection component"
```

---

## Task 6: 페이지 조립 — `src/app/business/page.tsx`

**Files:**
- Modify: `src/app/business/page.tsx`

- [ ] **Step 1: 페이지 재작성**

`src/app/business/page.tsx` 전체를 아래로 교체:

```tsx
import { videos } from '@/data/videos';
import BusinessPageHeader from '@/components/business/BusinessPageHeader';
import OrchestraSection from '@/components/business/OrchestraSection';
import InternationalSection from '@/components/business/InternationalSection';
import CruiseSection from '@/components/business/CruiseSection';
import InstallationSection from '@/components/business/InstallationSection';

export default function BusinessPage() {
  const orchestraVideos = videos.filter((v) => v.category === '오케스트라');
  const internationalVideos = videos.filter((v) => v.category === '국제교류');

  return (
    <div className="flex flex-col gap-4">
      <BusinessPageHeader />
      <OrchestraSection videos={orchestraVideos} />
      <InternationalSection videos={internationalVideos} />
      <CruiseSection />
      <InstallationSection />
    </div>
  );
}
```

- [ ] **Step 2: 빌드 타입 오류 확인**

```bash
npx tsc --noEmit
```

Expected: 오류 없음

- [ ] **Step 3: 전체 테스트 통과 확인**

```bash
npx jest --no-coverage
```

Expected: 기존 테스트 + 신규 테스트 모두 PASS

- [ ] **Step 4: 브라우저에서 확인**

개발 서버(`npm run dev` — 포트 3000)가 실행 중이라면 `http://localhost:3000/business` 접속.
확인 항목:
- 페이지 헤더("사업 안내") 노출
- Q1 오케스트라: 좌텍스트 + 우영상(히어로+썸네일), 유퀴즈 배지 노출
- Q2 국제교류: 좌텍스트 + 우영상, BMVA/한불수교/이준열사 뱃지 노출
- Q3 크루즈: 4단계 여정 스텝(01→04), 04는 흐린 점선 스타일
- Q4 설치예술: 2열 그리드(OUTDOOR/INDOOR 실선, ONGOING/INQUIRY 점선)
- 영상 클릭 시 VideoModal 팝업 → 유튜브 재생

- [ ] **Step 5: 커밋**

```bash
git add src/app/business/page.tsx
git commit -m "feat: rewrite business page with 4-section layout"
```
