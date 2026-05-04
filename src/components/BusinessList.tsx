import Link from 'next/link';

const ITEMS = [
  { title: '오케스트라 운영', desc: '서울 페스타 필하모닉 오케스트라' },
  { title: '국제문화교류', desc: '유럽 무대 · 민간 국제교류 사업' },
  { title: '크루즈 문화사업', desc: '선상 공연 · 예술 여행 패키지' },
  { title: '설치예술', desc: '공공미술 · 도심 설치 기획' },
];

export default function BusinessList() {
  return (
    <div className="glass p-8 rounded-[24px] flex flex-col h-full">
      <p className="text-[17px] font-semibold text-[var(--text-main)] mb-4">사업 안내</p>
      <div className="flex flex-col gap-3 flex-1">
        {ITEMS.map(({ title, desc }) => (
          <Link
            key={title}
            href="/business"
            className="flex items-center gap-4 p-3.5 rounded-xl bg-white/45 border border-white/65 hover:translate-x-0.5 transition-transform flex-1"
          >
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
