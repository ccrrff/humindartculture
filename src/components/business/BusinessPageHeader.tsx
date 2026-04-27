export default function BusinessPageHeader() {
  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-1.5">
      <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
        Humind Art Culture
      </span>
      <h1 className="text-[24px] font-bold text-[var(--text-main)]">사업 안내</h1>
      <p className="text-[13px] text-[var(--text-secondary)]">
        오케스트라 · 국제문화교류 · 크루즈 · 설치예술
      </p>
    </div>
  );
}
