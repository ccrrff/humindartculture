import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('대표 인사말 섹션이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('대표 인사말')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });

  it('비전과 미션이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('Vision')).toBeInTheDocument();
    expect(screen.getByText('Mission')).toBeInTheDocument();
  });

  it('연혁 항목이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('아트컴퍼니 설립')).toBeInTheDocument();
  });

  it('팀 구성원이 렌더링된다', () => {
    render(<AboutPage />);
    expect(screen.getByText('김예술')).toBeInTheDocument();
    expect(screen.getByText('공연기획팀장')).toBeInTheDocument();
  });
});
