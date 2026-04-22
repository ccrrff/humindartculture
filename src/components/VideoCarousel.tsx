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

        <div className="flex items-center justify-center gap-3">
          <button
            aria-label="이전 영상"
            onClick={prev}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shrink-0"
          >
            ‹
          </button>

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

          <button
            aria-label="다음 영상"
            onClick={next}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors shrink-0"
          >
            ›
          </button>
        </div>

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
