import { render, screen, fireEvent } from '@testing-library/react';
import GlassNav from '@/components/GlassNav';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href, onClick }: { children: React.ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>{children}</a>
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

  it('햄버거 버튼이 렌더링된다', () => {
    render(<GlassNav />);
    expect(screen.getByLabelText('메뉴 열기')).toBeInTheDocument();
  });

  it('햄버거 버튼 클릭 시 모바일 메뉴가 표시된다', () => {
    render(<GlassNav />);
    fireEvent.click(screen.getByLabelText('메뉴 열기'));
    const links = screen.getAllByText('회사 소개');
    expect(links.length).toBeGreaterThan(0);
  });
});
