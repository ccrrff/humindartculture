'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function Counter({ target, suffix = '', delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const start = Date.now();
      const duration = 1600;
      const tick = () => {
        const elapsed = Date.now() - start;
        const p = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 3, suffix: '개국', label: '국제 문화교류' },
  { value: 15, suffix: '+', label: '년 사업 경력' },
  { value: 1, suffix: '', label: '서울 필하모닉 오케스트라' },
];

export default function HeroV3() {
  return (
    <div className="glass rounded-[28px] px-10 py-16 md:px-20 md:py-20 flex flex-col gap-12">

      {/* 카운터 행 */}
      <motion.div
        className="grid grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-col gap-1"
          >
            <span className="text-[54px] md:text-[72px] font-black leading-none tracking-tight text-[var(--text-main)]">
              <Counter target={s.value} suffix={s.suffix} delay={400 + i * 150} />
            </span>
            <span className="text-[12px] text-[var(--text-secondary)] tracking-wide">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* 구분선 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' as const }}
        className="h-px bg-black/12 origin-left"
      />

      {/* 헤드라인 */}
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] md:text-[60px] font-bold leading-none tracking-tight text-[var(--text-main)]"
          >
            예술이 국경을 넘는 순간
          </motion.h1>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-[13px] tracking-[0.3em] uppercase text-[var(--text-secondary)]"
        >
          Humind Art Culture
        </motion.span>
      </div>
    </div>
  );
}
