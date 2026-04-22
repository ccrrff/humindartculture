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
              <span className="sr-only">{video.title}</span>
            </button>
          ))}
        </div>
      </div>
      <VideoModal videoId={modalId} onClose={() => setModalId(null)} />
    </>
  );
}
