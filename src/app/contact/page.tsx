import { contactInfo } from '@/data/contact';

export default function ContactPage() {
  const { phone, email, address, instagram, hours, mapSrc } = contactInfo;

  return (
    <div className="glass p-8 rounded-[28px]">
      <h1 className="text-[20px] font-bold text-[var(--text-main)] mb-6">문의</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 연락처 정보 */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">전화</p>
            <a href={`tel:${phone}`} className="text-[15px] text-[var(--text-main)] hover:underline">
              {phone}
            </a>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">이메일</p>
            <a href={`mailto:${email}`} className="text-[15px] text-[var(--text-main)] hover:underline">
              {email}
            </a>
          </div>
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[var(--text-secondary)] mb-1">인스타그램</p>
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[var(--text-main)] hover:underline"
            >
              @{instagram}
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
