import Link from 'next/link';

export default function AboutCard() {
  return (
    <div className="glass p-8 rounded-[24px]">
      <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)] bg-white/50 border border-white/70 rounded-full px-3 py-1 mb-4">
        About
      </span>
      <p className="text-[18px] font-medium leading-relaxed text-[var(--text-main)] mb-3">
        "사소한 일상의 숨겨진<br />아름다움을 발견합니다"
      </p>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
        아트컴퍼니는 공연·전시·문화행사를 기획하는 문화예술 전문 기업입니다.
        2010년 설립 이후 다양한 예술 프로젝트를 통해 일상 속 문화의 가치를 전달하고 있습니다.
      </p>
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 h-10 px-5 rounded-[20px] bg-white/50 border border-white/70 shadow-sm text-[13px] font-medium text-[var(--text-main)] hover:-translate-y-px transition-transform"
      >
        회사 소개 보기 →
      </Link>
    </div>
  );
}
