import Link from 'next/link';

const ITEMS = [
  { icon: '🎭', title: '공연 기획', desc: '클래식·무용·연극 기획 및 제작' },
  { icon: '🎨', title: '전시 기획', desc: '현대미술·사진·설치 전시 기획' },
  { icon: '🎪', title: '문화 행사', desc: '축제·문화포럼·커뮤니티 행사' },
];

export default function BusinessList() {
  return (
    <div className="glass p-6 rounded-[24px]">
      <p className="text-[15px] font-semibold text-[var(--text-main)] mb-3">사업 안내</p>
      <div className="flex flex-col gap-2">
        {ITEMS.map(({ icon, title, desc }) => (
          <Link
            key={title}
            href="/business"
            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/45 border border-white/65 hover:translate-x-0.5 transition-transform"
          >
            <span className="w-8 h-8 rounded-[10px] bg-white/40 flex items-center justify-center text-base shrink-0">
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[var(--text-main)]">{title}</p>
              <p className="text-[11px] text-[var(--text-secondary)] truncate">{desc}</p>
            </div>
            <span className="ml-auto text-[var(--text-secondary)] text-sm">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
