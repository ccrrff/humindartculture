import { render, screen } from '@testing-library/react';
import InternationalSection from '@/components/business/InternationalSection';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ alt }: { alt: string }) => <img alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'xxx', title: 'SBS 커튼콜 인터뷰', category: '국제교류', date: '2024.03', featured: true },
  { id: 'yyy', title: '지브리 교류 공연', category: '국제교류', date: '2024.06' },
];

describe('InternationalSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByText(/02.*International/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByRole('heading', { name: '국제문화교류' })).toBeInTheDocument();
  });

  it('BMVA 키워드 뱃지를 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByText('BMVA 수상')).toBeInTheDocument();
  });

  it('featured 영상을 히어로 버튼으로 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByLabelText('SBS 커튼콜 인터뷰 재생')).toBeInTheDocument();
  });

  it('나머지 영상을 썸네일 버튼으로 렌더링한다', () => {
    render(<InternationalSection videos={mockVideos} />);
    expect(screen.getByLabelText('지브리 교류 공연 재생')).toBeInTheDocument();
  });

  it('영상이 없으면 null을 반환한다', () => {
    const { container } = render(<InternationalSection videos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
