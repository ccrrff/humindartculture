'use client';

import { motion } from 'framer-motion';

const CITIES = ['Seoul', 'Berlin', 'Paris', 'Amsterdam'];

export default function HeroV2() {
  return (
    <div className="glass rounded-[28px] overflow-hidden relative px-10 py-16 md:px-20 md:py-20 min-h-[340px] flex items-end">

      {/* 배경 대형 텍스트 */}
      <motion.span
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' as const }}
        className="absolute right-[-20px] top-[-24px] text-[200px] md:text-[280px] font-black leading-none text-black/[0.04] select-none pointer-events-none tracking-tighter"
        aria-hidden
      >
        ART
      </motion.span>

      {/* 좌측 텍스트 */}
      <div className="relative z-10 flex flex-col gap-5 flex-1">
        <div className="flex flex-col gap-1">
          {['문화예술로', '세계를 잇다'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[48px] md:text-[72px] font-bold leading-none tracking-tight text-[var(--text-main)]"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="w-8 h-px bg-black/25" />
          <span className="text-[12px] tracking-[0.25em] uppercase text-[var(--text-secondary)]">
            Humind Art Culture
          </span>
        </motion.div>
      </div>

      {/* 우측 도시 목록 */}
      <motion.div
        className="relative z-10 flex flex-col items-end gap-2 shrink-0"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
        }}
      >
        {CITIES.map((city) => (
          <motion.span
            key={city}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
            }}
            className="text-[20px] md:text-[26px] font-bold tracking-widest uppercase text-[var(--text-main)]"
          >
            {city}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
