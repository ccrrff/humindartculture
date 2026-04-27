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
