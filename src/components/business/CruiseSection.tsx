'use client';

import { motion } from 'framer-motion';

const STEPS = [
  { num: '01', title: '항로 기획', desc: '유럽·아시아 문화 항로 선정', active: true },
  { num: '02', title: '선상 공연', desc: '오케스트라와 함께하는 항해', active: true },
  { num: '03', title: '현지 교류', desc: '기항지 공연 및 문화 프로그램', active: true },
  { num: '04', title: '예술 패키지', desc: '기획 중', active: false },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const flipVariant = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: [90, -8, 0],
    transition: {
      opacity: { duration: 0.3 },
      rotateY: { duration: 0.6, times: [0, 0.78, 1], ease: 'easeOut' as const },
    },
  },
};

const lineVariant = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeInOut' as const } },
};

export default function CruiseSection() {
  return (
    <section aria-labelledby="cruise-heading" className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        03 · Cultural Cruise
      </span>
      <h2 id="cruise-heading" className="text-[20px] font-bold text-[var(--text-main)]">크루즈 문화사업</h2>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        국제문화교류 사업의 일환으로 크루즈를 활용한 문화 프로그램을 운영합니다. 선상 클래식 공연과
        예술 여행 패키지를 통해 새로운 형태의 문화 경험을 제공합니다.
      </p>

      {/* 여정 스텝 */}
      <motion.div
        className="relative flex items-start pt-1"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{ perspective: '600px' }}
      >
        {/* 연결선 — 왼쪽에서 오른쪽으로 드로잉 */}
        <motion.div
          aria-hidden="true"
          className="absolute top-4 left-4 right-4 h-px bg-black/15 origin-left"
          variants={lineVariant}
        />
        {STEPS.map((step) => (
          <motion.div
            key={step.num}
            className="flex-1 flex flex-col items-center gap-2 relative z-10"
            variants={flipVariant}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step.active
                  ? 'bg-[var(--text-main)] text-white'
                  : 'bg-white/60 text-[var(--text-secondary)] border border-dashed border-[var(--text-secondary)]/40'
              }`}
            >
              {step.num}
            </div>
            <span
              className={`text-[12px] font-semibold text-center ${
                step.active ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              {step.title}
            </span>
            <span className="text-[11px] text-[var(--text-secondary)] text-center leading-snug">
              {step.desc}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
