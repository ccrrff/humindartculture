import { render, screen, fireEvent } from '@testing-library/react';
import ArchiveClient from '@/components/ArchiveClient';
import type { Video } from '@/data/videos';

jest.mock('next/image', () => {
  const Mock = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
  Mock.displayName = 'MockImage';
  return Mock;
});
jest.mock('react-youtube', () => {
  const Mock = () => <div data-testid="youtube" />;
  Mock.displayName = 'MockYouTube';
  return Mock;
});

const mockVideos: Video[] = [
  { id: 'aaa', title: '공연 영상', category: '오케스트라', date: '2024.10' },
  { id: 'bbb', title: '전시 영상', category: '국제교류', date: '2024.09' },
  { id: 'ccc', title: '행사 영상', category: '크루즈', date: '2024.08' },
];

describe('ArchiveClient', () => {
  it('기본 상태에서 전체 영상을 렌더링한다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.getByText('전시 영상')).toBeInTheDocument();
    expect(screen.getByText('행사 영상')).toBeInTheDocument();
  });

  it('오케스트라 탭 클릭 시 해당 영상만 표시된다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    fireEvent.click(screen.getByRole('button', { name: '오케스트라' }));
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.queryByText('전시 영상')).not.toBeInTheDocument();
    expect(screen.queryByText('행사 영상')).not.toBeInTheDocument();
  });

  it('전체 탭 클릭 시 모든 영상이 다시 표시된다', () => {
    render(<ArchiveClient videos={mockVideos} />);
    fireEvent.click(screen.getByRole('button', { name: '오케스트라' }));
    fireEvent.click(screen.getByRole('button', { name: '전체' }));
    expect(screen.getByText('공연 영상')).toBeInTheDocument();
    expect(screen.getByText('전시 영상')).toBeInTheDocument();
    expect(screen.getByText('행사 영상')).toBeInTheDocument();
  });
});
