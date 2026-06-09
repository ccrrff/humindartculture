'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const DOOR_EASE = [0.86, 0, 0.07, 1] as [number, number, number, number];

type LogoAnim = { x: number; y: number; scale: number; opacity: number };

/* 양쪽 문 안의 내용 (비디오 배경 + 텍스트, 로고 제외) */
function DoorContent({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className="absolute inset-0 h-full"
      style={{ width: '200%', left: side === 'left' ? 0 : '-100%' }}
    >
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/heromovie.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/52" />

      {/* 로고 자리만큼 padding 줘서 텍스트 중앙보다 약간 아래에 위치 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        style={{ paddingTop: 'clamp(70px, 10vh, 110px)' }}
      >
        <motion.div
          className="leading-none text-white"
          style={{ fontSize: 'clamp(56px, 10.5vw, 160px)', fontFamily: 'var(--font-east-sea-dokdo)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.85, ease: 'easeOut' }}
        >
          세계를
        </motion.div>
        <motion.div
          className="leading-none text-white"
          style={{ fontSize: 'clamp(36px, 7vw, 108px)', fontFamily: 'var(--font-east-sea-dokdo)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.85, ease: 'easeOut' }}
        >
          무대로
        </motion.div>
        <motion.p
          className="mt-4 text-[8px] tracking-[0.22em] uppercase text-white/25"
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

export default function IntroSplash({ onDone }: { onDone: () => void }) {
  const [splitting, setSplitting] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoAnim, setLogoAnim] = useState<LogoAnim>({ x: 0, y: 0, scale: 1, opacity: 1 });
  const [logoReady, setLogoReady] = useState(false);

  /* 로고 입장 애니 */
  useEffect(() => {
    const t = setTimeout(() => setLogoReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const trigger = () => {
    setSplitting(true);

    const navLogoEl = document.querySelector('[data-nav-logo]') as HTMLElement | null;
    const introLogoEl = logoRef.current;

    if (navLogoEl && introLogoEl) {
      const nav = navLogoEl.getBoundingClientRect();
      const src = introLogoEl.getBoundingClientRect();
      setLogoAnim({
        x: (nav.left + nav.width / 2) - (src.left + src.width / 2),
        y: (nav.top  + nav.height / 2) - (src.top  + src.height / 2),
        scale: nav.height / src.height,
        opacity: 0,
      });
    } else {
      setLogoAnim({ x: 0, y: -100, scale: 0.4, opacity: 0 });
    }
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
        <DoorContent side="left" />
      </motion.div>

      {/* ── 오른쪽 문 ── */}
      <motion.div
        className="fixed top-0 right-0 h-full overflow-hidden z-[9999]"
        style={{ width: '50%' }}
        animate={splitting ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1, ease: DOOR_EASE }}
      >
        <DoorContent side="right" />
      </motion.div>

      {/* ── 로고 (도어 위 별도 레이어) ── */}
      <div
        className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center"
        style={{ paddingBottom: 'clamp(70px, 10vh, 110px)' }}
      >
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, y: -18 }}
          animate={splitting
            ? logoAnim
            : logoReady
              ? { opacity: 1, y: 0, x: 0, scale: 1 }
              : { opacity: 0, y: -18, x: 0, scale: 1 }
          }
          transition={splitting
            ? { duration: 0.9, ease: DOOR_EASE }
            : { delay: 0.25, duration: 0.75, ease: 'easeOut' }
          }
        >
          <Image
            src="/logo4.png"
            alt="휴마인드 아트컬쳐"
            width={233}
            height={60}
            className="h-[52px] md:h-[64px] w-auto"
            priority
          />
        </motion.div>
      </div>

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
