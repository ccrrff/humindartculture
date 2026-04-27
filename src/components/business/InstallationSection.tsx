'use client';

import { motion } from 'framer-motion';

const GRID = [
  {
    label: 'OUTDOOR',
    title: '야외 공공미술',
    desc: '도시 광장·공원·거리 대형 조형물 및 미디어 아트',
    active: true,
  },
  {
    label: 'INDOOR',
    title: '실내 공간 기획',
    desc: '갤러리·로비·상업공간 예술 공간 연출',
    active: true,
  },
  {
    label: 'ONGOING',
    title: '신규 프로젝트',
    desc: '지속적으로 새로운 설치예술 프로젝트를 기획 중입니다',
    active: false,
  },
  {
    label: 'INQUIRY',
    title: '협업 문의',
    desc: '공공기관·기업·문화재단 협업 제안 환영합니다',
    active: false,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const flipVariant = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: [90, -8, 0],
    transition: {
      opacity: { duration: 0.3 },
      rotateY: { duration: 0.6, times: [0, 0.78, 1], ease: 'easeOut' },
    },
  },
};

export default function InstallationSection() {
  return (
    <section aria-labelledby="installation-heading" className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        04 · Installation Art
      </span>
      <h2 id="installation-heading" className="text-[20px] font-bold text-[var(--text-main)]">설치예술</h2>
      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
        도시 공공장소와 실내 공간에 설치예술 작품을 기획·제작합니다. 일상 속에서 예술을 만나는
        경험을 통해 문화예술의 저변을 넓힙니다.
      </p>

      {/* 2열 그리드 */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{ perspective: '600px' }}
      >
        {GRID.map((item) => (
          <motion.div
            key={item.label}
            className={`p-5 rounded-2xl flex flex-col gap-1.5 ${
              item.active
                ? 'bg-[var(--text-main)]/5 border-l-[3px] border-[var(--text-main)]'
                : 'bg-white/30 border-l-[3px] border-dashed border-[var(--text-secondary)]/30'
            }`}
            variants={flipVariant}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span
              className={`text-[10px] tracking-[2px] font-medium ${
                item.active ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]/50'
              }`}
            >
              {item.label}
            </span>
            <span
              className={`text-[13px] font-semibold ${
                item.active ? 'text-[var(--text-main)]' : 'text-[var(--text-secondary)]/60'
              }`}
            >
              {item.title}
            </span>
            <span
              className={`text-[11px] leading-snug ${
                item.active ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]/50'
              }`}
            >
              {item.desc}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
