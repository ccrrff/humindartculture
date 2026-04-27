import { render, screen } from '@testing-library/react';
import InstallationSection from '@/components/business/InstallationSection';

describe('InstallationSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText(/04.*Installation Art/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByRole('heading', { name: '설치예술' })).toBeInTheDocument();
  });

  it('OUTDOOR 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('OUTDOOR')).toBeInTheDocument();
    expect(screen.getByText('야외 공공미술')).toBeInTheDocument();
  });

  it('INDOOR 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('INDOOR')).toBeInTheDocument();
    expect(screen.getByText('실내 공간 기획')).toBeInTheDocument();
  });

  it('ONGOING·INQUIRY 카드를 렌더링한다', () => {
    render(<InstallationSection />);
    expect(screen.getByText('ONGOING')).toBeInTheDocument();
    expect(screen.getByText('INQUIRY')).toBeInTheDocument();
  });
});
