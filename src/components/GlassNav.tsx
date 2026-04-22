'use client';

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

  return (
    <nav className="glass fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[900px] h-14 flex items-center px-7 gap-8 rounded-[28px]">
      <Link href="/" className="text-[15px] font-bold tracking-wide text-[var(--text-main)] mr-auto">
        아트컴퍼니
      </Link>
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
    </nav>
  );
}
