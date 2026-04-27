import { awards, pressItems } from '@/data/news';

export default function NewsPage() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-8">
      {/* 수상 내역 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">
          수상 내역
        </p>
        <div className="flex flex-col gap-3">
          {awards.map((award) => (
            <div
              key={award.title}
              className="p-4 rounded-[16px] bg-white/45 border border-white/65 transition-all duration-[220ms] hover:bg-[rgba(255,247,220,0.6)] hover:border-l-[#c9a84c] hover:[border-left-width:3px] hover:shadow-[0_4px_16px_rgba(201,168,76,0.12)]"
            >
              <p className="text-[14px] font-semibold text-[var(--text-main)]">{award.title}</p>
              <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                {award.year} · {award.organization}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 언론 보도 */}
      <section>
        <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-4">
          언론 보도
        </p>
        <div className="flex flex-col gap-2">
          {pressItems.map((item) => (
            <div
              key={item.title}
              className="group flex items-center justify-between p-4 rounded-[14px] bg-white/35 border border-white/55 transition-all duration-[220ms] hover:bg-white/55 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)]"
            >
              <div>
                <p className="text-[13px] font-medium text-[var(--text-main)]">{item.title}</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  <span>{item.outlet}</span>
                  <span> · {item.date}</span>
                </p>
              </div>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] text-sm ml-4 shrink-0 transition-all duration-[220ms] group-hover:translate-x-1 group-hover:text-[var(--text-main)]"
                >
                  →
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
