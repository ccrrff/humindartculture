import { render, screen, fireEvent } from '@testing-library/react';
import VideoGrid from '@/components/VideoGrid';
import type { Video } from '@/data/videos';

jest.mock('@/components/VideoModal', () => {
  const Mock = ({ videoId, onClose }: { videoId: string | null; onClose: () => void }) =>
    videoId ? <div data-testid="modal" onClick={onClose} /> : null;
  Mock.displayName = 'MockVideoModal';
  return Mock;
});

jest.mock('next/image', () => {
  const Mock = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  Mock.displayName = 'MockImage';
  return Mock;
});

jest.mock('next/link', () => {
  const Mock = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  Mock.displayName = 'MockLink';
  return Mock;
});

const MOCK_VIDEOS: Video[] = [
  { id: 'v1', title: '영상 1', category: '오케스트라', date: '2024.10' },
  { id: 'v2', title: '영상 2', category: '국제교류', date: '2024.09' },
  { id: 'v3', title: '영상 3', category: '크루즈', date: '2024.08' },
  { id: 'v4', title: '영상 4', category: '설치예술', date: '2024.07' },
];

describe('VideoGrid', () => {
  it('4개의 영상 카드를 렌더링한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    expect(screen.getAllByRole('img').length).toBe(4);
  });

  it('각 영상의 제목을 표시한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    expect(screen.getByText('영상 1')).toBeInTheDocument();
    expect(screen.getByText('영상 4')).toBeInTheDocument();
  });

  it('카드 클릭 시 해당 영상의 모달이 열린다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('영상 1 재생'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('"전체 보기" 링크를 렌더링한다', () => {
    render(<VideoGrid videos={MOCK_VIDEOS} />);
    const link = screen.getByRole('link', { name: /전체 보기/ });
    expect(link).toHaveAttribute('href', '/archive');
  });
});
