import { render, screen } from '@testing-library/react';
import BusinessVideos from '@/components/BusinessVideos';
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
  { id: 'aaa', title: '클래식 공연', category: '공연기획', date: '2024.10' },
  { id: 'bbb', title: '전시 오프닝', category: '전시기획', date: '2024.09' },
];

describe('BusinessVideos', () => {
  it('해당 카테고리의 영상만 렌더링한다', () => {
    render(<BusinessVideos videos={mockVideos} category="공연기획" />);
    expect(screen.getByText('클래식 공연')).toBeInTheDocument();
    expect(screen.queryByText('전시 오프닝')).not.toBeInTheDocument();
  });

  it('영상이 없으면 아무것도 렌더링하지 않는다', () => {
    render(<BusinessVideos videos={mockVideos} category="문화행사" />);
    expect(screen.queryByText('클래식 공연')).not.toBeInTheDocument();
  });
});
