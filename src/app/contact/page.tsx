import { contactInfo } from '@/data/contact';

export default function ContactPage() {
  const { phone, email, address, hours, mapSrc } = contactInfo;

  return (
    <div className="glass p-8 rounded-[28px]">
      <h1 className="text-[20px] font-bold text-[var(--text-main)] mb-6">문의</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 연락처 정보 */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">전화</p>
            <p className="text-[15px] text-[var(--text-main)]">{phone}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">이메일</p>
            <a
              href={`mailto:${email}`}
              className="text-[15px] text-[var(--text-main)] hover:underline"
            >
              {email}
            </a>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">주소</p>
            <p className="text-[15px] text-[var(--text-main)]">{address}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">운영시간</p>
            <p className="text-[15px] text-[var(--text-main)]">{hours}</p>
          </div>
        </div>

        {/* 지도 */}
        <div className="rounded-[16px] overflow-hidden bg-white/30 border border-white/50 min-h-[240px]">
          <iframe
            src={mapSrc}
            className="w-full h-full min-h-[240px] border-0"
            loading="lazy"
            title="오시는 길"
          />
        </div>
      </div>
    </div>
  );
}
