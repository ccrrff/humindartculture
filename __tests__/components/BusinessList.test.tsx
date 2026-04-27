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
  it('4개의 사업 항목을 렌더링한다', () => {
    render(<BusinessList />);
    expect(screen.getByText('오케스트라 운영')).toBeInTheDocument();
    expect(screen.getByText('국제문화교류')).toBeInTheDocument();
    expect(screen.getByText('크루즈 문화사업')).toBeInTheDocument();
    expect(screen.getByText('설치예술')).toBeInTheDocument();
  });

  it('각 항목이 /business 링크를 가진다', () => {
    render(<BusinessList />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => expect(link).toHaveAttribute('href', '/business'));
  });
});
