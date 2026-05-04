'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';
import { getYoutubeThumbnail } from '@/data/videos';
import VideoModal from './VideoModal';

type Category = '전체' | '오케스트라' | '국제교류' | '크루즈' | '설치예술';
const TABS: Category[] = ['전체', '오케스트라', '국제교류', '크루즈', '설치예술'];

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
        <div className="flex gap-1 mb-6 bg-white/30 rounded-[99px] p-1 w-fit flex-wrap">
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
