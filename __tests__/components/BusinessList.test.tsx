import { render, screen } from '@testing-library/react';
import BusinessList from '@/components/BusinessList';

jest.mock('next/link', () => {
  const Mock = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  Mock.displayName = 'MockLink';
  return Mock;
});

describe('BusinessList', () => {
  it('3개의 사업 항목을 렌더링한다', () => {
    render(<BusinessList />);
    expect(screen.getByText('공연 기획')).toBeInTheDocument();
    expect(screen.getByText('전시 기획')).toBeInTheDocument();
    expect(screen.getByText('문화 행사')).toBeInTheDocument();
  });

  it('각 항목이 /business 링크를 가진다', () => {
    render(<BusinessList />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => expect(link).toHaveAttribute('href', '/business'));
  });
});
