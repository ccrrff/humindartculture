'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '회사 소개', href: '/about' },
  { label: '영상 아카이브', href: '/archive' },
  { label: '사업 안내', href: '/business' },
  { label: '수상·보도', href: '/news' },
  { label: '문의', href: '/contact' },
];

export default function GlassNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-64px)] max-w-[1400px] h-14 flex items-center px-7 gap-8 rounded-[28px]">
        <Link
          href="/"
          className="text-[15px] font-bold tracking-wide text-[var(--text-main)] mr-auto"
          onClick={() => setOpen(false)}
        >
          아트컴퍼니
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] whitespace-nowrap transition-colors ${
                pathname === href
                  ? 'text-[var(--text-main)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* 햄버거 버튼 (모바일) */}
        <button
          aria-label="메뉴 열기"
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {open && (
        <div className="glass fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-64px)] max-w-[1400px] rounded-[20px] p-4 flex flex-col gap-1 md:hidden">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-[14px] transition-colors ${
                pathname === href
                  ? 'text-[var(--text-main)] font-semibold bg-white/30'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-white/20'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
