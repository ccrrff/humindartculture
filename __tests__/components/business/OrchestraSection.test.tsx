import { render, screen } from '@testing-library/react';
import OrchestraSection from '@/components/business/OrchestraSection';
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
  { id: 'aaa', title: '유퀴즈 출연 영상', category: '오케스트라', date: '2024.01', featured: true },
  { id: 'bbb', title: '정기연주회 영상', category: '오케스트라', date: '2024.05' },
  { id: 'ccc', title: '캉캉 영상', category: '오케스트라', date: '2024.06' },
];

describe('OrchestraSection', () => {
  it('섹션 레이블을 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByText(/01.*Orchestra/i)).toBeInTheDocument();
  });

  it('섹션 제목을 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByRole('heading', { name: '오케스트라 운영' })).toBeInTheDocument();
  });

  it('featured 영상을 히어로 버튼으로 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByLabelText('유퀴즈 출연 영상 재생')).toBeInTheDocument();
  });

  it('나머지 영상을 썸네일 버튼으로 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByLabelText('정기연주회 영상 재생')).toBeInTheDocument();
    expect(screen.getByLabelText('캉캉 영상 재생')).toBeInTheDocument();
  });

  it('유퀴즈 배지를 렌더링한다', () => {
    render(<OrchestraSection videos={mockVideos} />);
    expect(screen.getByText(/유퀴즈온더블럭/)).toBeInTheDocument();
  });

  it('영상이 없으면 null을 반환한다', () => {
    const { container } = render(<OrchestraSection videos={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
