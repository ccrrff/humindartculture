import Link from 'next/link';

const STATS = [
  { tag: 'Orchestra',     num: '2019', sup: null, desc: '창립연도' },
  { tag: 'International', num: '5',    sup: '+',  desc: '교류 국가' },
  { tag: 'Cruise',        num: '50',   sup: '+',  desc: '공연 횟수' },
  { tag: 'Installation',  num: '4',    sup: null, desc: '사업 영역' },
];

export default function AboutCard() {
  return (
    <div className="glass p-7 rounded-[24px] flex flex-col gap-4">
      <span className="inline-flex text-[10px] tracking-[2px] uppercase text-[var(--text-secondary)] bg-white/60 border border-white/80 rounded-full px-3 py-1 w-fit">
        About
      </span>
      <p className="text-[17px] font-bold leading-[1.35] text-[var(--text-main)]">
        "예술로 세계를,<br />세계로 문화를"
      </p>
      <div className="h-px bg-black/[0.07]" />
      <div className="grid grid-cols-2 gap-2">
        {STATS.map((s) => (
          <div key={s.tag} className="bg-white/55 border border-white/80 rounded-2xl p-3.5 flex flex-col gap-1.5">
            <span className="text-[9px] font-bold tracking-[1px] uppercase text-[var(--text-secondary)]">
              {s.tag}
            </span>
            <span className="text-[22px] font-extrabold leading-none tracking-tight text-[var(--text-main)]">
              {s.num}
              {s.sup && <sup className="text-[12px] align-super font-bold">{s.sup}</sup>}
            </span>
            <span className="text-[10px] text-[var(--text-secondary)]/60">{s.desc}</span>
          </div>
        ))}
      </div>
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 h-8 px-4 rounded-[20px] bg-white/60 border border-white/80 shadow-sm text-[11px] font-medium text-[var(--text-main)] hover:-translate-y-px transition-transform w-fit"
      >
        회사 소개 보기 →
      </Link>
    </div>
  );
}
