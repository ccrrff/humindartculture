import { render, screen } from '@testing-library/react';
import BusinessPageHeader from '@/components/business/BusinessPageHeader';

describe('BusinessPageHeader', () => {
  it('회사 레이블을 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByText(/HUMIND ART CULTURE/i)).toBeInTheDocument();
  });

  it('페이지 제목을 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByRole('heading', { name: '사업 안내' })).toBeInTheDocument();
  });

  it('4개 사업 부제를 렌더링한다', () => {
    render(<BusinessPageHeader />);
    expect(screen.getByText(/오케스트라.*국제문화교류.*크루즈.*설치예술/)).toBeInTheDocument();
  });
});
