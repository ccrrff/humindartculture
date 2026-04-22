import { aboutData } from '@/data/about';

export default function AboutPage() {
  const { ceoName, ceoRole, greeting, vision, mission, history, team } = aboutData;

  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-8">
      {/* 대표 인사말 */}
      <section>
        <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-3 py-1 mb-5">
          대표 인사말
        </span>
        <div className="flex gap-6 items-start">
          <div className="w-[96px] h-[96px] rounded-full bg-white/40 border border-white/60 shrink-0" />
          <div>
            <p className="text-[15px] text-[var(--text-main)] leading-relaxed mb-3">{greeting}</p>
            <p className="text-[13px] text-[var(--text-secondary)]">
              {ceoName} · {ceoRole}
            </p>
          </div>
        </div>
      </section>

      {/* 비전·미션 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-[16px] bg-white/45 border border-white/65">
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Vision</p>
          <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{vision}</p>
        </div>
        <div className="p-5 rounded-[16px] bg-white/45 border border-white/65">
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Mission</p>
          <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{mission}</p>
        </div>
      </section>

      {/* 연혁 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">연혁</p>
        <div className="flex flex-col divide-y divide-black/5">
          {history.map((item) => (
            <div key={item.year} className="flex gap-6 py-3">
              <span className="text-[13px] font-bold text-[var(--text-secondary)] w-10 shrink-0">{item.year}</span>
              <span className="text-[13px] text-[var(--text-main)]">{item.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 팀 소개 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">팀 소개</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2">
              <div className="w-[72px] h-[72px] rounded-xl bg-white/40 border border-white/60" />
              <p className="text-[13px] font-semibold text-[var(--text-main)]">{member.name}</p>
              <p className="text-[11px] text-[var(--text-secondary)]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
