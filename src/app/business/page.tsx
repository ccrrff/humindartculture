import BusinessVideos from '@/components/BusinessVideos';
import { businessItems } from '@/data/business';
import { videos } from '@/data/videos';

export default function BusinessPage() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-5">
      <h1 className="text-[20px] font-bold text-[var(--text-main)]">사업 안내</h1>
      {businessItems.map((item) => (
        <div
          key={item.id}
          className="p-6 rounded-[20px] bg-white/45 border border-white/65 flex flex-col gap-3"
        >
          <h2 className="text-[17px] font-semibold text-[var(--text-main)]">{item.title}</h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
          <div className="flex gap-2 flex-wrap">
            {item.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] bg-white/50 border border-white/70 rounded-full px-3 py-0.5 text-[var(--text-secondary)]"
              >
                {kw}
              </span>
            ))}
          </div>
          <BusinessVideos videos={videos} category={item.id} />
        </div>
      ))}
    </div>
  );
}
