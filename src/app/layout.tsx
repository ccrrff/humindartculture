import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '아트컴퍼니',
  description: '문화예술 전문 기업 아트컴퍼니',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
