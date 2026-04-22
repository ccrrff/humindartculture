import Link from 'next/link';

const ITEMS = [
  { title: '공연 기획', desc: '클래식·무용·연극 기획 및 제작' },
  { title: '전시 기획', desc: '현대미술·사진·설치 전시 기획' },
  { title: '문화 행사', desc: '축제·문화포럼·커뮤니티 행사' },
];

export default function BusinessList() {
  return (
    <div className="glass p-8 rounded-[24px]">
      <p className="text-[17px] font-semibold text-[var(--text-main)] mb-4">사업 안내</p>
      <div className="flex flex-col gap-3">
        {ITEMS.map(({ title, desc }) => (
          <Link
            key={title}
            href="/business"
            className="flex items-center gap-4 p-3.5 rounded-xl bg-white/45 border border-white/65 hover:translate-x-0.5 transition-transform"
          >
            <div className="w-10 h-10 rounded-[12px] bg-white/40 border border-white/60 shrink-0" />
            <div className="min-w-0">
              <p className="text-[15px] font-medium text-[var(--text-main)]">{title}</p>
              <p className="text-[12px] text-[var(--text-secondary)] truncate">{desc}</p>
            </div>
            <span className="ml-auto text-[var(--text-secondary)] text-base">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
