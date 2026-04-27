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
        <div className="flex gap-8 items-start">
          {/* 좌측 텍스트 */}
          <div className="flex-[1.2] flex flex-col gap-4">
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
