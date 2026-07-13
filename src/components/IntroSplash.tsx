'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DOOR_EASE = [0.86, 0, 0.07, 1] as [number, number, number, number];

type FlyRect = { x: number; y: number; w: number; h: number };
type FlyingImg = { key: string; src: string; from: FlyRect; to: FlyRect };

function getElRect(el: HTMLElement): FlyRect {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
}

function DoorContent({ side, hideText }: { side: 'left' | 'right'; hideText: boolean }) {
  return (
    <div
      className="absolute inset-0 h-full bg-[#0a0a0a]"
      style={{ width: '200%', left: side === 'left' ? 0 : '-100%' }}
    >
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/heromovie-clean-final.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        style={{ visibility: hideText ? 'hidden' : 'visible' }}
      >
        <motion.div
          data-intro-image
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.85, ease: 'easeOut' }}
        >
          <Image
            src="/worldtoart.png"
            alt="worldtoart"
            width={600}
            height={280}
            className="w-[clamp(260px,45vw,540px)] h-auto object-contain drop-shadow-[0_2px_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
        <motion.p
          className="mt-6 text-[9px] tracking-[0.28em] uppercase text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          International Arts &amp; Culture
        </motion.p>
      </div>
    </div>
  );
}

export default function IntroSplash({ onDone, onSplitting }: { onDone: () => void; onSplitting?: () => void }) {
  const [splitting, setSplitting] = useState(false);
  const [flyingImgs, setFlyingImgs] = useState<FlyingImg[]>([]);

  const trigger = () => {
    const flying: FlyingImg[] = [];
    const introEl = document.querySelector('[data-intro-image]') as HTMLElement | null;
    const heroEl = document.querySelector('[data-hero-image]') as HTMLElement | null;
    if (introEl && heroEl) {
      flying.push({
        key: 'worldtoart',
        src: '/worldtoart.png',
        from: getElRect(introEl),
        to: getElRect(heroEl),
      });
    }

    onSplitting?.();
    setSplitting(true);
    setFlyingImgs(flying);
  };

  useEffect(() => {
    const t = setTimeout(trigger, 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── 왼쪽 문 ── */}
      <motion.div
        className="fixed top-0 left-0 h-full overflow-hidden z-[9999]"
        style={{ width: 'calc(50% + 1px)' }}
        animate={splitting ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 1, ease: DOOR_EASE }}
        onAnimationComplete={() => splitting && onDone()}
      >
        <DoorContent side="left" hideText={splitting} />
      </motion.div>

      {/* ── 오른쪽 문 ── */}
      <motion.div
        className="fixed top-0 right-0 h-full overflow-hidden z-[9999]"
        style={{ width: '50%' }}
        animate={splitting ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1, ease: DOOR_EASE }}
      >
        <DoorContent side="right" hideText={splitting} />
      </motion.div>

      {/* ── 날아가는 이미지 오버레이 ── */}
      {flyingImgs.map(el => (
        <motion.img
          key={el.key}
          src={el.src}
          alt=""
          className="fixed top-0 left-0 z-[99998] pointer-events-none object-contain"
          initial={{ x: el.from.x, y: el.from.y, width: el.from.w, height: el.from.h, opacity: 1 }}
          animate={{ x: el.to.x, y: el.to.y, width: el.to.w, height: el.to.h, opacity: [1, 1, 0] }}
          transition={{ duration: 0.95, ease: DOOR_EASE }}
        />
      ))}

      {/* ── SKIP ── */}
      {!splitting && (
        <motion.button
          className="fixed bottom-6 right-7 z-[99999] text-[10px] tracking-[0.12em] text-white/30 border border-white/15 px-3 py-1.5 rounded-sm hover:text-white/55 hover:border-white/30 transition-all"
          onClick={trigger}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          SKIP ↓
        </motion.button>
      )}
    </>
  );
}
