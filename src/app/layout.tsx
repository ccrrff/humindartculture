import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlassNav from '@/components/GlassNav';
import GlassFooter from '@/components/GlassFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '휴마인드 아트컬쳐',
  description: '서울 페스타 필하모닉 오케스트라 · 국제문화교류 · 크루즈 · 설치예술',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ background: 'var(--body-bg)' }}>
        <GlassNav />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-[32px] pb-10 flex flex-col gap-4 min-h-screen">
          {children}
          <GlassFooter />
        </div>
      </body>
    </html>
  );
}
