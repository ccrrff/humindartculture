'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DOOR_EASE = [0.86, 0, 0.07, 1] as [number, number, number, number];
const TEXT_SHADOW = '0 2px 40px rgba(0,0,0,0.6), 0 1px 8px rgba(0,0,0,0.4)';

type FlyRect = { x: number; y: number; fs: number };
type FlyingEl = { key: string; text: string; from: FlyRect; to: FlyRect };

function getElRect(el: HTMLElement): FlyRect {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, fs: parseFloat(getComputedStyle(el).fontSize) };
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
        <source src="/heromovie.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        style={{ visibility: hideText ? 'hidden' : 'visible' }}
      >
        <motion.div
          data-intro-text="세계를"
          className="leading-none text-white"
          style={{ fontSize: 'clamp(120px, 18vw, 220px)', fontFamily: 'var(--font-east-sea-dokdo)', textShadow: TEXT_SHADOW }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.85, ease: 'easeOut' }}
        >
          세계를
        </motion.div>
        <motion.div
          data-intro-text="무대로"
          className="leading-none text-white"
          style={{ fontSize: 'clamp(84px, 13vw, 160px)', fontFamily: 'var(--font-east-sea-dokdo)', textShadow: TEXT_SHADOW }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.85, ease: 'easeOut' }}
        >
          무대로
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
  const [flyingEls, setFlyingEls] = useState<FlyingEl[]>([]);

  const trigger = () => {
    const pairs = [
      { key: '세계를', introSel: '[data-intro-text="세계를"]', heroSel: '[data-hero-text="세계를"]' },
      { key: '무대로', introSel: '[data-intro-text="무대로"]', heroSel: '[data-hero-text="무대로"]' },
    ];

    const flying: FlyingEl[] = [];
    for (const { key, introSel, heroSel } of pairs) {
      const src = document.querySelector(introSel) as HTMLElement | null;
      const dst = document.querySelector(heroSel) as HTMLElement | null;
      if (src && dst) {
        flying.push({ key, text: key, from: getElRect(src), to: getElRect(dst) });
      }
    }

    onSplitting?.();
    setSplitting(true);
    setFlyingEls(flying);
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
        style={{ width: '50%' }}
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

      {/* ── 날아가는 텍스트 오버레이 ── */}
      {flyingEls.map(el => (
        <motion.div
          key={el.key}
          className="fixed top-0 left-0 z-[99998] pointer-events-none leading-none text-white whitespace-nowrap"
          style={{ fontFamily: 'var(--font-east-sea-dokdo)', textShadow: TEXT_SHADOW }}
          initial={{ x: el.from.x, y: el.from.y, fontSize: el.from.fs, opacity: 1 }}
          animate={{ x: el.to.x, y: el.to.y, fontSize: el.to.fs, opacity: [1, 1, 0] }}
          transition={{ duration: 0.95, ease: DOOR_EASE }}
        >
          {el.text}
        </motion.div>
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
