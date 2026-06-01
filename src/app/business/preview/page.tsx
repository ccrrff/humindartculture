'use client';

import Image from 'next/image';
import { getYoutubeThumbnail } from '@/data/videos';

/* ── 공통 영상 데이터 ─────────────────────────────────── */
const ORCH_HERO   = '-0smRywUr0Y';
const ORCH_THUMBS = ['L-cZXdbAgmQ', 'WRddSpJjx40', 'IaS8bUca_Nk', 'NAe8eG2o7c0', '7S1LJ8ic02E'];
const INT_HERO    = 'NlnZpfC1bIg';
const INT_THUMB   = 'wWl270EjCz4';

/* ── 공통 조각 ───────────────────────────────────────── */
function HeroVideo({ id }: { id: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
      <Image src={getYoutubeThumbnail(id)} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <span className="w-12 h-12 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-lg">▶</span>
      </div>
    </div>
  );
}

function ThumbStrip({ ids }: { ids: string[] }) {
  return (
    <div className="flex gap-2">
      {ids.map(id => (
        <div key={id} className="relative flex-1 aspect-video rounded-xl overflow-hidden">
          <Image src={getYoutubeThumbnail(id)} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="w-7 h-7 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-[10px]">▶</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SingleSmallThumb() {
  return (
    <div className="flex gap-2 justify-end">
      <div className="relative w-2/5 aspect-video rounded-xl overflow-hidden">
        <Image src={getYoutubeThumbnail(INT_THUMB)} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="w-7 h-7 rounded-full bg-white/25 border border-white/50 flex items-center justify-center text-white text-[10px]">▶</span>
        </div>
      </div>
    </div>
  );
}

function Chips({ words }: { words: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {words.map(w => (
        <span key={w} className="text-[11px] bg-white/50 border border-white/70 rounded-full px-3 py-0.5 text-[var(--text-secondary)]">
          {w}
        </span>
      ))}
    </div>
  );
}

function Header({ num, label }: { num: string; label: string }) {
  return (
    <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
      {num} · {label}
    </span>
  );
}

const ORCH_KEYWORDS = ['서울 페스타 필하모닉', '정기연주회', '클래식', '해외 초청'];
const ORCH_DESC = '서울 페스타 필하모닉 오케스트라를 운영합니다. 정기연주회, 기획 공연, 해외 초청 공연까지 수준 높은 클래식을 선보입니다.';
const INT_KEYWORDS = ['민간 국제교류', '한불수교 기념', '이준열사 헤이그', 'BMVA 수상'];
const INT_DESC = '민간 국제문화교류 사업을 수행합니다. 프랑스 한불수교 기념 공연, 네덜란드 이준열사 기념 행사, 독일 BMVA 세계영상어워즈 수상 등 유럽 무대에서 한국 예술을 알립니다.';

/* ═══════════════════════════════════════════════════════════
   새안 1 — 에디토리얼 풀쿼트 카드
   ═══════════════════════════════════════════════════════════ */
function PullQuote({
  quote,
  author,
  role,
  accent,
}: {
  quote: string;
  author: string;
  role: string;
  accent: string;
}) {
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{ background: accent }}
    >
      <span
        className="absolute top-1 left-3 text-[80px] leading-none font-serif select-none pointer-events-none"
        style={{ color: 'rgba(0,0,0,0.08)' }}
      >
        “
      </span>
      <p className="relative text-[15px] font-semibold text-[var(--text-main)] leading-[1.55] italic pl-7 pr-2">
        {quote}
      </p>
      <div className="relative flex items-center gap-2.5 mt-5 pl-7">
        <div className="w-1 h-7 bg-[var(--text-main)] rounded-full" />
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-[var(--text-main)] tracking-tight">{author}</span>
          <span className="text-[10px] text-[var(--text-secondary)]">{role}</span>
        </div>
      </div>
    </div>
  );
}

function VariantQuote() {
  return (
    <div className="flex flex-col gap-4">
      {/* 01 Orchestra */}
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="01" label="Orchestra" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">오케스트라 운영</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{ORCH_DESC}</p>
            <Chips words={ORCH_KEYWORDS} />
            <PullQuote
              quote={'"보통의 클래식이 아닌, 관객과 단원이 함께 웃는 무대를 만듭니다."'}
              author="백윤학"
              role="서울 페스타 필하모닉 지휘자"
              accent="linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={ORCH_HERO} />
            <ThumbStrip ids={ORCH_THUMBS} />
          </div>
        </div>
      </section>

      {/* 02 International */}
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="02" label="International Exchange" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">국제문화교류</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{INT_DESC}</p>
            <Chips words={INT_KEYWORDS} />
            <PullQuote
              quote={'"예술에는 국경이 없습니다. 한국 클래식의 가능성을 유럽 무대에 전합니다."'}
              author="휴마인드 아트컬쳐"
              role="민간 국제문화교류 기획"
              accent="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={INT_HERO} />
            <SingleSmallThumb />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   새안 2 — 콘서트 티켓 스트립
   ═══════════════════════════════════════════════════════════ */
const ORCH_TICKETS = [
  { date: '2025.09', venue: '롯데콘서트홀', program: '케디헌 골든 갈라' },
  { date: '2025.03', venue: '예술의전당', program: "비제 ‘카르멘’ 서곡" },
  { date: '2024.12', venue: '세종문화회관', program: 'Arabian Night' },
];
const INT_TICKETS = [
  { date: '2024.06', venue: 'Berlin', program: 'BMVA 세계영상어워즈 수상' },
  { date: '2023.05', venue: 'The Hague', program: '이준열사 기념 공연' },
  { date: '2020.09', venue: 'Paris', program: '한불수교 60주년 기념' },
];

function TicketStrip({ tickets, label }: { tickets: typeof ORCH_TICKETS; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] tracking-[2px] uppercase text-[var(--text-secondary)]">{label}</span>
      <div className="flex flex-col gap-1.5">
        {tickets.map((t, i) => (
          <div
            key={i}
            className="relative flex items-stretch bg-white/55 border border-white/80 rounded-lg overflow-hidden"
          >
            {/* 좌측 날짜 칸 */}
            <div className="flex flex-col items-center justify-center bg-[var(--text-main)] text-white px-3 py-2 min-w-[68px]">
              <span className="text-[9px] tracking-[1px] uppercase opacity-70">{t.date.split('.')[0]}</span>
              <span className="text-[15px] font-extrabold leading-none">{t.date.split('.')[1]}월</span>
            </div>
            {/* 점선 분리선 */}
            <div
              className="w-px self-stretch"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 4px, transparent 4px 8px)',
              }}
            />
            {/* 본문 */}
            <div className="flex-1 flex flex-col justify-center px-3.5 py-2">
              <span className="text-[11px] font-semibold text-[var(--text-main)] leading-tight">{t.program}</span>
              <span className="text-[10px] text-[var(--text-secondary)] mt-0.5">{t.venue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VariantTicket() {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="01" label="Orchestra" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">오케스트라 운영</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{ORCH_DESC}</p>
            <Chips words={ORCH_KEYWORDS} />
            <TicketStrip tickets={ORCH_TICKETS} label="최근 공연" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={ORCH_HERO} />
            <ThumbStrip ids={ORCH_THUMBS} />
          </div>
        </div>
      </section>

      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="02" label="International Exchange" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col gap-4">
            <h2 className="text-[20px] font-bold text-[var(--text-main)]">국제문화교류</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{INT_DESC}</p>
            <Chips words={INT_KEYWORDS} />
            <TicketStrip tickets={INT_TICKETS} label="해외 활동 기록" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={INT_HERO} />
            <SingleSmallThumb />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   새안 3 — 수직 마일스톤 타임라인
   ═══════════════════════════════════════════════════════════ */
const ORCH_MILESTONES = [
  { year: '2019', text: '서울 페스타 필하모닉 창립' },
  { year: '2024', text: 'tvN 유퀴즈온더블럭 출연' },
  { year: '2025', text: '롯데콘서트홀 정기 공연' },
];
const INT_MILESTONES = [
  { year: '2020', text: '프랑스 한불수교 60주년 기념' },
  { year: '2023', text: '네덜란드 이준열사 헤이그 기념' },
  { year: '2024', text: '독일 BMVA 세계영상어워즈 수상' },
];

function Timeline({ items, label }: { items: typeof ORCH_MILESTONES; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[9px] tracking-[2px] uppercase text-[var(--text-secondary)]">{label}</span>
      <div className="relative pl-5">
        {/* 수직선 */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/12" />
        <div className="flex flex-col gap-3.5">
          {items.map((m, i) => (
            <div key={i} className="relative">
              {/* 도트 */}
              <div className="absolute -left-[18px] top-[3px] w-[15px] h-[15px] rounded-full bg-white border-2 border-[var(--text-main)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)]" />
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[11px] font-extrabold tracking-tight text-[var(--text-main)] tabular-nums">{m.year}</span>
                <span className="text-[12px] text-[var(--text-secondary)] leading-snug">{m.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VariantTimeline() {
  return (
    <div className="flex flex-col gap-4">
      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="01" label="Orchestra" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px] font-bold text-[var(--text-main)]">오케스트라 운영</h2>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{ORCH_DESC}</p>
              <Chips words={ORCH_KEYWORDS} />
            </div>
            <Timeline items={ORCH_MILESTONES} label="마일스톤" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={ORCH_HERO} />
            <ThumbStrip ids={ORCH_THUMBS} />
          </div>
        </div>
      </section>

      <section className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <Header num="02" label="International Exchange" />
        <div className="flex gap-8 items-stretch">
          <div className="flex-[1.2] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-[20px] font-bold text-[var(--text-main)]">국제문화교류</h2>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{INT_DESC}</p>
              <Chips words={INT_KEYWORDS} />
            </div>
            <Timeline items={INT_MILESTONES} label="해외 활동 연혁" />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <HeroVideo id={INT_HERO} />
            <SingleSmallThumb />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   프리뷰 페이지
   ═══════════════════════════════════════════════════════════ */
export default function PreviewPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <div className="glass px-5 py-3 rounded-2xl self-start">
          <span className="text-[13px] font-semibold text-[var(--text-main)]">새안 1</span>
          <span className="text-[12px] text-[var(--text-secondary)] ml-2">에디토리얼 풀쿼트 — 매거진 인용구 카드 (지휘자 보이스)</span>
        </div>
        <VariantQuote />
      </div>

      <div className="flex flex-col gap-3">
        <div className="glass px-5 py-3 rounded-2xl self-start">
          <span className="text-[13px] font-semibold text-[var(--text-main)]">새안 2</span>
          <span className="text-[12px] text-[var(--text-secondary)] ml-2">콘서트 티켓 스트립 — 실제 공연 기록을 미니 티켓으로</span>
        </div>
        <VariantTicket />
      </div>

      <div className="flex flex-col gap-3">
        <div className="glass px-5 py-3 rounded-2xl self-start">
          <span className="text-[13px] font-semibold text-[var(--text-main)]">새안 3</span>
          <span className="text-[12px] text-[var(--text-secondary)] ml-2">수직 마일스톤 타임라인 — 연도별 사업 역사</span>
        </div>
        <VariantTimeline />
      </div>
    </div>
  );
}
