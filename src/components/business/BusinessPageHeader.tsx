'use client';

import { useEffect, useState } from 'react';

const BUSINESSES = [
  { name: '오케스트라', sub: '서울 페스타 필하모닉' },
  { name: '국제문화교류', sub: '유럽 3개국' },
  { name: '크루즈', sub: '선상 문화공연' },
  { name: '설치예술', sub: '공공미술 기획' },
];

const INTERVAL = 1400;

export default function BusinessPageHeader() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % BUSINESSES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass p-8 rounded-[28px] flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] tracking-[3px] text-[var(--text-secondary)] uppercase">
          Humind Art Culture
        </span>
        <h1 className="text-[24px] font-bold text-[var(--text-main)]">사업 안내</h1>
      </div>
      <div className="flex gap-2">
        {BUSINESSES.map(({ name, sub }, i) => (
          <div
            key={name}
            className="flex items-center gap-2.5 flex-1 border rounded-full px-4 py-2.5 transition-all duration-500"
            style={{
              background: active === i ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)',
              borderColor: active === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.70)',
              boxShadow: active === i ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <span
              className="shrink-0 rounded-full transition-all duration-500"
              style={{
                width: active === i ? 10 : 8,
                height: active === i ? 10 : 8,
                background: active === i ? 'var(--text-main)' : 'var(--text-main)',
                opacity: active === i ? 1 : 0.35,
                boxShadow: active === i ? '0 0 0 3px rgba(26,26,28,0.12)' : 'none',
              }}
            />
            <div className="min-w-0">
              <p
                className="text-[12px] font-semibold leading-none transition-colors duration-500"
                style={{ color: active === i ? 'var(--text-main)' : 'var(--text-secondary)' }}
              >
                {name}
              </p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-none truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
