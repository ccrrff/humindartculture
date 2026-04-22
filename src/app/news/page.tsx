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
              className="flex items-center gap-4 p-4 rounded-[16px] bg-white/45 border border-white/65"
            >
              <div className="w-8 h-8 rounded-lg bg-white/40 border border-white/60 shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-main)]">{award.title}</p>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  {award.year} · {award.organization}
                </p>
              </div>
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
              className="flex items-center justify-between p-4 rounded-[14px] bg-white/35 border border-white/55"
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
                  className="text-[var(--text-secondary)] text-sm ml-4 shrink-0 hover:text-[var(--text-main)] transition-colors"
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
