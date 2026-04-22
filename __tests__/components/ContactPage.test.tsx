import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

describe('ContactPage', () => {
  it('전화번호가 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('02-000-0000')).toBeInTheDocument();
  });

  it('이메일이 mailto 링크로 렌더링된다', () => {
    render(<ContactPage />);
    const link = screen.getByRole('link', { name: /artcompany@example.com/i });
    expect(link).toHaveAttribute('href', 'mailto:artcompany@example.com');
  });

  it('주소가 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('서울특별시 종로구 문화예술로 1길')).toBeInTheDocument();
  });

  it('운영시간이 렌더링된다', () => {
    render(<ContactPage />);
    expect(screen.getByText('평일 09:00 – 18:00')).toBeInTheDocument();
  });
});
