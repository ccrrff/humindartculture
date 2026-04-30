'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from '@/components/VideoModal';
import TicketStrip from './TicketStrip';

const TICKETS = [
  { year: '2025', month: '01', title: '신년 정기연주회', venue: '롯데콘서트홀' },
  { year: '2024', month: '10', title: '가을 기획공연', venue: '예술의전당' },
  { year: '2024', month: '04', title: '봄 정기연주회', venue: '세종문화회관' },
];

const MILESTONES = [
  { year: '2022', label: '서울 페스타 필하모닉 창단' },
  { year: '2024', label: 'tvN 유퀴즈온더블럭 출연' },
  { year: '2025', label: '롯데콘서트홀 신년 공연' },
];

interface Props {
  videos: Video[];
}

export default function OrchestraSection({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // 첫 번째 featured 영상을 히어로로 사용 (videos.ts 순서상 유퀴즈 영상이 항상 첫 번째)
  const hero = videos.find((v) => v.featured) ?? videos[0];
  const thumbs = videos.filter((v) => v.id !== hero?.id);

  if (!hero) return null;

  return (
    <>
      <section aria-labelledby="orchestra-heading" className="glass p-8 rounded-[28px] flex flex-col gap-5">
        <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
          01 · Orchestra
        </span>
        <div className="flex gap-8 items-stretch">
          {/* 좌측 텍스트 */}
          <div className="flex-[1.2] flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h2 id="orchestra-heading" className="text-[20px] font-bold text-[var(--text-main)]">오케스트라 운영</h2>
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
            </div>
            <div className="flex gap-4 items-stretch">
              <TicketStrip tickets={TICKETS} />
              <div className="flex-1 relative">
                {/* 연결선: dot 중심(left 5px)에서 첫 dot ~ 마지막 dot 사이 */}
                <div className="absolute left-[4px] top-[18px] bottom-[18px] w-px bg-[var(--text-secondary)]/30" />
                <div className="flex flex-col justify-between h-full">
                  {MILESTONES.map((m) => (
                    <div key={m.year} className="flex items-start gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-[var(--text-main)] bg-white mt-0.5 shrink-0 relative z-10" />
                      <div>
                        <p className="text-[12px] font-extrabold text-[var(--text-main)] leading-none">{m.year}</p>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-snug mt-0.5">{m.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
