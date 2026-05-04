'use client';

import { motion } from 'framer-motion';

const TICKER = ['SEOUL', 'BERLIN', 'PARIS', 'AMSTERDAM', 'ORCHESTRA', 'CRUISE', 'INSTALLATION'];
const doubled = [...TICKER, ...TICKER];

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.04, duration: 0.4, ease: 'easeOut' as const },
  }),
};

function AnimatedLine({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <span className="flex flex-wrap justify-center">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          className={char === ' ' ? 'w-4' : ''}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroV1() {
  return (
    <div
      className="rounded-[28px] overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0e0e14 0%, #1a1228 60%, #0e1520 100%)' }}
    >
      {/* 중앙 텍스트 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 gap-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-[0.45em] uppercase text-white/30"
        >
          Humind Art Culture
        </motion.span>

        <div className="text-[52px] md:text-[80px] font-bold leading-tight text-white">
          <AnimatedLine text="세계를 무대로" baseDelay={0} />
          <AnimatedLine text="예술을 연주하다" baseDelay={8} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-white/40 text-[14px] tracking-wide"
        >
          국제문화교류 · 오케스트라 · 크루즈 · 설치예술
        </motion.p>
      </div>

      {/* 마키 */}
      <div className="border-t border-white/10 py-4 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap w-max"
        >
          {doubled.map((item, i) => (
            <span key={i} className="text-[11px] tracking-[0.3em] text-white/25 uppercase">
              {item}  ·
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
