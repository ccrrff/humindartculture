import { render, screen, fireEvent } from '@testing-library/react';
import VideoModal from '@/components/VideoModal';

jest.mock('react-youtube', () => {
  const MockYT = ({ videoId }: { videoId: string }) => (
    <div data-testid="youtube-player" data-video-id={videoId} />
  );
  MockYT.displayName = 'MockYouTube';
  return MockYT;
});

describe('VideoModal', () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it('videoId가 없으면 렌더링하지 않는다', () => {
    const { container } = render(<VideoModal videoId={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('videoId가 있으면 YouTube 플레이어를 렌더링한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-player')).toHaveAttribute('data-video-id', 'abc123');
  });

  it('배경 클릭 시 onClose를 호출한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('닫기 버튼 클릭 시 onClose를 호출한다', () => {
    render(<VideoModal videoId="abc123" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('닫기'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
