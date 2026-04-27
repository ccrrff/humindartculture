import { render, screen } from '@testing-library/react';
import CruiseSection from '@/components/business/CruiseSection';

describe('CruiseSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText(/03.*Cultural Cruise/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByRole('heading', { name: '크루즈 문화사업' })).toBeInTheDocument();
  });

  it('4개 여정 스텝을 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText('항로 기획')).toBeInTheDocument();
    expect(screen.getByText('선상 공연')).toBeInTheDocument();
    expect(screen.getByText('현지 교류')).toBeInTheDocument();
    expect(screen.getByText('예술 패키지')).toBeInTheDocument();
  });

  it('스텝 번호를 렌더링한다', () => {
    render(<CruiseSection />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });
});
