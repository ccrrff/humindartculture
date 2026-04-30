const BUSINESSES = [
  { name: '오케스트라', sub: '서울 페스타 필하모닉' },
  { name: '국제문화교류', sub: '유럽 3개국' },
  { name: '크루즈', sub: '선상 문화공연' },
  { name: '설치예술', sub: '공공미술 기획' },
];

export default function BusinessPageHeader() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
          Humind Art Culture
        </span>
        <h1 className="text-[24px] font-bold text-[var(--text-main)]">사업 안내</h1>
      </div>
      <div className="flex gap-2">
        {BUSINESSES.map(({ name, sub }) => (
          <div
            key={name}
            className="flex items-center gap-2.5 flex-1 bg-white/45 border border-white/70 rounded-full px-4 py-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--text-main)] shrink-0" />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[var(--text-main)] leading-none">{name}</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-none truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
