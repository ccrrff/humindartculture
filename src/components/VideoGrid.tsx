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
      <div className="glass p-7 rounded-[24px]">
        <div className="flex items-baseline justify-between mb-5">
          <span className="text-[17px] font-semibold text-[var(--text-main)]">최근 영상</span>
          <Link
            href="/archive"
            className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {videos.map((video) => (
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
                  onClick={() => setActiveId(video.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/25 backdrop-blur border border-white/35 flex items-center justify-center text-white text-sm">
                    ▶
                  </span>
                </button>
              </div>
              <div className="p-3 bg-white/55 backdrop-blur border-t border-white/50">
                <h4 className="text-[13px] font-medium text-[var(--text-main)] truncate">{video.title}</h4>
                <span className="text-[11px] text-[var(--text-secondary)]">{video.category} · {video.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoId={activeId} onClose={() => setActiveId(null)} />
    </>
  );
}
