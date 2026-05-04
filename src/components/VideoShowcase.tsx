'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from './VideoModal';

interface VideoShowcaseProps {
  videos: Video[];
}

const SIDE_COUNT = 5;
const AUTO_INTERVAL = 3200;

export default function VideoShowcase({ videos }: VideoShowcaseProps) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0); // 사이드 리스트 시작 인덱스

  const hero = videos[heroIdx];

  // heroIdx를 제외한 나머지
  const sidePool = videos.filter((_, i) => i !== heroIdx);

  // offset 기준 5개 순환 슬라이스
  const sideList = Array.from({ length: SIDE_COUNT }, (_, i) => sidePool[(offset + i) % sidePool.length]);

  // 자동 한 칸씩 밀기
  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % sidePool.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [sidePool.length]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 히어로 영상 */}
        <div className="lg:col-span-2 glass p-5 rounded-[28px]">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image
              src={getYoutubeThumbnail(hero.id)}
              alt={hero.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <button
              aria-label={`${hero.title} 재생`}
              onClick={() => setActiveId(hero.id)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-2xl hover:bg-white/30 transition-colors">
                ▶
              </span>
            </button>
            <div className="absolute bottom-5 left-6 right-6 pointer-events-none">
              <span className="inline-block text-[10px] tracking-widest uppercase text-white/70 mb-1.5">{hero.category}</span>
              <p className="text-white text-[18px] font-semibold leading-snug">{hero.title}</p>
              <p className="text-white/60 text-[12px] mt-1">{hero.date}</p>
            </div>
          </div>
        </div>

        {/* 사이드 목록 — 5개 고정, 자동 슬라이드 */}
        <div className="glass p-5 rounded-[28px] flex flex-col">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[15px] font-semibold text-[var(--text-main)]">다른 영상</span>
            <Link href="/archive" className="text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors">
              전체 보기 →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 flex-1 overflow-hidden">
            {sideList.map((video, i) => {
              const originalIdx = videos.indexOf(video);
              return (
                <div
                  key={`${video.id}-${offset}-${i}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/40 border border-white/60 text-left flex-1"
                  style={{
                    animation: 'slideIn 0.35s ease',
                  }}
                >
                  <div className="relative w-[80px] h-[46px] rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={getYoutubeThumbnail(video.id)}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-[var(--text-main)] line-clamp-2 leading-snug">{video.title}</p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{video.category} · {video.date}</p>
                  </div>
                  <button
                    aria-label={`${video.title} 선택`}
                    onClick={() => setHeroIdx(originalIdx)}
                    className="w-7 h-7 rounded-full bg-white/30 border border-white/50 flex items-center justify-center text-[var(--text-secondary)] text-[10px] shrink-0 hover:bg-white/50 transition-colors"
                  >
                    ▶
                  </button>
                </div>
              );
            })}
          </div>

          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
