import { render, screen } from '@testing-library/react';
import NewsPage from '@/app/news/page';

describe('NewsPage', () => {
  it('수상 내역 섹션이 렌더링된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('수상 내역')).toBeInTheDocument();
    expect(screen.getByText('BMVA 세계영상어워즈')).toBeInTheDocument();
  });

  it('언론 보도 섹션이 렌더링된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('언론 보도')).toBeInTheDocument();
    expect(screen.getByText('한국일보')).toBeInTheDocument();
  });

  it('수상 연도가 표시된다', () => {
    render(<NewsPage />);
    expect(screen.getByText('2024 · 서울특별시')).toBeInTheDocument();
  });
});
