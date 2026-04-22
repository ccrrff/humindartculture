'use client';

import YouTube from 'react-youtube';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoId, onClose }: VideoModalProps) {
  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative glass rounded-2xl overflow-hidden p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center text-[var(--text-main)] text-sm hover:scale-110 transition-transform"
        >
          ✕
        </button>
        <YouTube
          videoId={videoId}
          opts={{
            width: '720',
            height: '405',
            playerVars: { autoplay: 1 },
          }}
        />
      </div>
    </div>
  );
}
