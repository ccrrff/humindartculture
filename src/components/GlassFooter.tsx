export default function GlassFooter() {
  return (
    <footer className="glass p-6 px-8 rounded-[20px] flex justify-between items-center flex-wrap gap-4 mt-auto">
      <div>
        <p className="text-[16px] font-bold text-[var(--text-main)] mb-1.5">휴마인드 아트컬쳐</p>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          대표: 박재상<br />
          서울시 서초구 반포대로 7길 20, B1동 (서초동 성훈빌딩)<br />
          Tel. 010-3514-5678 &nbsp;|&nbsp; jaesang3116@gmail.com
        </p>
      </div>
      <a
        href="https://www.instagram.com/seoulfestaphil"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
        @seoulfestaphil
      </a>
    </footer>
  );
}
