export default function GlassFooter() {
  return (
    <footer className="glass p-6 px-8 rounded-[20px] flex justify-between items-center flex-wrap gap-4 mt-auto">
      <div>
        <p className="text-[16px] font-bold text-[var(--text-main)] mb-1.5">아트컴퍼니</p>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          대표: 홍길동 &nbsp;|&nbsp; 사업자번호: 000-00-00000<br />
          서울특별시 종로구 문화예술로 1길<br />
          Tel. 02-000-0000 &nbsp;|&nbsp; artcompany@example.com
        </p>
      </div>
      <div className="flex gap-2.5">
        {(['▶', '📷', 'f'] as const).map((icon, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-sm cursor-pointer hover:scale-110 transition-transform"
          >
            {icon}
          </div>
        ))}
      </div>
    </footer>
  );
}
