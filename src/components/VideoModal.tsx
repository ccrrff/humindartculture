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
      {/* X 버튼 — iframe 바깥, 오버레이 레이어에 고정 */}
      <button
        aria-label="닫기"
        onClick={onClose}
        className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-lg hover:bg-white/30 hover:scale-110 transition-all"
      >
        ✕
      </button>

      <div
        className="relative glass rounded-2xl overflow-hidden p-2 w-[min(720px,calc(100vw-2rem))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video w-full">
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: { autoplay: 1 },
            }}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
