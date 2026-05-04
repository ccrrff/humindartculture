export default function GlassFooter() {
  return (
    <footer className="glass p-6 px-8 rounded-[20px] flex justify-between items-center flex-wrap gap-4 mt-auto">
      <div>
        <p className="text-[16px] font-bold text-[var(--text-main)] mb-1.5">휴마인드 아트컬쳐</p>
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
          대표: 대표이사 &nbsp;|&nbsp; 사업자번호: 000-00-00000<br />
          서울특별시<br />
          Tel. 02-000-0000 &nbsp;|&nbsp; artcompany@example.com
        </p>
      </div>
    </footer>
  );
}
