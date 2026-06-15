import Image from 'next/image';
import { aboutData } from '@/data/about';

export default function AboutPage() {
  const { ceoName, ceoRole, ceoImage, greeting, vision, mission, history } = aboutData;

  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-8">
      {/* 대표 인사말 */}
      <section>
        <div className="flex gap-8 items-start">
          {ceoImage && (
            <div className="shrink-0 w-[200px] h-[270px] rounded-[12px] overflow-hidden">
              <Image
                src={ceoImage}
                alt={`${ceoName} 대표이사`}
                width={200}
                height={270}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-3 justify-center h-[270px]">
            <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-3 py-1 w-fit">
              대표 인사말
            </span>
            <p className="text-[18px] text-[var(--text-main)] leading-relaxed whitespace-pre-line">{greeting}</p>
            <p className="text-[14px] text-[var(--text-secondary)]">{ceoName} · {ceoRole}</p>
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

    </div>
  );
}
