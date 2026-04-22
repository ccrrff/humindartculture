import { render, screen } from '@testing-library/react';
import GlassCard from '@/components/GlassCard';

describe('GlassCard', () => {
  it('children을 렌더링한다', () => {
    render(<GlassCard><span>hello</span></GlassCard>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('기본으로 glass 클래스를 포함한다', () => {
    const { container } = render(<GlassCard>내용</GlassCard>);
    expect(container.firstChild).toHaveClass('glass');
  });

  it('추가 className을 병합한다', () => {
    const { container } = render(<GlassCard className="p-4">내용</GlassCard>);
    expect(container.firstChild).toHaveClass('glass', 'p-4');
  });
});
