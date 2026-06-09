'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '회사 소개', href: '/about' },
  { label: '사업 안내', href: '/business' },
  { label: '영상 아카이브', href: '/archive' },
  { label: '수상·보도', href: '/news' },
  { label: '문의', href: '/contact' },
];

export default function GlassNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] md:w-[calc(100%-64px)] max-w-[1336px] h-[56px] md:h-[76px] flex items-center px-5 md:px-7 gap-8 rounded-[28px]">
        <Link
          href="/"
          className="mr-auto flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image data-nav-logo src="/logo4.png" alt="휴마인드 아트컬쳐" width={233} height={60} className="h-[36px] md:h-[60px] w-auto" />
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-[15px] whitespace-nowrap transition-colors ${
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
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text-main)] transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* 모바일 사이드 드로어 */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 z-50 flex flex-col pt-24 px-6 pb-10 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        {/* 닫기 버튼 */}
        <button
          aria-label="메뉴 닫기"
          className="absolute top-5 right-6 p-1 text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors"
          onClick={() => setOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3.5 rounded-xl text-[15px] transition-colors ${
                pathname === href
                  ? 'text-[var(--text-main)] font-semibold bg-black/5'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-black/5'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
