import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlassNav from '@/components/GlassNav';
import GlassFooter from '@/components/GlassFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '아트컴퍼니',
  description: '문화예술 전문 기업 아트컴퍼니 — 공연·전시·문화행사 기획',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ background: 'var(--body-bg)' }}>
        <GlassNav />
        <div className="max-w-[900px] mx-auto px-4 pt-24 pb-10 flex flex-col gap-2.5 min-h-screen">
          {children}
          <GlassFooter />
        </div>
      </body>
    </html>
  );
}
