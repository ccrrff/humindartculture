'use client';

import Image from 'next/image';
import { aboutData } from '@/data/about';

export default function AboutPage() {
  const {
    ceoName, ceoNameEn, ceoRole, ceoImage, greeting,
    vision, mission, history,
    ceoCompanies, ceoPositions, businessAreas,
  } = aboutData;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ceo-section   { animation: fadeUp 0.5s ease both; }
        .inner-panel   { transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .inner-panel:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04);
        }
        .biz-chip { transition: background 0.15s ease, transform 0.15s ease; }
        .biz-chip:hover {
          background: rgba(255,255,255,0.85) !important;
          transform: translateY(-1px);
        }
        .company-row { transition: color 0.15s ease; }
        .company-row:hover { color: #111 !important; }
      `}</style>

      <div className="glass p-8 rounded-[28px] flex flex-col gap-8">

        {/* 대표 인사말 + 이력 — 왼쪽 사진·명함 / 오른쪽 인사말·이력 (좌우 높이 자동 일치) */}
        <section
          className="ceo-section grid grid-cols-1 md:grid-cols-[300px_1fr] gap-7 items-stretch"
          style={{ animationDelay: '0ms' }}
        >
          {/* 왼쪽: 사진 + 명함 */}
          <div className="flex flex-col gap-3">
            {ceoImage && (
              <div className="w-full h-[300px] rounded-[14px] overflow-hidden shadow-md">
                <Image
                  src={ceoImage}
                  alt={`${ceoName} 대표이사`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center bg-white/60 border border-white/85 rounded-[14px] px-5 py-[18px]">
              <p className="text-[30px] font-bold text-[var(--text-main)] tracking-[0.02em] leading-none">{ceoName}</p>
              <p className="text-[11px] font-medium text-[var(--text-secondary)] mt-2 tracking-[0.18em] whitespace-nowrap">{ceoNameEn}</p>
              <p className="text-[12px] text-[var(--text-main)] mt-1.5 tracking-[0.04em]">{ceoRole} · CEO</p>
            </div>
          </div>

          {/* 오른쪽: 인사말 + 이력 */}
          <div className="flex flex-col gap-4">
            {/* 인사말 */}
            <div className="flex flex-col gap-3">
              <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-3 py-1 w-fit">
                대표 인사말
              </span>
              <p className="text-[15px] text-[var(--text-main)] leading-relaxed whitespace-pre-line">{greeting}</p>
              <p className="text-[13px] text-[var(--text-secondary)]">{ceoName} · {ceoRole}</p>
            </div>

            <div className="h-px bg-black/[0.07]" />

            {/* 설립·운영 / 現 직책 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="inner-panel px-4 py-[14px] rounded-[14px] bg-white/45 border border-white/70">
                <p className="text-[11px] tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">설립 · 운영</p>
                <div className="flex flex-col">
                  {ceoCompanies.map((c, i) => (
                    <span
                      key={c}
                      className={`company-row text-[13px] text-[var(--text-main)] py-[5px] ${i < ceoCompanies.length - 1 ? 'border-b border-black/[0.06]' : ''}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="inner-panel px-4 py-[14px] rounded-[14px] bg-white/45 border border-white/70">
                <p className="text-[11px] tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">現 직책</p>
                <div className="flex flex-col gap-[9px]">
                  {ceoPositions.map((pos, i) => (
                    <span
                      key={pos}
                      className={`text-[12px] text-[var(--text-main)] leading-snug ${i < ceoPositions.length - 1 ? 'pb-[9px] border-b border-black/[0.06]' : ''}`}
                    >
                      {pos}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Area 칩 */}
            <div>
              <p className="text-[11px] tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">Business Area</p>
              <div className="flex flex-wrap gap-[6px]">
                {businessAreas.map((area) => (
                  <span
                    key={area}
                    className="biz-chip text-[11px] px-3 py-[5px] bg-white/55 border border-white/80 rounded-full text-[var(--text-main)] cursor-default"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 비전·미션 */}
        <section className="ceo-section grid grid-cols-1 md:grid-cols-2 gap-4" style={{ animationDelay: '80ms' }}>
          <div className="inner-panel p-5 rounded-[16px] bg-white/45 border border-white/65">
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Vision</p>
            <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{vision}</p>
          </div>
          <div className="inner-panel p-5 rounded-[16px] bg-white/45 border border-white/65">
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-2">Mission</p>
            <p className="text-[15px] font-medium text-[var(--text-main)] leading-relaxed">{mission}</p>
          </div>
        </section>

        {/* 연혁 */}
        <section className="ceo-section" style={{ animationDelay: '160ms' }}>
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">연혁</p>
          <div className="flex flex-col divide-y divide-black/5">
            {history.map((item) => (
              <div key={item.year + item.description} className="flex gap-6 py-3">
                <span className="text-[13px] font-bold text-[var(--text-secondary)] w-10 shrink-0">{item.year}</span>
                <span className="text-[13px] text-[var(--text-main)]">{item.description}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
