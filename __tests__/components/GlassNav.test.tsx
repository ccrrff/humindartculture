import { render, screen } from '@testing-library/react';
import GlassNav from '@/components/GlassNav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('GlassNav', () => {
  it('로고를 렌더링한다', () => {
    render(<GlassNav />);
    expect(screen.getByText('아트컴퍼니')).toBeInTheDocument();
  });

  it('5개 메뉴 항목을 렌더링한다', () => {
    render(<GlassNav />);
    expect(screen.getByText('회사 소개')).toBeInTheDocument();
    expect(screen.getByText('영상 아카이브')).toBeInTheDocument();
    expect(screen.getByText('사업 안내')).toBeInTheDocument();
    expect(screen.getByText('수상·보도')).toBeInTheDocument();
    expect(screen.getByText('문의')).toBeInTheDocument();
  });

  it('현재 경로의 메뉴 항목에 active 스타일을 적용한다', () => {
    render(<GlassNav />);
    const homeLink = screen.getByText('회사 소개').closest('a');
    expect(homeLink).not.toBeNull();
  });
});
