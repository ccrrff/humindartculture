import { render, screen, fireEvent } from '@testing-library/react';
import VideoCarousel from '@/components/VideoCarousel';
import type { Video } from '@/data/videos';

jest.mock('@/components/VideoModal', () => {
  const Mock = ({ videoId, onClose }: { videoId: string | null; onClose: () => void }) =>
    videoId ? <div data-testid="modal" data-video-id={videoId} onClick={onClose} /> : null;
  Mock.displayName = 'MockVideoModal';
  return Mock;
});

jest.mock('next/image', () => {
  const Mock = ({ alt }: { alt: string }) => <img alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});

const MOCK_VIDEOS: Video[] = [
  { id: 'aaa', title: '영상 A', category: '공연기획', date: '2024.01', featured: true },
  { id: 'bbb', title: '영상 B', category: '전시기획', date: '2024.02', featured: true },
  { id: 'ccc', title: '영상 C', category: '문화행사', date: '2024.03', featured: true },
];

describe('VideoCarousel', () => {
  it('초기에 첫 번째 영상을 중앙에 표시한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    expect(screen.getByText('영상 A')).toBeInTheDocument();
  });

  it('다음 버튼 클릭 시 다음 영상으로 이동한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('다음 영상'));
    expect(screen.getByText('영상 B')).toBeInTheDocument();
  });

  it('이전 버튼 클릭 시 이전 영상으로 이동한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByLabelText('다음 영상'));
    fireEvent.click(screen.getByLabelText('이전 영상'));
    expect(screen.getByText('영상 A')).toBeInTheDocument();
  });

  it('중앙 카드 클릭 시 모달이 열린다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.click(screen.getByRole('button', { name: '영상 A 재생' }));
    expect(screen.getByTestId('modal')).toHaveAttribute('data-video-id', 'aaa');
  });

  it('dot 인디케이터 개수가 영상 수와 일치한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    const dots = screen.getAllByRole('listitem');
    expect(dots.length).toBe(MOCK_VIDEOS.length);
  });

  it('ArrowRight 키 입력 시 다음 영상으로 이동한다', () => {
    render(<VideoCarousel videos={MOCK_VIDEOS} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('영상 B')).toBeInTheDocument();
  });
});
